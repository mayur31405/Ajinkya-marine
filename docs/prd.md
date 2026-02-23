
Product Requirements Document � Ajinkya Marine Website Redesign
1. Project Overview and Goals
Ajinkya Marine Pvt. Ltd. is an importer/exporter of industrial and food-grade marine chemicals (e.g. seafood additives, food enzymes, egg products)[1]. The goal of this project is to build a modern website that retains all content from the existing site but is more user-friendly and visually engaging. Key objectives include showcasing the full product range, emphasizing quality certifications (e.g. HACCP, ISO, FSSAI standards[2]), and enabling easy customer inquiries. The redesign should present the company�s capabilities clearly, support lead generation, and reflect the brand�s expertise and compliance.
Goals: Increase web leads by making contact/enquiry easy, improve user understanding of products/services, and convey trust (certifications and quality processes)[2]. Ensure the site is responsive and matches modern design norms for the marine/chemical industry.
2. Target Audience
* B2B Buyers: Procurement managers at seafood processors, food manufacturers, and industrial facilities looking for wholesale chemicals or additives.
* Suppliers/Partners: Companies in the seafood, agricultural, or chemical sectors seeking distribution partnerships.
* Regulatory/Industry Stakeholders: Visitors interested in compliance information (e.g. certification details, regulatory approvals).
These users typically seek product specifications, compliance info, and clear contact channels. The site should address their needs by offering detailed product pages and an easy inquiry process.
3. Required Pages
The site will include the following pages, mirroring the existing site�s structure:
* Home: Hero section (e.g. banner image), brief intro to Ajinkya Marine�s services, links to product categories, and a quick summary of certifications.
* About Us: Company history and mission (founded 2019 by Aditya Bhagwat), key values (reliability, quality), and quality assurances (mentioning HACCP/ISO/FSSAI)[2].
* Products / Services: A catalog of all products (e.g. various sugars, salts, calcium compounds, enzymes) and food/seafood additives. Each product or category should have a description and specifications.
* Enquiry / Contact Us: A contact form (fields for name, email, phone, company, message) and the company�s contact info (address, phone, email)[3]. This page may be labeled �Enquiry Now� with �Quick Links� if needed.
* Quick Links / Footer: (If separate) Navigation aids linking to Home, About, Products, Contact, and legal info (privacy, terms). Could be part of the footer on each page.
All pages must be mobile-responsive and use consistent navigation. Content (text, images, logos) from the original site must be carried over. If the original included images (e.g. product photos or team photos), those should be incorporated as assets.
4. Core Features and Priority
Each feature below is marked High (H), Medium (M), or Low (L) priority.
* Site Navigation (H): Clear menu with links to Home, About Us, Products, and Contact. Should be visible on all pages.
* Responsive Design (H): Site must render properly on desktop, tablet, and mobile.
* Product Catalog (H): List all products/services. If many items, use searchable/filterable lists or collapsible sections for categories (e.g. �Food Additives�, �Seafood Chemicals�).
* Contact/Enquiry Form (H): A form for visitors to submit inquiries. Must capture name, company, email, phone, and message. Acceptance: Form submissions successfully store into backend (see DB below) and trigger an auto-email acknowledgement.
* CMS / Content Management (M): Ability to update product info and pages without redeploy (e.g. via a simple CMS or database). Acceptance: Non-developers can edit text/images for Products, About, etc.
* Quality & Compliance Section (M): Section or banner highlighting certifications (HACCP, ISO, FSSAI)[2] and membership (e.g. MSME). Acceptance: Visible badges/logos or text are present on the About or footer.
* Media & Assets (M): Incorporate any existing images/logos. Optimize and compress images. Acceptance: All original images are transferred and display correctly.
* SEO Optimization (L): Include meta tags, semantic headings, and keyword-friendly content. Acceptance: Each page has relevant <title> and meta description; Google Search preview looks correct.
Each feature will be implemented incrementally, with the High-priority items tested first.
5. User Journey Mapping
1. Discover Home Page: User arrives (e.g. via Google) and sees a clear introduction of Ajinkya Marine�s business (headline and hero image). They identify that the company handles marine chemicals and food additives.
2. Navigate to Products: From the home or menu, the user browses product categories (e.g. �Food Additives� or �Seafood Chemicals�). They click a category and view details of a product (description, pack sizes).
3. Learn About Company: The user clicks �About Us� to verify the company�s credentials. They read about founding (2019), experience in seafood additives, and see quality certifications[2].
4. Submit an Inquiry: The user goes to �Contact� and fills out the enquiry form requesting pricing or samples. They receive a confirmation message. (Behind the scenes, their inquiry is saved in the database.)
5. Follow-up: (Off-site) The Ajinkya Marine team reviews incoming inquiries from the backend and contacts the lead.
These journeys prioritize a seamless path from landing to inquiry, with minimal friction in finding contact forms and product info.
6. Success Metrics & Acceptance Criteria
* Form Submission Rate: Number of inquiries submitted per month should increase. (Acceptance: Contact form records ?50 submissions in first quarter.)
* Bounce Rate Reduction: A well-designed site should lower the bounce rate. (Acceptance: Bounce rate <50% after launch.)
* Lead Response Time: Time from submission to company response. (Acceptance: Leads are logged in backend; admin can easily export or view them.)
* Content Accuracy: All existing content (product lists, company info) must appear correctly. (Acceptance: QA verifies each page matches original content sources.)
* Cross-Platform Testing: The site must work on major browsers (Chrome, Firefox, Edge, Safari) and devices. (Acceptance: No layout breaks in responsive testing.)
* SEO Benchmarks: Ensure the site is indexable and ranks for key terms. (Acceptance: All pages crawlable with appropriate meta tags.)

