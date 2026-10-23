# Karachi Bites — M0 Discovery Plan & Architecture Specification
**Deliverable:** Milestone 0 (Day 2 Deliverable)  
**Author:** Senior Full-Stack Engineer & Mobile-First Product Designer  
**Project:** Karachi Bites Online Ordering System  
**Date:** March 2026 / Local Timestamp Baseline  

---

## 1. Executive Summary & Product Objective
Karachi Bites is a high-performance, mobile-first restaurant online ordering platform designed specifically for Karachi consumers operating on mobile networks (including Slow 3G) and budget Android devices ($\ge 360\text{px}$ viewport width). 

The platform supports three distinct branches (**Clifton**, **Gulshan-e-Iqbal**, and **North Nazimabad**), offers a seed menu of 12 signature items with multi-criteria combined filtering, maintains cart persistence across reloads, enforces rigorous server-side calculations (subtotals, configurable flat delivery fee starting at Rs. 150, totals), facilitates telephone-verified order tracking through a strict 4-step state progression (**Received → Preparing → Out for Delivery → Delivered**), and equips restaurant staff with a secure, branch-filterable admin dashboard.

---

## 2. Page List & User Flows

### A. Customer Experience (`/` & Customer Views)
1. **Header & Navigation**:
   - Wordmark brand lockup `Karachi Bites`.
   - Compact navigation: `Menu` · `Track Order`.
   - Sticky cart indicator displaying live item count and subtotal.
2. **Hero Section**:
   - Value proposition: *"Karachi flavours, delivered fresh."*
   - Active branch selector (**Clifton**, **Gulshan-e-Iqbal**, **North Nazimabad**) with delivery ETA estimates.
   - Quick CTAs: *Explore Menu* and *Track Order*.
3. **Menu & Combined Filter System**:
   - **Category Navigation**: BBQ, Karahi, Rice, Rolls, Drinks, Desserts.
   - **Multi-Criteria Filter Engine** (simultaneous application):
     - Real-time text search (name and description matching).
     - Vegetarian filter toggle (`veg`).
     - Spicy preference toggle (`spicy`).
     - Maximum price range slider (`Rs. 150` to `Rs. 2000`).
     - Single-tap filter reset control with active matched count indicator.
   - **Menu Item Cards**:
     - Authentic item photography, category tag, name, price (Rs.), dietary tags (`mild`, `spicy`, `veg`), and real-time stock indicator (`Available` vs `Unavailable`).
     - Accessible touch-friendly counter and "Add" controls (minimum $44\times 44\text{px}$ touch targets).
4. **Persistent Shopping Cart**:
   - Synced with browser `localStorage` to survive page reloads and tab closures.
   - Mobile persistent bottom cart bar when non-empty (`Rs. Total` + `View Cart`).
   - Slide-over / modal cart drawer with itemized quantities (+/−), removal triggers, item subtotals, configurable delivery fee (Rs. 150), and final grand total.
5. **Checkout View (`/checkout`)**:
   - Customer information capture:
     - Full Name.
     - Pakistani Mobile Phone Number (validated against `^((\+92)|(0092)|(0))?3[0-9]{2}[0-9]{7}$`).
     - Delivery Address with Karachi landmarks/sector guidance.
     - Branch Confirmation (Clifton / Gulshan-e-Iqbal / North Nazimabad).
     - Optional Special Delivery / Kitchen Notes.
   - Review panel with server-validated pricing breakdown.
   - Double-submission lock prevention during network flight.
6. **Live Order Tracking Portal (`/track`)**:
   - Dual-credential lookup: **Order ID** (e.g., `KB-2026-XXXX`) + **Customer Phone Number**.
   - Chronological step timeline:
     $$\text{Received} \longrightarrow \text{Preparing} \longrightarrow \text{Out for Delivery} \longrightarrow \text{Delivered}$$
   - Active state indicators, estimated delivery timeline, branch contact hotline, and itemized receipt summary.

### B. Staff & Management Experience (`/admin`)
1. **Authentication Gate**:
   - Secure staff sign-in (`username` and `password`).
   - Rate-limited against brute-force attempts.
   - Generic error messages to prevent username enumeration.
