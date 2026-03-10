<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Ajinkya Marine Banner" width="100%" />

  <h1>Ajinkya Marine Pvt. Ltd.</h1>
  <p><strong>Official Corporate Web Platform & Inquiry Management System</strong></p>
</div>

<br />

## 📖 Overview

This repository contains the source code for the official corporate website and internal administration portal of **Ajinkya Marine Pvt. Ltd.** 

Built with modern web technologies, this platform is designed to provide seamless public access to the company's maritime services and product catalogs while offering a highly secure internal dashboard for staff to manage customer relationships, quotations, and general inquiries.

## ✨ Key Capabilities

### Public Portal
* **Interactive Product Catalog**: Allow prospective clients to explore offerings and dynamically select products for quotation.
* **Streamlined RFQ Engine**: A robust Request For Quotation (RFQ) system handling multi-product requests, precise delivery locations, and secure file attachments (e.g., blueprints, specification docs).
* **Responsive Architecture**: A fully fluid and modern user interface engineered with Tailwind CSS to ensure accessibility across all devices and screen sizes.
* **SEO & Performance Optimized**: Leverages Next.js server-side rendering (SSR) and App Router for lightning-fast page loads and optimal search engine discoverability.

### Administration & Operations (`/admin`)
* **Centralized Dashboard**: A secure operations hub providing a high-level overview of incoming inquiries and pending quotations.
* **Workflow Management**: Tools to view detailed customer submissions, update RFQ statuses (e.g., *NEW*, *REVIEWED*, *QUOTED*, *CLOSED*), and seamlessly reply via integrated email links.
* **Declutter & Organization**: Capabilities to selectively "Mark All as Read" or securely purge obsolete records to maintain database hygiene.
* **Enterprise-Grade Security**: Defended by IP-based API rate limiting, strict input sanitization preventing Cross-Site Scripting (XSS), and HTTP security headers.

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | `Next.js 14` (App Router) | Core React framework providing SSR and robust routing. |
| **Styling** | `Tailwind CSS` | Utility-first CSS framework for rapid UI development. |
| **Language** | `TypeScript` | Ensures strictly-typed, scalable, and maintainable code. |
| **Database** | `MongoDB` | Primary NoSQL data store for persistence. |
| **Offline Fallback** | `Node.js FS` | Automatically falls back to local JSON file storage (`/data/*`) during development or database downtime. |

## 🚀 Getting Started

### Prerequisites

Ensure the following environments are installed on your local machine:
* **Node.js**: `v18.x` or higher
* **npm**: `v9.x` or higher
* **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mayur31405/Ajinkya-marine.git
   cd Ajinkya-marine/website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the Environment:**
   Duplicate the `.env.example` file (if available) or create a new `.env` file in the root `website/` directory:
   ```env
   # Database connection string (e.g., MongoDB Atlas URI)
   MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/ajinkya_marine?retryWrites=true&w=majority"
   
   # Secure passphrase for the /admin portal
   ADMIN_PASSWORD="your_secure_passphrase"
   ```

4. **Launch the Development Server:**
   ```bash
   npm run dev
   ```
   The platform will now be accessible at [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Architecture & Structure

```text
website/
├── data/                  # Auto-generated JSON fallbacks (if MongoDB is disconnected)
├── public/                # Static global assets (images, icons)
├── uploads/               # Secure directory for client RFQ file attachments
├── src/
│   ├── app/               # Next.js App Router definitions
│   │   ├── (public)/      # Standard website pages (Home, About, Services, Contact)
│   │   ├── admin/         # Secure staff operations dashboard
│   │   └── api/           # Backend RESTful endpoints and serverless functions
│   ├── components/        # Isolated, reusable React components
│   └── lib/               # Shared utilities (DB drivers, Security middleware)
└── next.config.ts         # Next.js configuration and security header definitions
```

## 🔒 Security Posture

Security is a primary focus of this architecture. The following measures are enforced:
1. **API Rate Limiting**: Mitigates automated scraping and DDoS attacks on public forms.
2. **Payload Sanitization**: Multi-layered defense against SQL injection and XSS via `sanitizeHtml` utilities.
3. **File Upload Verification**: Strict MIME-type checking and maximum file size enforcement to prevent malware storage.
4. **Header Hardening**: Implementation of `X-Frame-Options`, `X-Content-Type-Options`, and `Strict-Transport-Security`.

---

<p align="center">
  <small>© 2026 Ajinkya Marine Pvt. Ltd. All Rights Reserved.</small>
</p>
