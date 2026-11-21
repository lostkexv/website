KESHAV ASSOCIATES — WEBSITE PROJECT
===================================

PROJECT FILES
-------------
index.html          Main cinematic homepage and service directory
style.css           Visual design, responsive layouts and animations
main.js             Homepage interactions, animated service finder and contact form
config.js           Business contact details and complete service catalogue
service.html        Reusable individual service detail page
service.js          Loads each service page from the catalogue
track-enquiry.html  Enquiry tracking preview (secure backend not connected)
assets/images/      Add the original KA logo and any supplied business imagery here

HOW TO RUN
----------
1. Open this folder in VS Code.
2. Add the KA logo at:
   assets/images/White KA Monogram Orbit Logo.png
3. Add the existing hero background image at:
   assets/images/73efd6b3-1599-4c36-b454-8556db3bdc20.png
4. Use the VS Code Live Server extension and open index.html.

The website uses Google Fonts. An internet connection is needed to load them.
The hero visual has CSS artwork as a fallback if the image asset is not yet present.

CONFIRMED BUSINESS DETAILS
--------------------------
Business: Keshav Associates
Address: 22-C, Jagdish Colony, Rajpura Road, Patiala, Punjab, India
Directions: https://maps.app.goo.gl/44dGacqJNk7krKvF7
Phone: 0175-291-0784
Email: keshavassociates4@gmail.com
Hours: Monday to Sunday, 8:00 AM to 9:00 PM
LIC Advisor: Parshotam Sharma, Sr. Financial Advisor, LIC
LIC Advisor profile: https://saathi.licindia.co.in/s/parshotam-sharma/0293016y

EDIT BUSINESS INFORMATION
-------------------------
Open config.js and edit window.SITE_CONFIG.
WhatsApp is set in config.js (whatsapp: "918847227077"). Use country code + digits only.
Change it there and the floating button, contact details and every service page update.

The social media URLs are left blank until supplied.

SERVICE CATALOGUE
-----------------
The service catalogue lives in config.js under window.SERVICE_CATALOG.
Each item has:
- slug: URL identifier for its own detail page
- title: service name
- category: insurance, finance, identity, travel or print
- categoryLabel: human-readable category
- short: card description
- description: service detail description
- keywords: extra terms used by live search

To add another service, add another object to SERVICE_CATALOG.
The homepage grid, category filter, live search and service detail page
will use that data automatically.

ANIMATIONS AND INTERACTIONS
---------------------------
- Animated three-slide hero with manual arrows and timed transitions
- Hero glass artwork gently responds to mouse movement on desktop
- Infinite service ticker pauses when hovered
- Scroll progress line at the top of the page
- Scroll reveal with staggered timing
- Animated service cards with pointer light and subtle tilt
- Live service search and category filtering
- Responsive mobile navigation
- FAQ accordion
- Floating WhatsApp button, contact-section WhatsApp line and a WhatsApp enquiry button
  on every service page (service name prefilled). All driven by config.js
- v3: WebGL flow field behind the hero that shifts with each hero slide (screen-blended
  over your hero image). Falls back to the CSS hero if WebGL is unavailable
- v3: Pinned horizontal Collections showcase built from the catalogue; each service
  links to its own page. On phones it is a swipe carousel
- v3: Lenis smooth scroll on desktop (GSAP + ScrollTrigger from CDN)
- prefers-reduced-motion support

FUNCTIONALITY NOTES
-------------------
- The call link uses the supplied business phone number.
- The directions buttons open the exact Google Maps short link supplied.
- The email link uses the supplied business email.
- The contact form prepares an email draft in the visitor's email application.
  The visitor must review and send it. This is not a stored web enquiry form.
- WhatsApp opens a chat to the number in config.js.
- Enquiry tracking is a preview only. A secure backend, database, authentication,
  customer verification and admin dashboard are required before real tracking.
- No social accounts, customer testimonials, statistics or announcements are invented.

IMPORTANT SERVICE NOTES
-----------------------
The catalogue descriptions are summaries of the services provided by the business.
Eligibility, official approval, fees, insurer/provider terms, required documents,
service availability and processing times must be confirmed with Keshav Associates
or the relevant official provider. The site does not promise approvals or outcomes.

NEXT ITEMS TO COLLECT
---------------------
1. Business tagline and final About Us wording.
2. Social media profile links.
3. Business photographs and any preferred hero images.
4. Service-specific documents, steps, fees or requirements where appropriate.
5. Backend details for secure enquiry storage and tracking.
