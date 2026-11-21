/* =====================================================
   KESHAV ASSOCIATES — INDIVIDUAL SERVICE PAGE
===================================================== */

const config = window.SITE_CONFIG || {};
const catalog = window.SERVICE_CATALOG || [];
const params = new URLSearchParams(window.location.search);
const requestedSlug = params.get("service");
const service = catalog.find((item) => item.slug === requestedSlug);

const titleElement = document.getElementById("service-title");
const introElement = document.getElementById("service-intro");
const eyebrowElement = document.getElementById("service-eyebrow");
const overviewElement = document.getElementById("service-overview");
const overviewTitle = document.getElementById("service-overview-title");
const numberElement = document.getElementById("service-number");
const enquireLink = document.getElementById("service-enquire");
const metaElement = document.querySelector(".detail-meta");
const relatedLinks = document.querySelector(".related-links");

if (service) {
    document.title = `${service.title} | Keshav Associates`;
    if (titleElement) titleElement.textContent = service.title;
    if (introElement) introElement.textContent = service.short;
    if (eyebrowElement) eyebrowElement.textContent = `KESHAV ASSOCIATES / ${service.categoryLabel.toUpperCase()}`;
    if (overviewTitle) overviewTitle.innerHTML = "A clearer way to<br><em>get started.</em>";
    if (overviewElement) overviewElement.textContent = service.description;
    if (numberElement) numberElement.textContent = String(catalog.indexOf(service) + 1).padStart(2, "0");
    if (enquireLink) enquireLink.href = `index.html?service=${encodeURIComponent(service.slug)}#contact`;
    if (metaElement) {
        metaElement.innerHTML = `<span>${service.categoryLabel.toUpperCase()}</span><span>OPEN DAILY · 8 AM – 9 PM</span>`;
    }
} else {
    document.title = "Service not found | Keshav Associates";
    if (titleElement) titleElement.textContent = "Service not found.";
    if (introElement) introElement.textContent = "This service link may have changed. Return to the full service directory to explore the available services.";
    if (eyebrowElement) eyebrowElement.textContent = "KESHAV ASSOCIATES / SERVICE DIRECTORY";
    if (overviewElement) overviewElement.textContent = "Browse the complete service list or contact Keshav Associates in Patiala for assistance.";
    if (enquireLink) enquireLink.href = "index.html#services";
}

if (relatedLinks) {
    const related = catalog.filter((item) => item.category === service?.category && item.slug !== service.slug).slice(0, 3);
    const fallback = catalog.filter((item) => item.slug !== service?.slug).slice(0, 3);
    const items = related.length ? related : fallback;
    relatedLinks.innerHTML = items.map((item) =>
        `<a href="service.html?service=${encodeURIComponent(item.slug)}">${item.title}<span>↗</span></a>`
    ).join("");
}

const yearElement = document.getElementById("current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

document.querySelectorAll("#service-enquire").forEach((link) => {
    link.addEventListener("click", () => {
        const serviceField = document.querySelector("#contact-category");
        if (serviceField && service) serviceField.value = service.title;
    });
});

/* WhatsApp enquiry: appears once config.js has a WhatsApp number, with the service name prefilled */
const waButton = document.getElementById("service-whatsapp");
const waNumber = String(config.whatsapp || "").replace(/\D/g, "");
if (waButton && waNumber) {
    const text = service ? `Hello Keshav Associates, I would like to enquire about: ${service.title}.` : "Hello Keshav Associates, I would like to enquire about your services.";
    waButton.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    waButton.hidden = false;
}
