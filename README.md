# Karachi Bites — Online Ordering & Kitchen Operations System

Production-grade online restaurant ordering and order lifecycle tracking system for **Karachi Bites**, serving three strategic branches across Karachi: **Clifton**, **Gulshan-e-Iqbal**, and **North Nazimabad**.

Built with a mobile-first philosophy for Android users on mobile networks (including Slow 3G), with strict server-side state enforcement, tamper-proof monetary calculations, and persistent order storage.

---

## 🌟 Key Features

1. **Multi-Branch Operations:**
   - Real-time ordering for **Clifton**, **Gulshan-e-Iqbal**, and **North Nazimabad**.
   - Branch delivery time estimations and customer contact hotlines.
2. **Authentic 12-Item Seed Catalog:**
   - Exact catalog IDs (1–12), prices, categories, and dietary tags (`mild`, `spicy`, `veg`).
   - Real-time stock status (in-stock vs. sold-out availability).
3. **Simultaneous Multi-Criteria Filter Engine:**
   - Real-time search query matching.
   - Category filtering (BBQ, Karahi, Rice, Rolls, Drinks, Desserts).
   - Vegetarian dietary filter (`veg`).
   - Spicy filter (`spicy`).
   - Max Price slider (`Rs. 150` – `Rs. 2,000`).
   - Instant filter reset with live counter.
4. **Persistent Shopping Cart:**
   - LocalStorage synchronization that survives page refreshes and tab closures.
   - Mobile sticky bottom cart summary bar when items are in bag.
   - Steppers (`+/-`), item removal, and live subtotal calculation.
5. **Robust Checkout Flow:**
   - Full name and Pakistani mobile number validation (`03XX-XXXXXXX` / `+923XXXXXXXXX`).
   - Delivery address with Karachi sector tips.
   - Double-submission lock prevention during network requests.
   - Server-computed subtotal, flat delivery fee (Rs. 150 configurable), and final total.
6. **Live Dual-Credential Order Tracking (`/track`):**
   - Order ID + customer phone number lookup.
   - Chronological 4-step state progression:
     $$\text{Received} \longrightarrow \text{Preparing} \longrightarrow \text{Out for Delivery} \longrightarrow \text{Delivered}$$
   - Live status refresh and branch hotline details.
7. **Protected Kitchen Staff Portal (`/admin`):**
   - Token-based Bearer authentication.
   - Filter orders by branch and date.
   - Strict one-step advancement (`Advance to [Next Status]`).
   - Rejection of invalid transitions, backward steps, or edits to delivered orders (HTTP 400).
   - One-click thermal kitchen slip printing (`window.print()`).
   - CSV export of orders for accounting and audits.
   - Catalog item availability toggle.

---

## 🔑 Evaluator & Staff Test Login Credentials

| Username | Password | Role |
|---|---|---|
| `admin` | `karachi123` | Kitchen Administrator / Staff |

---

## 🚀 How to Run Locally

### 1. Prerequisites
- Node.js v20 or higher
- npm

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default values:
```env
PORT="3000"
DELIVERY_FEE="150"
ADMIN_USER="admin"
ADMIN_PASS="karachi123"
JWT_SECRET="karachi-bites-secure-token-secret-2026"
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📂 Repository File Map

```text
karachi-bites/
├── .env.example              # Environment variables template
├── index.html                # HTML entry point with synchronized metadata
├── metadata.json             # App descriptor
├── package.json              # Full-stack scripts and dependencies
├── server.ts                 # Express full-stack server (all 6 API endpoints + Vite)
├── M0_DISCOVERY.md           # Milestone 0 discovery document & design specs
├── README.md                 # Setup, credentials, architecture
├── API.md                    # Detailed API contract documentation
├── DECISIONS.md              # 6 architectural trade-off records
├── AI_LOG.md                 # Record of AI prompts, bugs, and fixes
├── data/
│   └── karachi_bites_store.json  # Persistent JSON database (survives redeployment)
└── src/
    ├── main.tsx              # React entry bootstrap
    ├── App.tsx               # Main customer application container
    ├── types.ts              # Data models and interfaces
    ├── api.ts                # REST API client
    ├── index.css             # Tailwind and thermal print stylesheet
    └── components/
        ├── Header.tsx        # Top navigation (3-zone contract)
        ├── Hero.tsx          # Value proposition & branch picker
        ├── CategoryNav.tsx   # Category selection tabs
        ├── FilterBar.tsx     # Combined search, dietary, price filters
        ├── MenuGrid.tsx      # Responsive menu cards and availability
        ├── CartDrawer.tsx    # Persistent cart drawer
        ├── CheckoutModal.tsx # Validated checkout form (Pakistani phone)
        ├── TrackOrderModal.tsx # 4-step order tracker
        ├── AdminModal.tsx    # Staff queue, status stepper, CSV export
        └── KitchenTicketModal.tsx # Printable kitchen dispatch ticket
```

---

## 📋 Fixed API Contract Verification

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/api/menu` | List 12 seed items with availability | 200 OK |
| `POST` | `/api/orders` | Place order with customer, branch, items | 201 Created / 400 Bad Request |
| `GET` | `/api/orders/:id` | Order lookup (supports phone verification) | 200 OK / 404 Not Found |
| `POST` | `/api/auth/login` | Staff authentication | 200 OK / 401 Unauthorized |
| `GET` | `/api/admin/orders` | Branch and date filtered orders list | 200 OK / 401 Unauthorized |
| `PATCH` | `/api/admin/orders/:id/status` | Strict 1-step advancement | 200 OK / 400 Bad Request / 401 Unauthorized |