2. **Operations Dashboard**:
   - Key operational metrics: Total orders today, active orders, orders out for delivery.
   - Branch filter dropdown (`All`, `Clifton`, `Gulshan-e-Iqbal`, `North Nazimabad`).
   - Date selector filter for historical and daily reconciliations.
   - Responsive card-based order queue (stacked for $360\text{px}$ mobile screens, tabular for desktop).
   - Strict one-step advancement trigger (`Advance to [Next Status]`).
   - Strict prevention of illegal transitions: backward transitions, step skipping, or updates to already `Delivered` orders are strictly rejected by the server.

---

## 3. MoSCoW Feature Priorities

### Must-Have (M1 & M2 Critical Path)
- [x] **Branch Isolation**: Support for Clifton, Gulshan-e-Iqbal, North Nazimabad.
- [x] **Seed Catalog**: Exact 12 items, fixed IDs (1–12), official prices (Rs. 150–1650), tags, and availability status.
- [x] **Combined Filtering Engine**: Category + Text Search + Veg toggle + Spicy toggle + Max Price slider working simultaneously.
- [x] **Persistent Cart**: Client-side localStorage persistence with quantity manipulation (+/−) and item deletion.
- [x] **Server-Authoritative Pricing**: Subtotals, flat delivery fee (Rs. 150 base), and grand totals computed strictly on the backend to prevent tampering.
- [x] **Pakistani Mobile Validation**: Strict regex enforcing valid Pakistani mobile formats.
- [x] **Strict Order State Machine**: Sequential enforcement of `Received → Preparing → Out for Delivery → Delivered` with HTTP 400 rejection for skipping, reverting, or modifying delivered orders.
- [x] **Six Mandatory API Endpoints**: Unaltered implementation of the fixed contract:
  1. `GET /api/menu`
  2. `POST /api/orders`
  3. `GET /api/orders/:id`
  4. `POST /api/auth/login`
  5. `GET /api/admin/orders?branch=&date=`
  6. `PATCH /api/admin/orders/:id/status`
- [x] **Protected Admin Portal**: Token-based authentication (Bearer token) protecting admin endpoints and interface.
- [x] **Mobile First Usability**: 360px viewport compatibility without horizontal scrolling; comfortable $44\text{px}$ touch targets.
- [x] **Persistent Server Data**: Durable database storage that survives server restarts and redeployments.

### Should-Have (M2 & M3 Enhancements)
- [ ] Safe phone-verified customer tracking resolution preserving the fixed `GET /api/orders/:id` automated test contract.
- [ ] Brute-force rate limiting on `/api/auth/login` (e.g., 5 attempts / 15 minutes) and `/api/orders` (10 orders / minute / IP).
- [ ] Network failure states with actionable retry banners for unstable mobile data.
- [ ] Visual empty states (no menu matches found, empty cart, no branch orders).
- [ ] Admin branch-level live count badges.

### Could-Have (M3 Bonus / Extension)
- [ ] Kitchen ticket thermal print view (`window.print` styled stylesheet).
- [ ] CSV export of orders for accounting and daily reconciliation.
- [ ] English / Urdu (RTL) localization toggle.
- [ ] One-tap "Order Again" feature restoring previous items to cart.
- [ ] Google Lighthouse Mobile Performance Audit score $\ge 85$.

---

## 4. Proposed Technology Stack & Architectural Decisions

| Layer | Chosen Technology | Architectural Justification & Trade-offs |
|---|---|---|
| **Frontend** | Vanilla HTML5, Modern ES Modules, Tailwind CSS | Strictly adheres to the project's **no-framework constraint** (no React/Next/Vue). Guarantees ultra-lightweight payload ($< 150\text{KB}$ JS/CSS total), executing instantly on low-end Android CPUs and easily surpassing the Slow 3G $< 3\text{s}$ loading budget. |
| **Backend Runtime** | Node.js (v20+) with Express | Fast, asynchronous event-driven server well-suited for I/O operations, JSON API serialization, and seamless integration with Vite middleware or static delivery. |
| **Data Persistence** | SQLite (with WAL mode) or Persistent Disk-Backed JSON Store | Guarantees relational integrity, foreign key cascades, parameterised SQL safety against injections, and zero latency overhead. Placed on a mounted persistent volume to ensure persistence across server redeployments and restarts. |
| **Security & Auth** | `bcryptjs` / PBKDF2 + Cryptographic Token (JWT / Signed Session) | Salted, slow-hash password hashing prevents rainbow-table attacks; stateless Bearer token authentication satisfies the fixed API contract for `/api/admin/*`. |
| **Validation** | Server-side validation schema (Joi / Zod or custom validator) | Sanitizes text fields, enforces phone regex, ensures quantities are integers $\ge 1$, verifies item IDs against active catalog, and recalculates monetary sums. |

