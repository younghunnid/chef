# CHEF FOUNDATION – Children Health Education Food | Platform Blueprint
**Version 2.0.0**
**Location:** Monrovia, Liberia
**Tagline:** "Feeding Minds. Healing Lives. One Child at a Time."
**Mission:** To ensure every child in Liberia has access to nutritious food, quality healthcare, and education.

---

## 1. Executive Summary
CHEF Foundation is a humanitarian organization based in Liberia, focused on supporting vulnerable children through integrated Food, Health, and Education programs. Uniquely, CHEF operates sustainable income-generating projects (Bakery, Transport, Computer School) to fund its operations, ensuring long-term viability.

### **Core Values**
*   **Compassion:** We serve with heart.
*   **Transparency:** We show where every dollar goes.
*   **Accountability:** We take responsibility for our impact.
*   **Sustainability:** We build systems, not just dependency.
*   **Community Partnership:** We work *with* Liberia, not just *for* it.

---

## 2. Allocation Model (Financial Strategy)
To ensure sustainability and growth, all revenue is allocated as follows:
*   **40% - Programs:** Direct support (Food, Medicine, Books).
*   **30% - Expansion:** Scaling the Bakery and Transport businesses.
*   **20% - Operations:** Staff salaries, logistics, admin.
*   **10% - Emergency Reserve:** Crisis fund for urgent cases.

---

## 3. UI/UX Wireframe Explanation

### **A. Homepage (Public)**
*   **Header:** Sticky Navbar with Orange/Green accents. "Donate" button prominent.
*   **Hero:** Full-width emotional image of Liberian children. Overlay text: "Feeding Minds. Healing Lives."
*   **Impact Strip:** Animated counters (Children Fed, Treated, Books Distributed).
*   **Program Grid:** 3-Column layout for Food (Bakery), Health (Doctors), Education (Computers).
*   **Trust Section:** Partner logos (Compassion, UK Donors) + Transparency Chart.

### **B. Admin Dashboard (Protected)**
*   **Sidebar:** Dark mode navigation (Children, Donations, Bakery, Fleet).
*   **KPI Cards:** Top row metrics (Total Revenue, Active Doctors, Stock Levels).
*   **Tables:** Sortable lists for "Recent Donations" and "Pending Approvals".
*   **Action Fab:** Floating button to "Log Production" or "Add Child".

### **C. Donor Portal (Protected)**
*   **Welcome Card:** Personalized greeting with "Total Impact" summary.
*   **My Children:** Grid of sponsored child profiles with progress bars.
*   **Timeline:** Vertical feed of updates (e.g., "Emmanuel received a book today").

---

## 4. Database Schema (Supabase/PostgreSQL)

### **Core Tables**
*   `users`: (id, email, role, country)
*   `children`: (id, name, bio, needs_sponsorship, health_status)
*   `donations`: (id, donor_id, amount, allocation_category)
*   `sponsors`: (id, user_id, child_id, start_date)

### **Program Tables**
*   `bakery_logs`: (id, date, loaves_baked, sold, donated)
*   `health_records`: (id, child_id, doctor_id, diagnosis, treatment)
*   `book_inventory`: (id, title, quantity, school_distributed_to)
*   `transport_revenue`: (id, vehicle_type, daily_income, maintenance_cost)

---

## 5. Future Expansion Roadmap

### **Phase 1: Foundation (Current)**
*   Launch core website and donation portal.
*   Digitize Bakery and Transport revenue logs.
*   Establish Doctor Volunteer Registry.

### **Phase 2: Growth (6-12 Months)**
*   **Mobile App:** Launch dedicated app for Sponsors to receive push notifications.
*   **Telehealth Integration:** Connect UK doctors with Monrovia clinics via video.
*   **Smart Inventory:** RFID tracking for library books and laptops.

### **Phase 3: Scale (1-3 Years)**
*   **National Expansion:** Replicate the CHEF Bakery model in Gbarnga and Buchanan.
*   **CHEF University:** Full-scale accredited Computer Science degree program.
*   **AI Analytics:** Predictive modeling for malnutrition outbreaks.

---

## 6. Directory Structure

```
/chef-platform
├── /app                  # Next.js App Router
│   ├── /api              # API Routes
│   ├── /(public)         # Homepage, About, Donate, Transparency
│   ├── /(dashboard)      # Admin, Donor, Volunteer views
│   └── layout.tsx        # Main Layout
├── /components           # UI Kit (Navbar, Footer, Forms)
├── /lib                  # Logic (Supabase, Stripe, Calculations)
├── /types                # TypeScript Interfaces
└── /public               # Static Assets
```
