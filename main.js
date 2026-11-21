/* =====================================================
   KESHAV ASSOCIATES — MAIN JAVASCRIPT
   Features: responsive navigation, hero slider, service
   finder, scroll motion, contact actions and interactions.
===================================================== */

const siteConfig = window.SITE_CONFIG || {};
const serviceCatalog = window.SERVICE_CATALOG || [];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 01 — MOBILE NAVIGATION */
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");

function closeMenu() {
    if (!menuToggle || !siteNav) return;
    siteNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
        menuToggle.setAttribute("aria-expanded", String(willOpen));
        menuToggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
        siteNav.classList.toggle("open", willOpen);
        document.body.classList.toggle("menu-open", willOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) closeMenu();
    });
}

/* 02 — HEADER AND PAGE SCROLL PROGRESS */
const header = document.querySelector(".site-header");
const scrollProgress = document.getElementById("scroll-progress");
let scrollTicking = false;

function updateScrollEffects() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("scrolled", scrollTop > 35);
    if (scrollProgress) {
        const progress = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
        scrollProgress.style.transform = `scaleX(${progress / 100})`;
    }
    scrollTicking = false;
}

window.addEventListener("scroll", () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollEffects);
        scrollTicking = true;
    }
}, { passive: true });
updateScrollEffects();

/* 03 — HERO SLIDER */
const heroSlides = [
    {
        kicker: "Thoughtful assistance for everyday needs.",
        title: "Support,<br><em>simplified.</em>",
        description: "From LIC policy assistance and insurance enquiries to documentation, travel bookings and print services, find everyday support in one convenient place."
    },
    {
        kicker: "Clear information. A more considered experience.",
        title: "Clarity in<br><em>every step.</em>",
        description: "Explore the service you need, ask your questions and understand the next step with Keshav Associates in Patiala."
    },
    {
        kicker: "A wide range of services, close to home.",
        title: "Many needs.<br><em>One place.</em>",
        description: "Insurance, financial assistance, identity-related forms, ticket bookings and everyday document services — all under one roof."
    }
];

const heroKicker = document.getElementById("hero-kicker");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const slideCurrent = document.getElementById("slide-current");
const slideDots = document.querySelectorAll(".slide-dot");
const previousButton = document.getElementById("slide-prev");
const nextButton = document.getElementById("slide-next");
const hero = document.querySelector(".hero");
let activeSlide = 0;
let slideTimer = null;

function showSlide(index) {
    if (!heroKicker || !heroTitle || !heroDescription || !slideCurrent) return;
    activeSlide = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[activeSlide];

    if (!reducedMotion && heroTitle.parentElement) {
        heroTitle.parentElement.classList.remove("hero-copy-changing");
        void heroTitle.offsetWidth;
        heroTitle.parentElement.classList.add("hero-copy-changing");
    }

    heroKicker.textContent = slide.kicker;
    heroTitle.innerHTML = slide.title;
    heroDescription.textContent = slide.description;
    slideCurrent.textContent = String(activeSlide + 1).padStart(2, "0");

    slideDots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === activeSlide);
        dot.setAttribute("aria-pressed", String(dotIndex === activeSlide));
    });
}

function restartSlideTimer() {
    window.clearInterval(slideTimer);
    if (!reducedMotion && hero && !document.hidden) {
        slideTimer = window.setInterval(() => showSlide(activeSlide + 1), 8500);
    }
}

if (heroKicker && previousButton && nextButton) {
    previousButton.addEventListener("click", () => { showSlide(activeSlide - 1); restartSlideTimer(); });
    nextButton.addEventListener("click", () => { showSlide(activeSlide + 1); restartSlideTimer(); });
    slideDots.forEach((dot) => dot.addEventListener("click", () => {
        showSlide(Number(dot.dataset.slide));
        restartSlideTimer();
    }));
    if (hero) {
        hero.addEventListener("mouseenter", () => window.clearInterval(slideTimer));
        hero.addEventListener("mouseleave", restartSlideTimer);
        hero.addEventListener("focusin", () => window.clearInterval(slideTimer));
        hero.addEventListener("focusout", restartSlideTimer);
    }
    document.addEventListener("visibilitychange", restartSlideTimer);
    showSlide(0);
    restartSlideTimer();
}

/* 04 — POINTER-RESPONSIVE HERO ART
   The artwork moves slightly with the cursor on larger screens.
   It is disabled on touch devices and when reduced motion is preferred.
*/
if (hero && !reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let pointerFrame = null;
    hero.addEventListener("pointermove", (event) => {
        if (pointerFrame) cancelAnimationFrame(pointerFrame);
        pointerFrame = requestAnimationFrame(() => {
            const bounds = hero.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            hero.style.setProperty("--pointer-x", `${x * 18}px`);
            hero.style.setProperty("--pointer-y", `${y * 18}px`);
        });
    });
    hero.addEventListener("pointerleave", () => {
        hero.style.setProperty("--pointer-x", "0px");
        hero.style.setProperty("--pointer-y", "0px");
    });
}