---

## 5. Repository File & Directory Structure

```text
karachi-bites/
├── .env.example                 # Template for PORT, JWT_SECRET, ADMIN_USER, ADMIN_PASS, DELIVERY_FEE
├── .gitignore                   # Excludes node_modules, .env, *.sqlite, build artifacts
├── index.html                   # Customer storefront entry point (Menu, Cart, Checkout, Track)
├── admin.html                   # Dedicated staff portal entry point (Login, Queue, Status updates)
├── metadata.json                # Project identity and capabilities descriptor
├── package.json                 # Express, server scripts, build tooling
├── tsconfig.json                # TypeScript / modern JS tooling configuration
├── vite.config.ts               # Bundler and static server configuration
├── README.md                    # Setup guide, credentials, architecture, runbook
├── API.md                       # Comprehensive API contract documentation with curl examples
├── DECISIONS.md                 # 6 architectural trade-off records
├── AI_LOG.md                    # Record of prompts, AI mistakes, and engineering fixes
├── M0_DISCOVERY.md              # Approved discovery plan (this document)
├── src/
│   ├── index.css                # Global styles, Tailwind directives, print media styles
│   ├── main.js                  # Frontend client bootstrap and routing router
│   ├── client/
│   │   ├── api.js               # Frontend API client communicating with backend
│   │   ├── cart.js              # LocalStorage persistent cart state store
│   │   ├── filters.js           # Combined filter engine (category, search, veg, spicy, price)
│   │   ├── menu-view.js         # Menu rendering, cards, availability states
│   │   ├── checkout-view.js     # Form validation, phone formatting, order submission
│   │   ├── tracking-view.js     # Dual-key lookup and progress timeline renderer
│   │   └── admin-view.js        # Staff login, branch filter, one-click status transitions
│   ├── server/
│   │   ├── app.js               # Express app configuration & middleware
│   │   ├── routes/
│   │   │   ├── menu.routes.js   # GET /api/menu
│   │   │   ├── order.routes.js  # POST /api/orders & GET /api/orders/:id
│   │   │   ├── auth.routes.js   # POST /api/auth/login
│   │   │   └── admin.routes.js  # GET /api/admin/orders & PATCH /api/admin/orders/:id/status
│   │   ├── middleware/
│   │   │   ├── auth.js          # Bearer token verification middleware
│   │   │   ├── rate-limit.js    # Rate limiting for auth and orders
│   │   │   └── validate.js      # Input sanitization and payload validation
│   │   ├── models/
│   │   │   ├── db.js            # Database connection & migration initializer
│   │   │   ├── menu.model.js    # Menu catalog query operations
│   │   │   └── order.model.js   # Order transaction & state machine operations
│   │   └── seed/
│   │       └── seed-data.js     # 12 seed items, branches, initial admin user
└── server.js                    # Production server entry point (Node.js + Express)
```

---

## 6. Relational Data Model

### Entity Relationship Diagram (Conceptual)
```text
[ BRANCHES ] 1 ──< [ ORDERS ] >── 1 [ CUSTOMERS ]
                         │
                         ├── 1 ──< [ ORDER_ITEMS ] >── 1 [ MENU_ITEMS ]
                         │
                         └── 1 ──< [ ORDER_STATUS_LOGS ]
```

### Relational Tables & Schema Specifications

#### 1. `branches`
- `id` (VARCHAR(32), PRIMARY KEY) — `'clifton'`, `'gulshan'`, `'nazimabad'`.
- `name` (VARCHAR(100), NOT NULL) — Display name (e.g., `'Clifton'`).
- `address` (TEXT, NOT NULL) — Physical branch address.
- `phone` (VARCHAR(20), NOT NULL) — Branch contact phone number.
- `is_active` (BOOLEAN, DEFAULT TRUE).