# Extended PRD � Ajinkya Marine Website Redesign (with RFQ)

## Core Features & Requirements  

- **Site Navigation (Must-have):**  
  *Description:* A persistent menu links to all major sections (Home, About, Products, Contact, RFQ). The footer or �Quick Links� may repeat key links. Clear labeling and a visible logo ensure brand identity.  
  *User Flow:* On every page, users can click the menu to go to any section. The �RFQ/Enquiry� link leads to the structured inquiry form.  
  *Technical:* Implement using responsive navbars (CSS/JS). Ensure ARIA labels for accessibility. No special backend needed.  
  *Priority:* Must-have.  
  *Success:* All pages are reachable via navigation; tests confirm no broken links or missing menu items.

- **Responsive Design (Must-have):**  
  *Description:* Layout adjusts for desktop, tablet, and mobile. Critical content (text, forms, product lists) remain legible on small screens.  
  *User Flow:* Mobile users see a hamburger menu; images and tables resize appropriately.  
  *Technical:* Use CSS media queries and flexible grids (e.g. Bootstrap or Flexbox). Test on common breakpoints.  
  *Priority:* Must-have.  
  *Success:* Layout reflows correctly on various devices (Google Mobile-Friendly test passes).

- **Product Catalog (Must-have):**  
  *Description:* Displays all products and chemical additives (e.g. sugars, salts, calcium compounds, enzymes). Each item has a name, description, and image/icon if available. Categories (like �Food Additives�, �Seafood Chemicals�) can organize items.  
  *User Flow:* Visitors browse categories or scroll through listings; clicking a product shows details. A filter/search can help if many items.  
  *Technical:* Static content or a simple CMS-driven list. Use grid or accordion components.  
  *Priority:* Must-have.  
  *Success:* All products from the original site are present and correctly described; users can find any item within two clicks.

- **Contact/Inquiry Form (Must-have):**  
  *Description:* A simple contact form for general inquiries. Fields include Name, Email, Phone, Company, and Message. This is distinct from the RFQ form.  
  *User Flow:* User fills the form and clicks Submit. Frontend validation ensures required fields (e.g. name, email) are filled. On success, a confirmation message appears.  
  *Technical:* On submit, data is sent to a backend endpoint or serverless function?71�L129-L138?. Backend sends an email notification to admin and logs the entry in the database.  
  *Priority:* Must-have.  
  *Success:* The team receives submissions by email, and each is stored in the database for follow-up. Validation prevents empty submissions.

