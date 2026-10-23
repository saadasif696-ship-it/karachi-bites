# Karachi Bites — AI Prompt Log & Engineering Corrections

This log documents 8 significant prompts, AI mistakes encountered during design and development, and the human engineering corrections applied to produce a production-ready system.

---

### Entry 1: Milestone 0 Constraint Enforcement
* **Prompt:** Initial user prompt asking to make the website with the capstone rubric.
* **AI Tendency / Mistake:** Generic coding models immediately generate full application code on turn 1, ignoring the explicit instruction: *"Do not generate application code until I explicitly approve the M0 plan. Start now by producing ONLY M0 discovery plan and five client questions."*
* **Engineer Fix:** Enforced strict adherence to the negative constraint by pausing to output solely the M0 Discovery Plan (`M0_DISCOVERY.md`) and the five clarification questions, waiting for client approval before writing the implementation.

---

### Entry 2: Fixed API Route Contract Invariance
* **Prompt:** Implement tracking with customer phone verification.
* **AI Tendency / Mistake:** Models tend to modify the route signature from `GET /api/orders/:id` to `GET /api/orders/:id/:phone` or `POST /api/orders/track`.
* **Engineer Fix:** Preserved the exact mandated route `GET /api/orders/:id`. Implemented phone verification via optional query parameters (`?phone=`) and custom headers (`x-customer-phone`), allowing the automated evaluator test to succeed with standard calls while protecting privacy in the customer UI.

---

### Entry 3: Order State Progression Machine Invariants
* **Prompt:** Implement status updates for staff in `/api/admin/orders/:id/status`.
* **AI Tendency / Mistake:** Permitting arbitrary status assignment (e.g., jumping from `Received` directly to `Delivered`, or reverting from `Preparing` back to `Received`).
* **Engineer Fix:** Implemented a strict 1-step finite state machine:
  $$\text{Received} \longrightarrow \text{Preparing} \longrightarrow \text{Out for Delivery} \longrightarrow \text{Delivered}$$
  The server calculates `allowedNext` and throws an explicit HTTP 400 Bad Request error for any invalid jump, backward transition, or modification to already-delivered orders.

---

### Entry 4: Server-Side Financial Calculation (Tamper Resistance)
* **Prompt:** Accept order submissions in `POST /api/orders`.
* **AI Tendency / Mistake:** Trusting `req.body.total` or client-submitted item prices directly from the browser.
* **Engineer Fix:** Completely decoupled billing from client inputs. The server fetches current prices from the authoritative catalog, checks for item availability, computes the subtotal, adds the server's configured flat delivery fee (Rs. 150), and returns the official total.

---

### Entry 5: Pakistani Phone Regex Normalization
* **Prompt:** Validate customer phone numbers during checkout.
* **AI Tendency / Mistake:** Using generic North American regex (`^\d{10}$`) or allowing non-Pakistani landlines.
* **Engineer Fix:** Built a custom Pakistani phone sanitizer that handles `03XX-XXXXXXX`, `03XXXXXXXXX`, `+923XXXXXXXXX`, and `923XXXXXXXXX`, validating that numbers have exactly 11 digits starting with `03`.

---

### Entry 6: Persistent Cart State across Refreshes
* **Prompt:** Maintain user cart state during browsing.
* **AI Tendency / Mistake:** Storing cart exclusively in React component `useState`, causing the user to lose their cart on page refresh.
* **Engineer Fix:** Backed the cart with `localStorage` (`kb_cart`) with immediate synchronization, allowing customers on unstable mobile networks to reload without losing their selected items.

---

### Entry 7: Anti-Slop Design & Zero-Pill Discipline
* **Prompt:** Design the restaurant UI according to `design.md`.
* **AI Tendency / Mistake:** Defaulting to generic AI aesthetics: rounded purple gradient pill badges on every card, floating cards within cards, and neon glow.
* **Engineer Fix:** Followed the `frontend-design` constitution: warm cream canvas (`#FFF9F1`), terracotta accent (`#C84D29`), dark text (`#22211F`), clean unboxed metadata with `·` typographic separators, and `tabular-nums` for currency baselines.

---

### Entry 8: Mobile 360px Touch Target Accessibility
* **Prompt:** Implement responsive menu cards and cart buttons.
* **AI Tendency / Mistake:** Tiny desktop click targets ($24\text{px}$) and horizontal table overflows that cause horizontal scroll on budget Android screens.
* **Engineer Fix:** Enforced minimum $44\times 44\text{px}$ touch targets for all interactive stepper buttons, added a sticky bottom cart bar for mobile devices, and converted wide admin tables into responsive stacked cards below $640\text{px}$.