#### 2. `menu_items`
- `id` (INTEGER, PRIMARY KEY) — Fixed numeric IDs (1 through 12).
- `name` (VARCHAR(150), NOT NULL) — Seed item name.
- `category` (VARCHAR(50), NOT NULL) — `'BBQ'`, `'Karahi'`, `'Rice'`, `'Rolls'`, `'Drinks'`, `'Desserts'`.
- `price` (INTEGER, NOT NULL) — In PKR (e.g., 850, 780, 1650).
- `tags` (VARCHAR(50), NOT NULL) — `'mild'`, `'spicy'`, `'veg'`.
- `available` (BOOLEAN, DEFAULT TRUE) — Current stock availability.
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP).

#### 3. `orders`
- `id` (VARCHAR(32), PRIMARY KEY) — Unique human-readable identifier (e.g., `'KB-2026-8491'`).
- `customer_name` (VARCHAR(150), NOT NULL).
- `customer_phone` (VARCHAR(20), NOT NULL) — Validated Pakistani mobile phone.
- `delivery_address` (TEXT, NOT NULL).
- `branch_id` (VARCHAR(32), NOT NULL, FOREIGN KEY REFERENCES `branches(id)`).
- `notes` (TEXT, NULLABLE).
- `subtotal` (INTEGER, NOT NULL) — Sum of items $\times$ catalog prices.
- `delivery_fee` (INTEGER, NOT NULL, DEFAULT 150) — Server-configured fee.
- `total` (INTEGER, NOT NULL) — `subtotal + delivery_fee`.
- `status` (VARCHAR(30), NOT NULL, DEFAULT `'Received'`) — Current stage in state machine.
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP).
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP).

#### 4. `order_items`
- `id` (INTEGER, PRIMARY KEY AUTOINCREMENT).
- `order_id` (VARCHAR(32), NOT NULL, FOREIGN KEY REFERENCES `orders(id)` ON DELETE CASCADE).
- `menu_item_id` (INTEGER, NOT NULL, FOREIGN KEY REFERENCES `menu_items(id)`).
- `name_snapshot` (VARCHAR(150), NOT NULL) — Recorded item name at time of purchase.
- `unit_price_snapshot` (INTEGER, NOT NULL) — Catalog price at time of purchase.
- `quantity` (INTEGER, NOT NULL, CHECK(quantity > 0)).
- `line_total` (INTEGER, NOT NULL).

#### 5. `order_status_logs`
- `id` (INTEGER, PRIMARY KEY AUTOINCREMENT).
- `order_id` (VARCHAR(32), NOT NULL, FOREIGN KEY REFERENCES `orders(id)` ON DELETE CASCADE).
- `previous_status` (VARCHAR(30), NULLABLE).
- `new_status` (VARCHAR(30), NOT NULL).
- `updated_by` (VARCHAR(50), NOT NULL) — Admin username or `'system'`.
- `timestamp` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP).

#### 6. `admin_users`
- `id` (INTEGER, PRIMARY KEY AUTOINCREMENT).
- `username` (VARCHAR(50), UNIQUE, NOT NULL).
- `password_hash` (VARCHAR(255), NOT NULL) — Salted cryptographic hash.
- `role` (VARCHAR(20), DEFAULT `'staff'`).
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP).

---

## 7. Order Status State Machine & Security Controls

```text
[ Received ] ──(PATCH /status)──> [ Preparing ] ──(PATCH /status)──> [ Out for Delivery ] ──(PATCH /status)──> [ Delivered ]
     │                                   │                                      │                                    │
     └─── (Any other transition: 400) ───┴─── (Any other transition: 400) ──────┴─── (Any other transition: 400) ───┴── [ Terminal ]
```

### Transition Enforcement Invariants
1. **Initial Creation**: Every order created via `POST /api/orders` begins in status `'Received'`.
2. **Valid Next Transitions**:
   - `Received` $\longrightarrow$ `Preparing`
   - `Preparing` $\longrightarrow$ `Out for Delivery`
   - `Out for Delivery` $\longrightarrow$ `Delivered`