/* 05 — SCROLL REVEAL WITH STAGGERED MOTION */
function observeRevealElements(root = document) {
    const elements = root.querySelectorAll(".reveal:not([data-reveal-ready])");
    if (!elements.length) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        elements.forEach((element) => {
            element.classList.add("is-visible");
            element.dataset.revealReady = "true";
        });
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    elements.forEach((element, index) => {
        element.dataset.revealReady = "true";
        const siblings = element.parentElement ? Array.from(element.parentElement.children).filter((item) => item.classList.contains("reveal")) : [];
        const siblingIndex = siblings.indexOf(element);
        element.style.setProperty("--reveal-delay", `${Math.max(0, siblingIndex) * 90}ms`);
        revealObserver.observe(element);
    });
}

observeRevealElements();

/* 06 — ACTIVE NAVIGATION LINK */
const pageSections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px" });
    pageSections.forEach((section) => navObserver.observe(section));
}

/* 07 — BUILD THE FULL SERVICE CATALOGUE */
const serviceGrid = document.getElementById("service-grid");
const serviceSearch = document.getElementById("service-search");
const filterButtons = document.querySelectorAll(".filter-chip");
const emptySearchMessage = document.getElementById("search-empty");
let selectedFilter = "all";

const categoryArt = {
    insurance: { className: "insurance-art", icon: "✳", label: "CARE / PROTECTION" },
    finance: { className: "finance-art", icon: "₹", label: "FINANCIAL SERVICES" },
    identity: { className: "document-art", icon: "⌑", label: "IDENTITY / ONLINE" },
    travel: { className: "travel-art", icon: "↗", label: "TRAVEL BOOKINGS" },
    print: { className: "print-art", icon: "▤", label: "PRINT / DOCUMENTS" }
};

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

function renderServiceCards() {
    if (!serviceGrid || !serviceCatalog.length) return;
    serviceGrid.innerHTML = serviceCatalog.map((service, index) => {
        const art = categoryArt[service.category] || categoryArt.identity;
        const number = String(index + 1).padStart(2, "0");
        const searchTerms = `${service.title} ${service.categoryLabel} ${service.short} ${service.keywords || ""}`.toLowerCase();
        return `
            <article class="service-card service-card-dynamic reveal" data-category="${escapeHTML(service.category)}" data-search="${escapeHTML(searchTerms)}" style="--card-index:${index}">
                <a class="service-card-link" href="service.html?service=${encodeURIComponent(service.slug)}" aria-label="Explore ${escapeHTML(service.title)}">
                    <div class="service-card-art ${art.className}">
                        <span class="art-index">${number} / SERVICE</span>
                        <div class="dynamic-service-icon">${art.icon}</div>
                        <span class="art-bottom-label">${art.label}</span>
                        <span class="art-orbit"></span>
                    </div>
                    <div class="service-card-content">
                        <div>
                            <p class="card-eyebrow">${escapeHTML(service.categoryLabel)}</p>
                            <h3>${escapeHTML(service.title)}</h3>
                            <p>${escapeHTML(service.short)}</p>
                        </div>
                        <span class="card-arrow" aria-hidden="true">↗</span>
                    </div>
                </a>
            </article>`;
    }).join("");
    observeRevealElements(serviceGrid);
    filterServices();
}

function filterServices() {
    if (!serviceGrid) return;
    const searchTerm = serviceSearch ? serviceSearch.value.trim().toLowerCase() : "";
    const cards = serviceGrid.querySelectorAll(".service-card");
    let visibleCount = 0;

    cards.forEach((card) => {
        const categoryMatches = selectedFilter === "all" || card.dataset.category === selectedFilter;
        const text = `${card.dataset.search || ""} ${card.innerText || ""}`.toLowerCase();
        const searchMatches = text.includes(searchTerm);
        const shouldShow = categoryMatches && searchMatches;
        card.hidden = !shouldShow;
        if (shouldShow) visibleCount += 1;
    });

    if (emptySearchMessage) emptySearchMessage.hidden = visibleCount !== 0;
    const visibleCountElement = document.getElementById("service-count");
    if (visibleCountElement) visibleCountElement.textContent = String(visibleCount).padStart(2, "0");
}

if (serviceGrid) renderServiceCards();

