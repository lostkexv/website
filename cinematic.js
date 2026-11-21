/* =====================================================
   KESHAV ASSOCIATES — CINEMATIC LAYER
   1. Collections showcase (built from config.js)
   2. WebGL flow field behind the hero, tied to the hero slide
   3. Smooth scroll (Lenis) + pinned horizontal scroll (GSAP)
   Everything degrades gracefully: no WebGL, no CDN or
   reduced motion simply means the simpler version shows.
===================================================== */
(() => {
    const catalog = window.SERVICE_CATALOG || [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = (selector) => document.querySelector(selector);
    const U = { c: 0 };          // current hero chapter, tweened for the shader
    let lenis = null;
    const go = (target) => {
        if (lenis) lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : -90 });
        else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
        else target.scrollIntoView({ behavior: "smooth" });
    };

    /* 1 — COLLECTIONS: one panel per category, each service links to its own page */
    const track = $("#coll-track");
    if (track && catalog.length) {
        const groups = [...new Set(catalog.map((item) => item.category))];
        const spots = [[80, 22], [22, 68], [72, 30], [28, 60], [62, 26]];
        track.innerHTML = groups.map((key, i) => {
            const items = catalog.filter((item) => item.category === key);
            const count = String(items.length).padStart(2, "0");
            const [x, y] = spots[i % spots.length];
            return `<article class="coll-panel" style="--x:${x}%;--y:${y}%">
                <span class="coll-count" aria-hidden="true">${count}</span>
                <p class="eyebrow">${count} SERVICES</p>
                <h3>${items[0].categoryLabel}</h3>
                <ul>${items.map((s) => `<li><a href="service.html?service=${encodeURIComponent(s.slug)}">${s.title}</a></li>`).join("")}</ul>
                <button class="button button-primary" type="button" data-filter-go="${key}">Browse in finder <span>↗</span></button>
            </article>`;
        }).join("");
        track.addEventListener("click", (event) => {
            const button = event.target.closest("[data-filter-go]");
            if (!button) return;
            const chip = document.querySelector(`.filter-chip[data-filter="${button.dataset.filterGo}"]`);
            if (chip) chip.click();
            go($("#services"));
        });
    }

    /* 2 — WEBGL FLOW FIELD (falls back to the existing CSS hero if unsupported) */
    const canvas = $("#hero-gl");
    const hero = $(".hero");
    (() => {
        if (!canvas || !hero) return;
        const gl = canvas.getContext("webgl");
        if (!gl || reduce) { canvas.remove(); return; }
        const make = (type, source) => { const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s); return s; };
        const fragment = make(gl.FRAGMENT_SHADER, `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r, m; uniform float t, c;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fb(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*n(p);p*=2.02;a*=.5;}return s;}
void main(){
  vec2 ar=vec2(r.x/r.y,1.),uv=gl_FragCoord.xy/r,p=(uv-.5)*ar*(2.+c*.35);
  float q=fb(p+vec2(t*.04,-t*.03)+(m-.5)*.5),w=fb(p*1.2+q*2.4+vec2(c*1.3,-t*.05));
  float l=1.-smoothstep(0.,.05,abs(fract(w*7.)-.5)-.44);
  vec3 col=mix(vec3(0.),vec3(.45,.47,.84),smoothstep(.3,.95,w)*.5);
  col+=vec3(.65,.67,1.)*l*.55*smoothstep(.2,.8,w);
  col+=vec3(.52,.54,.93)*.2/(.25+distance(uv*ar,m*ar)*3.);
  col*=mix(.15,1.,smoothstep(.25,.95,uv.x));
  gl_FragColor=vec4(col,1.);
}`);
        const program = gl.createProgram();
        gl.attachShader(program, make(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"));
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS) || !gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) { canvas.remove(); return; }
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(program, "p");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        const uni = (name) => gl.getUniformLocation(program, name);
        const uR = uni("r"), uM = uni("m"), uT = uni("t"), uC = uni("c");
        let mx = .7, my = .6, tx = .7, ty = .6, visible = true;
        const resize = () => {
            const k = Math.min(window.devicePixelRatio || 1, 1.5) * .6;   // render below native size: soft look, light on phones
            canvas.width = Math.max(2, hero.clientWidth * k);
            canvas.height = Math.max(2, hero.clientHeight * k);
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);
        hero.addEventListener("pointermove", (e) => {
            const b = hero.getBoundingClientRect();
            tx = (e.clientX - b.left) / b.width;
            ty = 1 - (e.clientY - b.top) / b.height;
        });
        new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; }).observe(hero);
        const start = performance.now();
        (function frame() {
            requestAnimationFrame(frame);
            if (!visible || document.hidden) return;
            mx += (tx - mx) * .05; my += (ty - my) * .05;
            gl.uniform2f(uR, canvas.width, canvas.height);
            gl.uniform2f(uM, mx, my);
            gl.uniform1f(uT, (performance.now() - start) / 1000);
            gl.uniform1f(uC, U.c);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        })();
        /* follow the hero slide counter that main.js already updates */
        const counter = $("#slide-current");
        if (counter) new MutationObserver(() => {
            const index = (parseInt(counter.textContent, 10) || 1) - 1;
            if (window.gsap) gsap.to(U, { c: index, duration: 1.8, ease: "power2.inOut", overwrite: true });
            else U.c = index;
        }).observe(counter, { childList: true, characterData: true, subtree: true });
    })();

    /* 3 — SMOOTH SCROLL + PINNED HORIZONTAL COLLECTIONS */
    if (window.gsap && window.ScrollTrigger && !reduce) {
        gsap.registerPlugin(ScrollTrigger);
        if (window.Lenis && window.matchMedia("(pointer: fine)").matches) {
            lenis = new Lenis({ lerp: .09 });
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add((time) => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
            document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", (event) => {
                const hash = link.getAttribute("href");
                const target = hash === "#top" || hash === "#home" ? 0 : document.querySelector(hash);
                if (target !== null && target !== undefined && hash.length > 1) { event.preventDefault(); go(target); }
            }));
        }
        if (track) gsap.matchMedia().add("(min-width: 900px)", () => {
            track.classList.add("pinned");
            gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: { trigger: ".coll-pin", start: "top top", end: () => "+=" + (track.scrollWidth - window.innerWidth), pin: true, scrub: 1, invalidateOnRefresh: true }
            });
            return () => track.classList.remove("pinned");
        });
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
})();