3. **Invalid Transition Handling**:
   - Skipping steps (e.g., `Received` $\longrightarrow$ `Delivered`): **Rejected with HTTP 400**.
   - Backward transitions (e.g., `Preparing` $\longrightarrow$ `Received`): **Rejected with HTTP 400**.
   - Modifying a `Delivered` order: **Rejected with HTTP 400**.
   - Unknown status values: **Rejected with HTTP 400**.

---

## 8. Milestone Roadmap & Time Estimates (M0 – M3)

| Milestone | Target Window | Key Deliverables & Validation Scope | Est. Effort |
|---|---|---|---|
| **M0: Discovery & Architecture** | **Days 1–2** | • Discovery document (M0_DISCOVERY.md)<br>• 5 client clarification questions<br>• Relational schema & state machine definition<br>• Technical decision record baseline | 12 Hours |
| **M1: Responsive Client Core** | **Days 3–7** | • Mobile-first UI ($360\text{px}$ verified, $< 1.5\text{MB}$ budget)<br>• Seed catalog rendering with 12 items<br>• Multi-criteria filter engine (Search + Veg + Spicy + Price)<br>• Persistent local cart with $+/-$ quantity controls<br>• Validated Checkout & Tracking UI wireframes | 28 Hours |
| **M2: Backend API & Operations** | **Days 8–14** | • Express REST API implementing the 6 exact endpoints<br>• Server-side calculation & tamper-proof totals<br>• Persistent database storage (surviving restarts)<br>• Staff authentication (JWT/Bearer)<br>• Protected admin dashboard with branch/date filters & status stepper | 32 Hours |
| **M3: Hardening, QA & Delivery** | **Days 15–21** | • Adversarial test suite (tampering, invalid steps, rate limits)<br>• Slow 3G performance optimization ($< 3\text{s}$ load)<br>• Documentation (`README.md`, `API.md`, `DECISIONS.md`, `AI_LOG.md`)<br>• Walkthrough video recording checklist & client handover | 24 Hours |
| **Total Project Scope** | **21 Days** | **Production-grade, verified restaurant ordering system** | **96 Hours** |

---

## 9. Five Client Clarification Questions (Addressing Ambiguities)

Before commencing application code construction, the following five critical design and business ambiguities must be officially clarified:

1. **Order Tracking Phone Transmission vs. Fixed API Contract**:  
   The client brief requires that customer tracking verify **both Order ID and Customer Phone Number** to prevent unauthorized access. However, the fixed automated testing contract mandates:  
   `GET /api/orders/:id` $\longrightarrow$ `200 { orderId, status, items, total }` without a phone parameter in the path.  
   *Question*: Should we pass the verification phone number via a query parameter (e.g., `GET /api/orders/:id?phone=03XXXXXXXXX`), or should the endpoint return `{ orderId, status, items, total }` for automated tests while enforcing phone matching when accessed via the customer UI portal?

2. **Single-Page Menu vs. Dedicated Checkout/Tracking URLs**:  
   The client brief mentions a desire for "everything on one page", yet also references `/checkout` and `/track`.  
   *Question*: Should checkout and tracking be implemented as **seamless drawer / view overlays within a unified single-page application** (optimizing for zero-reload speed on slow mobile networks), or should they be distinct physical pages (`checkout.html`, `track.html`)?

3. **Payment Methods & Cash on Delivery (COD)**:  
   The brief outlines order creation, Rs. 150 delivery fees, and order totals, but does not specify a payment gateway.  
   *Question*: Can we confirm that order fulfillment is strictly **Cash on Delivery (COD)**, with payment collected in cash upon physical delivery, and that no third-party digital gateway (card/JazzCash/Easypaisa) is required for this phase?

4. **Branch-Specific Stock & Availability**:  
   The 12 seed items have fixed prices and tags, but item availability can fluctuate.  
   *Question*: Is item availability global across all three branches, or must branch managers have the capability to mark specific items as "Unavailable" solely for their individual branch (e.g., North Nazimabad out of Biryani, while Clifton has stock)?

5. **Delivery Radius, Order Minimums, and Branch Operating Hours**:  
   Each branch serves a different sector of Karachi (South/Clifton, East/Gulshan, Central/North Nazimabad).  
   *Question*: Are there defined delivery sector boundaries or minimum order values per branch, and what are the official operating hours during which online orders are accepted?

---
*End of M0 Discovery Document. Awaiting client review and milestone approval prior to initiating application code generation.*