// When a visitor opens the contact form from a service detail page,
// preselect that service so they do not have to choose it again.
const requestedService = new URLSearchParams(window.location.search).get("service");
const requestedServiceItem = serviceCatalog.find((item) => item.slug === requestedService);
const contactCategoryField = document.getElementById("contact-category");
if (requestedServiceItem && contactCategoryField) {
    const matchingOption = Array.from(contactCategoryField.options).find((option) => option.textContent.trim() === requestedServiceItem.title);
    if (matchingOption) contactCategoryField.value = matchingOption.value;
}

if (serviceSearch) serviceSearch.addEventListener("input", filterServices);
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedFilter = button.dataset.filter || "all";
        filterButtons.forEach((item) => item.classList.toggle("active", item === button));
        filterServices();
    });
});

/* 08 — SUBTLE TILT AND LIGHT RESPONSE ON SERVICE CARDS */
if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("pointermove", (event) => {
        const card = event.target.closest(".service-card-dynamic");
        if (!card || card.hidden) return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        card.style.setProperty("--spot-x", `${x * 100}%`);
        card.style.setProperty("--spot-y", `${y * 100}%`);
        card.style.setProperty("--tilt-x", `${(x - 0.5) * 5}deg`);
        card.style.setProperty("--tilt-y", `${(0.5 - y) * 5}deg`);
    }, { passive: true });

    document.addEventListener("pointerout", (event) => {
        const card = event.target.closest(".service-card-dynamic");
        if (!card || (event.relatedTarget && card.contains(event.relatedTarget))) return;
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
    });
}

/* 09 — CONTACT FORM: PREPARE AN EMAIL DRAFT
   This opens the visitor's email application. It does not store enquiries.
   Secure online submission/tracking requires a backend connection.
*/
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailAddress = siteConfig.email || "";
        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const senderEmail = String(formData.get("email") || "").trim();
        const category = String(formData.get("category") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (!name || !phone || !category || !message) {
            if (formNote) formNote.textContent = "Please complete your name, phone number, service and message.";
            return;
        }
        if (!emailAddress) {
            if (formNote) formNote.textContent = "The business email is not configured yet. Please call the listed business number.";
            return;
        }

        const subject = encodeURIComponent(`Website enquiry — ${category}`);
        const body = encodeURIComponent(`Thank you for contacting Keshav Associates.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${senderEmail || "Not provided"}\nService: ${category}\n\nMessage:\n${message}\n\nRegards,\nKeshav Associates`);
        if (formNote) formNote.textContent = "Your email application is opening with the enquiry prepared. Review the message and press Send in your email app.";
        window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    });
}

/* 10 — WHATSAPP BUTTON
   Only display it once a distinct, confirmed WhatsApp number is supplied.
*/
const whatsappButton = document.getElementById("whatsapp-button");
if (whatsappButton && siteConfig.whatsapp) {
    const cleanNumber = String(siteConfig.whatsapp).replace(/\D/g, "");
    if (cleanNumber) {
        const message = encodeURIComponent("Hello Keshav Associates, I would like to enquire about your services.");
        whatsappButton.href = `https://wa.me/${cleanNumber}?text=${message}`;
        whatsappButton.hidden = false;
        const waDetail = document.getElementById("whatsapp-detail");
        const waLink = document.getElementById("whatsapp-link");
        if (waDetail && waLink) {
            waLink.href = `https://wa.me/${cleanNumber}?text=${message}`;
            waLink.textContent = cleanNumber.length === 12 ? `+${cleanNumber.slice(0, 2)} ${cleanNumber.slice(2, 7)} ${cleanNumber.slice(7)}` : `+${cleanNumber}`;
            waDetail.hidden = false;
        }
    }
}

/* 11 — DYNAMIC BUSINESS DETAILS */
function updateBusinessDetails() {
    const yearElement = document.getElementById("current-year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    document.querySelectorAll("#directions-link, #contact-directions").forEach((link) => {
        if (siteConfig.directionsUrl) link.href = siteConfig.directionsUrl;
    });

    document.querySelectorAll("[data-business-phone]").forEach((element) => {
        element.textContent = siteConfig.phoneDisplay || "Call us";
        if (element.tagName === "A" && siteConfig.phone) element.href = `tel:${siteConfig.phone}`;
    });

    document.querySelectorAll("[data-business-email]").forEach((element) => {
        element.textContent = siteConfig.email || "Email us";
        if (element.tagName === "A" && siteConfig.email) element.href = `mailto:${siteConfig.email}`;
    });
}
updateBusinessDetails();

/* 12 — FAQ ACCORDION: KEEP ONE ANSWER OPEN AT A TIME */
document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
        if (!item.open) return;
        document.querySelectorAll(".faq-item").forEach((other) => {
            if (other !== item) other.open = false;
        });
    });
});