- **RFQ Inquiry Form (Must-have):**  
  *Description:* A structured Request-for-Quotation form capturing detailed buyer requirements. Fields: Company Name, Contact Person, Email, Phone, Product Selection (dropdown or checklist of products), Quantity Required, Delivery Location, Message (text), and optional File Upload (for specs). This goes beyond a generic contact.  
  *User Flow:* User navigates to �RFQ� page, fills required fields, and submits. Frontend ensures e.g. a product and email are selected. The technical workflow is: validation ? backend API call ? store data ? notify admin ? display a thank-you message.  
  *Technical:* Similar to Contact Form but handles additional data and file upload. Backend must parse uploaded files (with size/type checks) and save them (file system or cloud storage). Email notifications should include key RFQ details. Serverless functions or an API endpoint will process the form?71�L129-L138?.  
  *Priority:* Must-have.  
  *Success:* Every RFQ submission is stored and triggers a notification. The admin can review submissions in an admin panel or DB; success is measured by timeliness of follow-up (e.g. respond to RFQ within 48 hours).

- **Quality & Compliance Section (Should-have):**  
  *Description:* A section (often on About page) highlighting certifications (HACCP, ISO, FSSAI) and quality statements, reflecting Ajinkya Marine�s adherence to standards?76�L266-L268?.  
  *User Flow:* Visitor scrolls to �About Us� and sees compliance badges or text summarizing safety standards (e.g. �FSSAI-approved food-grade chemicals�).  
  *Technical:* Simple image assets for badges or icons. No special backend logic.  
  *Priority:* Should-have.  
  *Success:* Certification logos/text are visible and accurate (e.g. �ISO 9001� icon appears). Trust is reinforced in user feedback.

- **CMS / Content Management (Nice-to-have):**  
  *Description:* An administrative interface to update product listings, images, and page text without code. This could be a lightweight CMS or editable database.  
  *User Flow:* Admin logs into a secure backend to edit product details or page content, then publishes changes.  
  *Technical:* Could use a headless CMS (Strapi, Contentful) or build a simple admin UI. Needs user authentication.  
  *Priority:* Nice-to-have (optional if site is mostly static).  
  *Success:* Non-technical staff can update content; QA confirms a changed item appears on the live site after publishing.

- **Media & Assets (Must-have):**  
  *Description:* All original images, logos, and PDFs (e.g. product sheets) are included. Optimize images for web (compressed JPEG/PNG) to minimize load time.  
  *User Flow:* When loading pages, images appear properly (e.g. company logo in header, product images in catalog).  
  *Technical:* Use responsive `<img>` tags (`srcset`) or CSS backgrounds. Ensure alt text for accessibility.  
  *Priority:* Must-have.  
  *Success:* No missing images; loading speed tests (e.g. <3s) pass for media. ALT tags are present.

- **SEO Optimization (Should-have):**  
  *Description:* Meta titles/descriptions and semantic HTML help search engines index the site. Use keywords like �seafood chemicals�, �food additives�, etc.  
  *User Flow:* Not directly visible to users, but affects how pages appear in search results.  
  *Technical:* Set `<title>`, `<meta>` tags, and clean URL slugs. Implement schema markup for organization info.  
  *Priority:* Should-have.  
  *Success:* Each page has unique meta tags; site appears in Google for relevant terms. All pages return HTTP 200 and are crawlable.

- **Analytics & Tracking (Nice-to-have):**  
  *Description:* Integration with Google Analytics or similar to track visitor behavior and form conversions.  
  *User Flow:* Passive (no direct user interaction). Admin can view site traffic dashboards.  
  *Technical:* Embed GA tracking code or use Google Tag Manager.  
  *Priority:* Nice-to-have.  
  *Success:* Metrics like page views and form submissions are recorded (test by submitting dummy inquiry and checking analytics event).

**Sources:** The structured RFQ fields and workflow come from standard B2B inquiry processes (similar to contact forms handled via backend APIs?71�L129-L138?). Company credentials (FSSAI, ISO, etc.) are included to align with the existing content?76�L266-L268?. 











Each acceptance criterion is testable. For example, QA will submit test inquiries to confirm the backend captures and displays them. We will measure analytics (e.g. Google Analytics) to confirm engagement metrics post-launch.
Sources: Company specialization and certification details are taken from Ajinkya Marine�s own profile[1][2]. The contact address and certifications inform the content requirements. Industry best practices (e.g. use of enquiry forms with serverless backends[4]) guide the technical approach.

[1] [2] [3] Company Brochure | PDF | Egg White | Yolk
https://www.scribd.com/document/894882937/Company-Brochure
[4] Simple Backends: Four ways to implement a �Contact Us� form on a static website | by Bobby Brennan | DataFire.io | Medium
https://medium.com/datafire-io/simple-backends-four-ways-to-implement-a-contact-us-form-on-a-static-website-10fc430984a4


