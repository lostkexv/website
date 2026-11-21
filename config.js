/* =====================================================
   KESHAV ASSOCIATES — BUSINESS CONFIGURATION
   Update business details here so they stay consistent
   across the homepage and service pages.
===================================================== */

window.SITE_CONFIG = {
    businessName: "Keshav Associates",
    tagline: "Everyday services, made simpler.",
    address: "22-C, Jagdish Colony, Rajpura Road, Patiala, Punjab, India",
    locationLabel: "Patiala, Punjab",
    directionsUrl: "https://maps.app.goo.gl/44dGacqJNk7krKvF7",
    hours: "Monday – Sunday, 8:00 AM – 9:00 PM",
    phoneDisplay: "0175-291-0784",
    phone: "+911752910784",
    email: "keshavassociates4@gmail.com",
    whatsapp: "918847227077", // Country code + digits only. Change here to update every WhatsApp link.
    advisor: {
        name: "Parshotam Sharma",
        role: "Sr. Financial Advisor, LIC",
        profileUrl: "https://saathi.licindia.co.in/s/parshotam-sharma/0293016y"
    },
    social: {
        instagram: "",
        facebook: "",
        youtube: "",
        linkedin: ""
    }
};

/*
   Confirmed service list supplied by the business.
   Descriptions are concise summaries of the listed services,
   not statements about eligibility, approval or guaranteed outcomes.
*/
window.SERVICE_CATALOG = [
    {
        slug: "lic-new-insurance-policy",
        title: "LIC New Insurance Policy",
        category: "insurance",
        categoryLabel: "Insurance",
        short: "Assistance with exploring and applying for a new LIC insurance policy.",
        description: "Get assistance with enquiries and the process of applying for a new LIC insurance policy. Policy options, eligibility, documentation and applicable terms should be confirmed directly before proceeding.",
        keywords: "lic life insurance new policy insurance policy advisor premium application"
    },
    {
        slug: "lic-policy-corrections",
        title: "Corrections in LIC Policy",
        category: "insurance",
        categoryLabel: "Insurance",
        short: "Support with LIC policy correction and update enquiries.",
        description: "Assistance with enquiries relating to corrections or updates in an existing LIC policy. The exact correction, supporting documents and process depend on the policy and should be confirmed with the advisor.",
        keywords: "lic corrections update change policy details insurance"
    },
    {
        slug: "car-insurance",
        title: "Car Insurance",
        category: "insurance",
        categoryLabel: "Insurance",
        short: "Assistance with car insurance enquiries and related requirements.",
        description: "Get assistance with car insurance enquiries and related process information. Coverage, pricing, insurer terms and availability must be checked for the individual vehicle and policy.",
        keywords: "car motor vehicle insurance four wheeler"
    },
    {
        slug: "two-wheeler-insurance",
        title: "Two-Wheeler Insurance",
        category: "insurance",
        categoryLabel: "Insurance",
        short: "Assistance with insurance enquiries for two-wheelers.",
        description: "Support with two-wheeler insurance enquiries and the information needed to proceed. Policy options, coverage, pricing and terms depend on the vehicle and insurer.",
        keywords: "bike scooter motorcycle two wheeler insurance"
    },
    {
        slug: "money-transfer",
        title: "Money Transfer",
        category: "finance",
        categoryLabel: "Financial Services",
        short: "Access assistance for money transfer service enquiries.",
        description: "Keshav Associates offers money transfer services. Please contact the business to confirm the current process, transaction limits, required information and applicable charges before making a transaction.",
        keywords: "money transfer remittance send money cash"
    },
    {
        slug: "aeps-cash-withdrawal",
        title: "Cash Withdrawal — AEPS",
        category: "finance",
        categoryLabel: "Financial Services",
        short: "AEPS-based cash withdrawal service assistance.",
        description: "Cash withdrawal through AEPS is listed among the services offered. Availability, supported bank accounts, transaction limits and any applicable charges should be confirmed at the counter. Never share your PIN or OTP with anyone.",
        keywords: "aeps cash withdrawal aadhaar enabled payment system banking"
    },
    {
        slug: "passport-application",
        title: "Passport Application",
        category: "identity",
        categoryLabel: "Identity & Online Forms",
        short: "Assistance with passport application-related online steps.",
        description: "Get assistance with the online steps associated with applying for a passport. Official eligibility, documents, appointment requirements, fees and application status are determined by the relevant government authority.",
        keywords: "passport apply application new passport online"
    },
    {
        slug: "voter-card",
        title: "Voter Card Services",
        category: "identity",
        categoryLabel: "Identity & Online Forms",
        short: "Assistance with voter card-related online form processes.",
        description: "Assistance with voter card-related online application or form-filling enquiries. The appropriate form, supporting documents and final approval are handled under the relevant Election Commission process.",
        keywords: "voter card voter id election identity card"
    },
    {
        slug: "pan-card",
        title: "PAN Card Services",
        category: "identity",
        categoryLabel: "Identity & Online Forms",
        short: "Help with PAN card application-related online processes.",
        description: "Get assistance with PAN card-related application and online form processes. Required documents, fees, corrections and application status depend on the request and the authorised service process.",
        keywords: "pan card permanent account number apply correction"
    },
    {
        slug: "aadhaar-card",
        title: "Aadhaar Card Assistance",
        category: "identity",
        categoryLabel: "Identity & Online Forms",
        short: "Guidance for Aadhaar-related service enquiries.",
        description: "Assistance with Aadhaar-related service enquiries and online information. Some Aadhaar updates and authentication activities require an authorised Aadhaar centre or official UIDAI process; availability will be confirmed before proceeding.",
        keywords: "aadhaar aadhar uidai identity card update"
    },
    {
        slug: "online-form-filling",
        title: "Online Form Filling",
        category: "identity",
        categoryLabel: "Identity & Online Forms",
        short: "Practical help completing online forms and applications.",
        description: "Get assistance with entering information into online forms and applications. The customer should review all details for accuracy before submission and provide only information required for the specific form.",
        keywords: "online form filling application data entry registration"
    },
    {
        slug: "railway-ticket-booking",
        title: "Railway Ticket Booking",
        category: "travel",
        categoryLabel: "Travel Bookings",
        short: "Assistance with railway ticket booking enquiries.",
        description: "Assistance with railway ticket booking enquiries and the booking process. Availability, fare, passenger details, rules and confirmation are subject to the relevant railway booking system.",
        keywords: "railway train ticket booking travel"
    },
    {
        slug: "bus-ticket-booking",
        title: "Bus Ticket Booking",
        category: "travel",
        categoryLabel: "Travel Bookings",
        short: "Support with bus ticket booking enquiries.",
        description: "Assistance with bus ticket booking enquiries. Routes, operators, seats, fares, cancellation rules and booking confirmation depend on the selected service provider.",
        keywords: "bus ticket booking travel"
    },
    {
        slug: "air-ticket-booking",
        title: "Air Ticket Booking",
        category: "travel",
        categoryLabel: "Travel Bookings",
        short: "Assistance with flight and air ticket booking enquiries.",
        description: "Assistance with air ticket booking enquiries and the booking process. Flight availability, fares, baggage rules, passenger requirements and changes are subject to the airline and booking provider.",
        keywords: "air ticket flight booking airline travel"
    },
    {
        slug: "photostat",
        title: "Photostat & Photocopy",
        category: "print",
        categoryLabel: "Print & Document Services",
        short: "Everyday photocopying and document-copy services.",
        description: "Photostat and photocopy services for everyday document needs. Please ask about page sizes, quantity and any specific copy requirements when visiting.",
        keywords: "photostat photocopy xerox copy documents"
    },
    {
        slug: "passport-size-photo",
        title: "Instant Passport-Size Photo",
        category: "print",
        categoryLabel: "Print & Document Services",
        short: "Instant passport-size photo service.",
        description: "Get instant passport-size photographs for common application and documentation needs. Please confirm the required photo dimensions and format for your specific application before printing.",
        keywords: "passport photo instant photograph photo print"
    },
    {
        slug: "stationery",
        title: "Stationery",
        category: "print",
        categoryLabel: "Print & Document Services",
        short: "Stationery items for everyday office, school and personal use.",
        description: "Keshav Associates also offers stationery. Visit the shop to enquire about currently available items and requirements.",
        keywords: "stationery school office pens paper supplies"
    },
    {
        slug: "printouts",
        title: "Printouts",
        category: "print",
        categoryLabel: "Print & Document Services",
        short: "Document printing for everyday needs.",
        description: "Printout services for documents and everyday paperwork. Please confirm file format, page size, colour requirements and quantity when placing your request.",
        keywords: "printout printing document print black white colour"
    },
    {
        slug: "lamination",
        title: "Lamination",
        category: "print",
        categoryLabel: "Print & Document Services",
        short: "Lamination for documents and printed materials.",
        description: "Lamination service for selected documents and printed materials. Available sizes and suitability can be confirmed at the shop.",
        keywords: "lamination document protect plastic cover"
    },
    {
        slug: "book-binding",
        title: "Book Binding",
        category: "print",
        categoryLabel: "Print & Document Services",
        short: "Book and document binding services.",
        description: "Book binding for selected documents and printed materials. Please ask about available binding styles, sizes, quantities and turnaround at the shop.",
        keywords: "book binding document file bind"
    }
];
