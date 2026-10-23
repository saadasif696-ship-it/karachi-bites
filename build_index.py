import os

html_content = r'''<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <meta name="theme-color" content="#0F1115" />
  <title>Karachi Bites | Premium Desi Cuisine & Fast Online Ordering</title>
  <meta name="description" content="Order authentic Karachi Biryani, Mutton Karahi, and Charcoal BBQ online with instant delivery in Clifton, Gulshan, and North Nazimabad. Fresh, hot & premium." />
  
  <!-- Dynamic Golden Flame SVG Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23D4AF37'%3E%3Cpath d='M12 2c1.5 3 4 5.5 4 8.5 0 3-2 5.5-4 5.5s-4-2.5-4-5.5C8 7.5 10.5 5 12 2zm0 18c-4.4 0-8-3.6-8-8 0-3.1 1.7-5.8 4.3-7.2-.2 1-.3 2.1-.3 3.2 0 4.4 3.6 8 8 8 1.1 0 2.2-.1 3.2-.3-1.4 2.6-4.1 4.3-7.2 4.3z'/%3E%3C/svg%3E" />

  <!-- Google Fonts: Cinzel & Plus Jakarta Sans & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <!-- Libraries: Three.js, GSAP, ScrollTrigger, Lenis, Lucide -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    /* ==========================================================================
       ROYAL OBSIDIAN & LIQUID GOLD LUXURY COLOR SYSTEM
       ========================================================================== */
    :root {
      --bg-canvas: #0F1115;
      --surface-card: #181B22;
      --surface-card-hover: #1E222B;
      --border-subtle: #2A2F3D;
      --border-gold: rgba(212, 175, 55, 0.4);
      --gold-primary: #D4AF37;
      --gold-saffron: #FFB800;
      --orange-lava: #FF4500;
      --text-main: #FFFFFF;
      --text-muted: #A8A296;
      --text-dim: #6E7480;
      --glow-gold: rgba(212, 175, 55, 0.45);
      --glow-lava: rgba(255, 69, 0, 0.25);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    html, body {
      background-color: var(--bg-canvas);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow-x: hidden;
      width: 100%;
      min-height: 100vh;
      scroll-behavior: smooth;
    }

    h1, h2, h3, .font-royal {
      font-family: 'Cinzel', serif;
      letter-spacing: 0.03em;
    }

    .font-mono-num {
      font-family: 'JetBrains Mono', monospace;
    }

    /* Metallic Gold Gradient Typography */
    .text-liquid-gold {
      background: linear-gradient(135deg, #FFFDF8 0%, #F5D77F 25%, #D4AF37 50%, #FF8C00 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    .text-lava {
      color: var(--orange-lava);
    }

    .text-saffron {
      color: var(--gold-saffron);
    }

    /* Ambient Hero Radial Glow */
    .ambient-glow-backdrop {
      background: radial-gradient(circle at 50% 30%, rgba(255, 69, 0, 0.16) 0%, rgba(212, 175, 55, 0.08) 35%, rgba(15, 17, 21, 1) 72%);
    }

    /* Glassmorphism Classes */
    .glass-surface {
      background: rgba(24, 27, 34, 0.78);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-subtle);
    }

    .glass-surface-gold {
      background: rgba(24, 27, 34, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-gold);
    }

    /* ==========================================================================
       SECTION 6: ULTRA-PREMIUM BUTTON ANIMATIONS & TACTILE MICRO-ACTIONS
       ========================================================================== */

    /* 1. Primary CTA Buttons */
    .btn-primary-liquid {
      position: relative;
      background: linear-gradient(135deg, #D4AF37 0%, #C86314 50%, #FF4500 100%);
      color: #0F1115;
      font-weight: 800;
      font-size: 0.92rem;
      border: none;
      border-radius: 9999px;
      padding: 0.85rem 1.85rem;
      cursor: pointer;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      box-shadow: 0 4px 18px rgba(200, 99, 20, 0.35);
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
      z-index: 1;
      text-decoration: none;
    }

    /* Shimmer Glint Sweep */
    .btn-primary-liquid::before {
      content: '';
      position: absolute;
      top: 0;
      left: -120%;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
      transform: skewX(-25deg);
      transition: left 0.75s ease;
      z-index: 2;
      pointer-events: none;
    }

    .btn-primary-liquid:hover::before {
      left: 180%;
    }

    .btn-primary-liquid:hover {
      transform: scale(1.04);
      box-shadow: 0px 0px 25px rgba(212, 175, 55, 0.55), 0 8px 24px rgba(255, 69, 0, 0.35);
      color: #000000;
    }

    .btn-primary-liquid:active {
      transform: scale(0.96);
    }

    /* 2. Category Filters & Branch Selector Pills */
    .pill-filter {
      position: relative;
      background: #141720;
      border: 1px solid var(--border-subtle);
      color: #A8A296;
      font-size: 0.82rem;
      font-weight: 700;
      border-radius: 9999px;
      padding: 0.6rem 1.25rem;
      cursor: pointer;
      overflow: hidden;
      transition: color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      z-index: 1;
    }

    /* Magnetic Slide Fill */
    .pill-filter::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(255, 69, 0, 0.2) 100%);
      transform: translateX(-100%);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: -1;
    }

    .pill-filter:hover::before {
      transform: translateX(0);
    }

    .pill-filter:hover {
      color: #FFFFFF;
      border-color: rgba(212, 175, 55, 0.5);
      transform: translateY(-1px);
    }

    /* Dynamic Active Indicator */
    .pill-filter.active {
      background: rgba(212, 175, 55, 0.15);
      border-color: #D4AF37;
      color: var(--gold-saffron);
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
      font-weight: 800;
    }

    .pill-filter.active::before {
      transform: translateX(0);
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(255, 69, 0, 0.15) 100%);
    }

    /* 3. Kinetic Haptic Feedback for Cart Quantity & Close Icons */
    .btn-kinetic {
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #1D222E;
      border: 1px solid var(--border-subtle);
      color: #FFFDF8;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s, border-color 0.2s;
    }

    .btn-kinetic:hover {
      border-color: var(--gold-primary);
      background: #252B3A;
      color: var(--gold-saffron);
    }

    .btn-kinetic:active {
      transform: rotate(90deg) scale(1.18);
    }

    /* 4. Secondary Outline Buttons with Animated Conic Border Sweep */
    .btn-outline-conic {
      position: relative;
      background: #141720;
      color: #D4AF37;
      font-size: 0.85rem;
      font-weight: 700;
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 9999px;
      padding: 0.7rem 1.4rem;
      cursor: pointer;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.35s ease;
      z-index: 1;
      text-decoration: none;
    }

    .btn-outline-conic::after {
      content: '';
      position: absolute;
      inset: -2px;
      background: conic-gradient(from 0deg, transparent 0%, #D4AF37 25%, #FF4500 50%, transparent 75%);
      border-radius: 9999px;
      z-index: -2;
      opacity: 0;
      transition: opacity 0.3s ease;
      animation: conicSpin 4s linear infinite;
    }

    .btn-outline-conic:hover::after {
      opacity: 0.85;
    }

    .btn-outline-conic:hover {
      background: #1E232E;
      color: #FFFFFF;
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
      transform: translateY(-1px);
    }

    @keyframes conicSpin {
      100% { transform: rotate(360deg); }
    }

    /* 5. Mobile Touch Ripple Effect */
    .ripple-surface {
      position: relative;
      overflow: hidden;
    }

    .touch-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.35);
      transform: scale(0);
      animation: rippleAnim 0.6s cubic-bezier(0.1, 0.8, 0.3, 1);
      pointer-events: none;
    }

    @keyframes rippleAnim {
      to {
        transform: scale(3.5);
        opacity: 0;
      }
    }

    /* 3D WebGL Canvas Container */
    #webgl-canvas-container {
      width: 100%;
      height: 480px;
      position: relative;
      border-radius: 2rem;
      overflow: hidden;
      cursor: grab;
      touch-action: none;
    }

    #webgl-canvas-container:active {
      cursor: grabbing;
    }

    /* Hotspot Pins & Glassmorphic Cards */
    .hotspot-pin {
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #D4AF37;
      box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.8);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      animation: pulseHotspot 2s infinite;
      z-index: 20;
    }

    .hotspot-pin::after {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #0F1115;
    }

    .hotspot-card {
      position: absolute;
      width: 240px;
      background: rgba(20, 23, 31, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-gold);
      border-radius: 1rem;
      padding: 0.9rem;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px) scale(0.95);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      z-index: 25;
    }

    .hotspot-card.visible,
    .hotspot-pin:hover + .hotspot-card {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    @keyframes pulseHotspot {
      0% {
        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(212, 175, 55, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
      }
    }

    /* Custom Toast Notifications Stack */
    #toast-container {
      position: fixed;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      pointer-events: none;
    }

    .toast-msg {
      pointer-events: auto;
      min-width: 290px;
      max-width: 380px;
      padding: 0.9rem 1.25rem;
      border-radius: 1rem;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
      animation: toastIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      transition: all 0.3s ease;
    }

    .toast-success {
      background: rgba(20, 27, 22, 0.92);
      border: 1px solid rgba(46, 125, 50, 0.6);
      color: #E8F5E9;
    }

    .toast-error {
      background: rgba(31, 20, 20, 0.92);
      border: 1px solid rgba(255, 69, 0, 0.6);
      color: #FFEBEE;
    }

    @keyframes toastIn {
      from { transform: translateX(110%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    /* Modal Backdrop */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 12, 16, 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-content-box {
      max-width: 480px;
      width: 100%;
      border-radius: 1.5rem;
      transform: scale(0.95);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-overlay.active .modal-content-box {
      transform: scale(1);
    }

    /* Cart Slide-Out Drawer */
    #cart-drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      max-width: 440px;
      background: rgba(18, 21, 28, 0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-left: 1px solid var(--border-gold);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      box-shadow: -15px 0 45px rgba(0, 0, 0, 0.7);
    }

    #cart-drawer.open {
      transform: translateX(0);
    }

    /* Mobile Slide-Out Drawer */
    #mobile-menu-drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 80%;
      max-width: 320px;
      background: rgba(16, 19, 26, 0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-left: 1px solid var(--border-subtle);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    #mobile-menu-drawer.open {
      transform: translateX(0);
    }

    /* Live Marquee Animation */
    @keyframes marqueeScroll {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }

    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marqueeScroll 32s linear infinite;
    }

    .animate-marquee:hover {
      animation-play-state: paused;
    }

    /* Tailwind utility replacements for pure standalone CSS */
    .fixed { position: fixed; }
    .absolute { position: absolute; }
    .relative { position: relative; }
    .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
    .top-0 { top: 0; } .left-0 { left: 0; } .right-0 { right: 0; } .bottom-0 { bottom: 0; }
    .z-10 { z-index: 10; } .z-20 { z-index: 20; } .z-40 { z-index: 40; } .z-50 { z-index: 50; }
    .flex { display: flex; } .inline-flex { display: inline-flex; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; } .items-start { align-items: flex-start; } .items-end { align-items: flex-end; }
    .justify-between { justify-content: space-between; } .justify-center { justify-content: center; }
    .gap-1 { gap: 0.25rem; } .gap-2 { gap: 0.5rem; } .gap-3 { gap: 0.75rem; } .gap-4 { gap: 1rem; } .gap-6 { gap: 1.5rem; } .gap-8 { gap: 2rem; } .gap-10 { gap: 2.5rem; } .gap-12 { gap: 3rem; }
    .grid { display: grid; }
    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    @media (min-width: 640px) {
      .sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .sm\:block { display: block; }
      .sm\:text-5xl { font-size: 3rem; line-height: 1; }
      .sm\:text-base { font-size: 1rem; }
    }
    @media (min-width: 768px) {
      .md\:flex { display: flex; }
      .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .md\:flex-row { flex-direction: row; }
      .md\:items-end { align-items: flex-end; }
      .md\:w-80 { width: 20rem; }
      .md\:inline { display: inline; }
      .md\:text-right { text-align: right; }
    }
    @media (min-width: 1024px) {
      .lg\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
      .lg\:col-span-6 { grid-column: span 6 / span 6; }
      .lg\:col-span-5 { grid-column: span 5 / span 5; }
      .lg\:col-span-7 { grid-column: span 7 / span 7; }
      .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .lg\:flex { display: flex; }
      .lg\:hidden { display: none; }
      .lg\:text-6xl { font-size: 3.75rem; line-height: 1; }
    }
    @media (min-width: 1280px) {
      .xl\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    }
    .w-full { width: 100%; } .h-full { height: 100%; }
    .max-w-7xl { max-width: 80rem; margin-left: auto; margin-right: auto; }
    .max-w-xl { max-width: 36rem; } .max-w-2xl { max-width: 42rem; }
    .p-1 { padding: 0.25rem; } .p-2 { padding: 0.5rem; } .p-3 { padding: 0.75rem; } .p-4 { padding: 1rem; } .p-5 { padding: 1.25rem; } .p-6 { padding: 1.5rem; }
    .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; } .px-4 { padding-left: 1rem; padding-right: 1rem; } .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; } .px-7 { padding-left: 1.75rem; padding-right: 1.75rem; }
    .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; } .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; } .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; } .py-4 { padding-top: 1rem; padding-bottom: 1rem; } .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; } .py-12 { padding-top: 3rem; padding-bottom: 3rem; } .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
    .pt-2 { padding-top: 0.5rem; } .pt-3 { padding-top: 0.75rem; } .pt-4 { padding-top: 1rem; } .pt-20 { padding-top: 5rem; } .pt-28 { padding-top: 7rem; }
    .pb-2 { padding-bottom: 0.5rem; } .pb-4 { padding-bottom: 1rem; } .pb-20 { padding-bottom: 5rem; }
    .mt-1 { margin-top: 0.25rem; } .mt-2 { margin-top: 0.5rem; } .mt-4 { margin-top: 1rem; } .mt-6 { margin-top: 1.5rem; } .mt-12 { margin-top: 3rem; } .mt-16 { margin-top: 4rem; }
    .mb-2 { margin-bottom: 0.5rem; } .mb-3 { margin-bottom: 0.75rem; } .mb-4 { margin-bottom: 1rem; } .mb-6 { margin-bottom: 1.5rem; } .mb-10 { margin-bottom: 2.5rem; } .mb-12 { margin-bottom: 3rem; }
    .rounded-full { border-radius: 9999px; } .rounded-md { border-radius: 0.375rem; } .rounded-xl { border-radius: 0.75rem; } .rounded-2xl { border-radius: 1rem; } .rounded-3xl { border-radius: 1.5rem; }
    .overflow-hidden { overflow: hidden; }
    .text-xs { font-size: 0.75rem; } .text-sm { font-size: 0.875rem; } .text-base { font-size: 1rem; } .text-lg { font-size: 1.125rem; } .text-xl { font-size: 1.25rem; } .text-2xl { font-size: 1.5rem; } .text-3xl { font-size: 1.875rem; }
    .font-bold { font-weight: 700; } .font-black { font-weight: 900; } .uppercase { text-transform: uppercase; }
    .tracking-wider { letter-spacing: 0.05em; } .tracking-widest { letter-spacing: 0.1em; }
    .text-white { color: #FFFFFF; } .text-center { text-align: center; } .text-left { text-align: left; }
    .border { border-width: 1px; } .border-t { border-top-width: 1px; } .border-b { border-bottom-width: 1px; }
    .border-gold { border-color: rgba(212, 175, 55, 0.4); }
    .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
    .w-auto { width: auto; } .max-h-12 { max-height: 3rem; } .max-h-9 { max-height: 2.25rem; } .object-contain { object-fit: contain; } .object-cover { object-fit: cover; }
    .block { display: block; } .hidden { display: none; }
    .shrink-0 { flex-shrink: 0; }
    .cursor-pointer { cursor: pointer; }
    .transition-all { transition-property: all; } .transition-colors { transition-property: color, background-color, border-color; } .transition-transform { transition-property: transform; }
    .duration-300 { transition-duration: 300ms; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  </style>
</head>
<body class="ambient-glow-backdrop">

  <!-- Toast Notification Container -->
  <div id="toast-container" aria-live="polite"></div>

  <!-- ==========================================================================
       HEADER & GLASSMORPHIC NAVIGATION
       ========================================================================== -->
  <header class="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-[#2A2F3D]/80 transition-all duration-300">
    <div class="max-w-7xl px-4 sm:px-6 flex items-center justify-between gap-4" style="height: 5rem;">
      
      <!-- Brand Logo strictly preserved & wrapped in link to #hero -->
      <a href="#hero" class="brand-logo-link flex items-center gap-3 shrink-0" aria-label="Karachi Bites Home">
        <img 
          src="/logo.png" 
          alt="Karachi Bites Official Logo" 
          class="max-h-12 w-auto object-contain block" 
        />
        <div class="hidden md:flex flex-col justify-center leading-tight">
          <span class="font-royal font-black text-sm tracking-wider text-liquid-gold uppercase">
            Karachi Bites
          </span>
          <span class="text-xs uppercase tracking-widest text-[#A8A296] font-bold" style="font-size: 9px;">
            Royal Kitchen · Est. 2026
          </span>
        </div>
      </a>

      <!-- Desktop Navigation Anchors -->
      <nav class="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#A8A296]">
        <a href="#hero" class="hover:text-[#D4AF37] transition-colors py-1">Home</a>
        <a href="#menu" class="hover:text-[#D4AF37] transition-colors py-1">Menu</a>
        <a href="#about" class="hover:text-[#D4AF37] transition-colors py-1">Our Heritage</a>
        <a href="#branches" class="hover:text-[#D4AF37] transition-colors py-1">Kitchen Hubs</a>
        <a href="#contact" class="hover:text-[#D4AF37] transition-colors py-1">Contact</a>
      </nav>

      <!-- Header Action Controls -->
      <div class="flex items-center gap-3">
        <!-- Active Branch Quick Dropdown -->
        <div class="relative hidden sm:block">
          <button id="header-branch-btn" class="pill-filter flex items-center gap-2 py-2 px-3 text-xs" title="Change active kitchen branch">
            <i data-lucide="map-pin" style="width: 14px; height: 14px; color: #D4AF37;"></i>
            <span id="header-branch-name">Clifton</span>
            <span style="font-size: 10px; color: #A8A296;">(30m)</span>
            <i data-lucide="chevron-down" style="width: 12px; height: 12px; color: #A8A296;"></i>
          </button>
        </div>

        <!-- Sticky Cart Trigger Button -->
        <a href="#cart" id="cart-btn-trigger" class="btn-primary-liquid py-2 px-4 text-xs font-bold ripple-surface" aria-label="View Shopping Cart">
          <i data-lucide="shopping-bag" style="width: 16px; height: 16px;"></i>
          <span>Bag (<span id="header-cart-count" class="font-mono-num font-black">0</span>)</span>
          <span class="hidden md:inline font-mono-num" style="border-left: 1px solid rgba(15, 17, 21, 0.4); padding-left: 0.5rem;">Rs. <span id="header-cart-total">0</span></span>
        </a>

        <!-- Mobile Hamburger Button -->
        <button id="mobile-menu-toggle" class="lg:hidden btn-kinetic" aria-label="Toggle Menu">
          <i data-lucide="menu" style="width: 20px; height: 20px; color: #D4AF37;"></i>
        </button>
      </div>

    </div>
  </header>

  <!-- Mobile Slide-Out Drawer -->
  <div id="mobile-drawer-backdrop" class="fixed inset-0 bg-black/60 z-40 opacity-0 pointer-events-none transition-opacity duration-300"></div>
  <aside id="mobile-menu-drawer">
    <div class="flex items-center justify-between pb-4 border-b" style="border-color: #2A2F3D;">
      <div class="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" class="max-h-9 w-auto object-contain" />
        <span class="font-royal font-bold text-xs text-liquid-gold">Karachi Bites</span>
      </div>
      <button id="mobile-drawer-close" class="btn-kinetic" aria-label="Close Menu">
        <i data-lucide="x" style="width: 16px; height: 16px;"></i>
      </button>
    </div>
    
    <nav class="flex flex-col gap-4 text-sm font-bold text-[#A8A296]">
      <a href="#hero" class="mobile-nav-link hover:text-[#D4AF37] transition-colors py-2 flex items-center gap-2">
        <i data-lucide="sparkles" style="width: 16px; height: 16px; color: #D4AF37;"></i> Home
      </a>
      <a href="#menu" class="mobile-nav-link hover:text-[#D4AF37] transition-colors py-2 flex items-center gap-2">
        <i data-lucide="utensils" style="width: 16px; height: 16px; color: #D4AF37;"></i> Interactive Menu
      </a>
      <a href="#about" class="mobile-nav-link hover:text-[#D4AF37] transition-colors py-2 flex items-center gap-2">
        <i data-lucide="flame" style="width: 16px; height: 16px; color: #D4AF37;"></i> Royal Heritage
      </a>
      <a href="#branches" class="mobile-nav-link hover:text-[#D4AF37] transition-colors py-2 flex items-center gap-2">
        <i data-lucide="map-pin" style="width: 16px; height: 16px; color: #D4AF37;"></i> Kitchen Hubs
      </a>
      <a href="#contact" class="mobile-nav-link hover:text-[#D4AF37] transition-colors py-2 flex items-center gap-2">
        <i data-lucide="phone" style="width: 16px; height: 16px; color: #D4AF37;"></i> Contact & Support
      </a>
    </nav>

    <div class="mt-auto pt-6 border-t border-[#2A2F3D] space-y-3 text-xs text-[#A8A296]">
      <div class="flex items-center gap-2 text-white font-mono-num">
        <i data-lucide="phone-call" style="width: 16px; height: 16px; color: #D4AF37;"></i>
        <a href="tel:+923001234567" class="hover:text-[#D4AF37]">+92 300 1234567</a>
      </div>
      <div class="flex items-center gap-2 text-white">
        <i data-lucide="mail" style="width: 16px; height: 16px; color: #D4AF37;"></i>
        <a href="mailto:info@karachibites.pk" class="hover:text-[#D4AF37]">info@karachibites.pk</a>
      </div>
      <p style="font-size: 10px; color: #6E7480;">Flat delivery fee Rs. 150 across Clifton, Gulshan & Nazimabad.</p>
    </div>
  </aside>

  <!-- ==========================================================================
       HERO SECTION WITH 3D WEBGL SHOWCASE & HOTSPOTS
       ========================================================================== -->
  <section id="hero" class="relative pt-28 pb-20 overflow-hidden flex items-center" style="min-height: 88vh;">
    <div class="max-w-7xl px-4 sm:px-6 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <!-- Left: Luxury Royal Obsidian & Liquid Gold Typography -->
        <div class="lg:col-span-6 space-y-4 text-left z-10">
          
          <div class="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#181B22] border border-gold">
            <span class="w-2 h-2 rounded-full" style="background-color: #D4AF37; box-shadow: 0 0 10px #D4AF37;"></span>
            <span class="text-xs font-black uppercase tracking-widest text-[#D4AF37]" style="font-size: 10px;">
              Awwwards-Level 3D Dining Experience · Karachi 2026
            </span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white" style="line-height: 1.1;">
            Karachi's Royal
            <span class="text-liquid-gold block mt-1">Liquid Gold Flavours</span>
          </h1>

          <p class="text-[#C5BDB0] text-sm sm:text-base leading-relaxed max-w-xl font-normal">
            Slow-cooked in sealed terracotta handis, seared over charcoal pits, and tossed in smoking iron woks. Savor authentic Dum Biryani, succulent Shinwari Karahi, and melt-in-mouth Malai Boti delivered piping hot.
          </p>

          <!-- Primary & Secondary Interactive CTAs -->
          <div class="pt-2 flex flex-wrap items-center gap-3">
            <a href="#menu" class="btn-primary-liquid ripple-surface text-sm py-3 px-6">
              <span>Explore Royal Menu</span>
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </a>
            <button id="hero-track-btn" class="btn-outline-conic ripple-surface text-sm py-3 px-6">
              <i data-lucide="radar" style="width: 16px; height: 16px; color: #D4AF37;"></i>
              <span>Live Order Tracker</span>
            </button>
          </div>

          <!-- Branch Selection Pills -->
          <div class="pt-3 space-y-2">
            <div class="text-xs font-black uppercase tracking-wider text-[#A8A296]" style="font-size: 11px;">
              Kitchen Dispatch Hub:
            </div>
            <div class="flex flex-wrap gap-2" id="hero-branch-pills">
              <button class="pill-filter active" data-branch="clifton">
                <i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> Clifton (30-40m)
              </button>
              <button class="pill-filter" data-branch="gulshan">
                <i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> Gulshan-e-Iqbal (35-45m)
              </button>
              <button class="pill-filter" data-branch="nazimabad">
                <i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> North Nazimabad (40-50m)
              </button>
            </div>
          </div>

          <!-- Micro Trust Proof Badges -->
          <div class="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#A8A296] font-semibold">
            <span class="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#181B22] border border-[#2A2F3D]">
              <span class="w-2 h-2 rounded-full" style="background: #2E7D32;"></span> Flat Rs. 150 Delivery
            </span>
            <span class="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#181B22] border border-[#2A2F3D]">
              <i data-lucide="shield-check" style="width: 14px; height: 14px; color: #D4AF37;"></i> 100% Halal Prime Meat
            </span>
            <span class="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#181B22] border border-[#2A2F3D]">
              <i data-lucide="banknote" style="width: 14px; height: 14px; color: #FFB800;"></i> Cash on Delivery
            </span>
          </div>

        </div>

        <!-- Right: Central 3D WebGL Canvas & Interactive Hotspots -->
        <div class="lg:col-span-6 relative flex flex-col items-center justify-center">
          
          <!-- Glassmorphic Canvas Wrapper with Glowing Border -->
          <div class="relative w-full rounded-3xl p-1 shadow-2xl border border-gold" style="max-width: 540px; background: linear-gradient(135deg, rgba(255, 69, 0, 0.15), rgba(212, 175, 55, 0.25), rgba(15, 17, 21, 1));">
            
            <!-- Three.js Canvas Container -->
            <div id="webgl-canvas-container" class="w-full h-full rounded-2xl relative overflow-hidden" style="background: #0A0C10;">
              
              <!-- Hotspot Pin 1: Saffron Basmati Rice -->
              <div class="hotspot-pin" style="top: 36%; left: 48%;" data-hotspot="1" title="Click to inspect saffron basmati"></div>
              <div class="hotspot-card" id="card-hotspot-1" style="top: 14%; left: 18%;">
                <div style="font-size: 10px; text-transform: uppercase; font-weight: 900; letter-spacing: 0.1em; color: #D4AF37; margin-bottom: 4px;">Aged Harvest Rice</div>
                <div class="text-xs font-bold text-white" style="margin-bottom: 4px;">Royal Saffron Basmati</div>
                <p style="font-size: 11px; color: #A8A296; line-height: 1.4;">Infused with pure Kashmiri saffron strands, green cardamom, star anise & aged ghee.</p>
              </div>

              <!-- Hotspot Pin 2: Shinwari Wok Glaze -->
              <div class="hotspot-pin" style="top: 60%; left: 34%;" data-hotspot="2" title="Click to inspect Shinwari mutton"></div>
              <div class="hotspot-card" id="card-hotspot-2" style="top: 54%; left: 6%;">
                <div style="font-size: 10px; text-transform: uppercase; font-weight: 900; letter-spacing: 0.1em; color: #FF4500; margin-bottom: 4px;">Shinwari Heritage</div>
                <div class="text-xs font-bold text-white" style="margin-bottom: 4px;">Prime Braised Mutton</div>
                <p style="font-size: 11px; color: #A8A296; line-height: 1.4;">Simmered in its natural juices with organic vine tomatoes, crushed black pepper & julienne ginger.</p>
              </div>

              <!-- Hotspot Pin 3: Charcoal BBQ Marinade -->
              <div class="hotspot-pin" style="top: 48%; left: 68%;" data-hotspot="3" title="Click to inspect charcoal malai boti"></div>
              <div class="hotspot-card" id="card-hotspot-3" style="top: 38%; right: 6%;">
                <div style="font-size: 10px; text-transform: uppercase; font-weight: 900; letter-spacing: 0.1em; color: #FFB800; margin-bottom: 4px;">Charcoal Pit Master</div>
                <div class="text-xs font-bold text-white" style="margin-bottom: 4px;">Creamy Malai Boti</div>
                <p style="font-size: 11px; color: #A8A296; line-height: 1.4;">Slow-marinated for 12 hours in fresh cream, mild spices & seared over smoking hardwood coals.</p>
              </div>

              <!-- Canvas Hint Overlay -->
              <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs pointer-events-none z-10" style="font-size: 11px; color: #A8A296;">
                <span class="inline-flex items-center gap-1 py-1 px-3 rounded-full border border-[#2A2F3D]" style="background: rgba(15, 17, 21, 0.85);">
                  <i data-lucide="move" style="width: 12px; height: 12px; color: #D4AF37;"></i> Drag to rotate 3D dish
                </span>
                <span class="inline-flex items-center gap-1 py-1 px-3 rounded-full border border-[#2A2F3D]" style="background: rgba(15, 17, 21, 0.85);">
                  <i data-lucide="flame" style="width: 12px; height: 12px; color: #FF4500;"></i> Live Steam Physics
                </span>
              </div>

            </div>

          </div>

          <!-- 3D Dish Switcher Controls -->
          <div class="mt-4 flex items-center gap-2 p-1 rounded-full glass-surface border border-gold z-10">
            <button class="pill-filter active text-xs py-1 px-3" id="btn-dish-biryani" data-dish="0">
              Biryani Handi
            </button>
            <button class="pill-filter text-xs py-1 px-3" id="btn-dish-karahi" data-dish="1">
              Shinwari Karahi
            </button>
            <button class="pill-filter text-xs py-1 px-3" id="btn-dish-bbq" data-dish="2">
              Charcoal BBQ
            </button>
          </div>

        </div>

      </div>
    </div>
  </section>

  <!-- ==========================================================================
       LIVE KITCHEN REEL / TICKER MARQUEE
       ========================================================================== -->
  <section class="py-4 border-t border-b overflow-hidden select-none" style="background: #12151D; border-color: #2A2F3D;">
    <div class="animate-marquee flex items-center gap-8">
      <div class="flex items-center gap-8 shrink-0">
        <span class="text-xs uppercase font-black tracking-widest text-[#D4AF37] flex items-center gap-2">
          <i data-lucide="sparkles" style="width: 14px; height: 14px; color: #D4AF37;"></i> Karachi Dum Biryani · Rs. 890
        </span>
        <span class="text-xs text-[#6E7480]">★ 4.9 (1.2k+ Reviews)</span>
        <span class="text-xs uppercase font-black tracking-widest text-[#FF4500] flex items-center gap-2">
          <i data-lucide="flame" style="width: 14px; height: 14px; color: #FF4500;"></i> Shinwari Mutton Karahi · Rs. 1,850
        </span>
        <span class="text-xs text-[#6E7480]">★ 5.0 (890+ Reviews)</span>
        <span class="text-xs uppercase font-black tracking-widest text-[#FFB800] flex items-center gap-2">
          <i data-lucide="utensils" style="width: 14px; height: 14px; color: #FFB800;"></i> Chicken Malai Boti · Rs. 850
        </span>
        <span class="text-xs text-[#6E7480]">★ 4.9 (2.1k+ Reviews)</span>
        <span class="text-xs uppercase font-black tracking-widest text-[#D4AF37] flex items-center gap-2">
          <i data-lucide="clock" style="width: 14px; height: 14px; color: #D4AF37;"></i> 30-Min Fast Thermal Dispatch
        </span>
        <span class="text-xs text-[#6E7480]">3 Active Hubs</span>
      </div>
      <div class="flex items-center gap-8 shrink-0">
        <span class="text-xs uppercase font-black tracking-widest text-[#D4AF37] flex items-center gap-2">
          <i data-lucide="sparkles" style="width: 14px; height: 14px; color: #D4AF37;"></i> Karachi Dum Biryani · Rs. 890
        </span>
        <span class="text-xs text-[#6E7480]">★ 4.9 (1.2k+ Reviews)</span>
        <span class="text-xs uppercase font-black tracking-widest text-[#FF4500] flex items-center gap-2">
          <i data-lucide="flame" style="width: 14px; height: 14px; color: #FF4500;"></i> Shinwari Mutton Karahi · Rs. 1,850
        </span>
        <span class="text-xs text-[#6E7480]">★ 5.0 (890+ Reviews)</span>
        <span class="text-xs uppercase font-black tracking-widest text-[#FFB800] flex items-center gap-2">
          <i data-lucide="utensils" style="width: 14px; height: 14px; color: #FFB800;"></i> Chicken Malai Boti · Rs. 850
        </span>
        <span class="text-xs text-[#6E7480]">★ 4.9 (2.1k+ Reviews)</span>
        <span class="text-xs uppercase font-black tracking-widest text-[#D4AF37] flex items-center gap-2">
          <i data-lucide="clock" style="width: 14px; height: 14px; color: #D4AF37;"></i> 30-Min Fast Thermal Dispatch
        </span>
        <span class="text-xs text-[#6E7480]">3 Active Hubs</span>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       INTERACTIVE MENU SECTION WITH CATEGORY FILTERING & SEARCH
       ========================================================================== -->
  <section id="menu" class="py-20 relative">
    <div class="max-w-7xl px-4 sm:px-6">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div class="space-y-2">
          <span class="text-xs font-black uppercase tracking-widest text-[#D4AF37] flex items-center gap-1">
            <i data-lucide="flame" style="width: 14px; height: 14px; color: #D4AF37;"></i>
            Authentic Karahi, Biryani & Charcoal BBQ
          </span>
          <h2 class="text-3xl sm:text-5xl font-black text-white">
            Our Culinary <span class="text-liquid-gold">Collection</span>
          </h2>
          <p class="text-[#A8A296] text-sm max-w-lg leading-relaxed">
            Prepared with single-source Himalayan rock salt, hand-milled spices, and prime halal meats cooked fresh to order.
          </p>
        </div>

        <!-- Search Bar with Live Filter & Simulated 404 Trigger -->
        <div class="w-full md:w-80 relative">
          <i data-lucide="search" style="width: 16px; height: 16px; color: #A8A296; position: absolute; left: 14px; top: 50%; transform: translateY(-50%);"></i>
          <input 
            type="text" 
            id="menu-search-input" 
            placeholder="Search biryani, karahi, roll..." 
            class="w-full py-2 px-4 rounded-full text-xs text-white placeholder-[#6E7480] focus:outline-none"
            style="padding-left: 2.5rem; background: #181B22; border: 1px solid #2A2F3D;"
          />
        </div>
      </div>

      <!-- Category Filter Pills (Magnetic Slide Fill) -->
      <div class="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b" style="border-color: rgba(42, 47, 61, 0.6);" id="category-filter-bar">
        <button class="pill-filter active" data-cat="all">All Dishes</button>
        <button class="pill-filter" data-cat="BBQ">Charcoal BBQ</button>
        <button class="pill-filter" data-cat="Karahi">Shinwari Karahi</button>
        <button class="pill-filter" data-cat="Rice">Dum Biryani</button>
        <button class="pill-filter" data-cat="Breads">Tandoor Naan</button>
        <button class="pill-filter" data-cat="Sides">Drinks & Raita</button>
      </div>

      <!-- Menu Grid Container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="menu-grid-container">
        <!-- Food Cards injected dynamically -->
      </div>

      <!-- Bottom Catering Banner -->
      <div class="mt-16 p-6 sm:p-8 rounded-3xl glass-surface border border-gold flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-[#0F1115] border border-gold flex items-center justify-center shrink-0">
            <i data-lucide="chef-hat" style="width: 26px; height: 26px; color: #D4AF37;"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white">Special Catering & Bulk Dawat Orders?</h3>
            <p class="text-xs text-[#A8A296] mt-1">Custom deghs of Dum Biryani, Shinwari Karahi woks, and live BBQ setups across Karachi.</p>
          </div>
        </div>
        <a href="tel:+923001234567" class="btn-outline-conic py-3 px-6 shrink-0">
          <i data-lucide="phone-call" style="width: 16px; height: 16px;"></i> Call Catering Desk
        </a>
      </div>

    </div>
  </section>

  <!-- ==========================================================================
       OUR HERITAGE & BURNS ROAD STORY (#about)
       ========================================================================== -->
  <section id="about" class="py-20 relative bg-[#0C0E14] border-t border-[#2A2F3D]">
    <div class="max-w-7xl px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div class="lg:col-span-6 relative">
          <div class="relative rounded-3xl overflow-hidden border border-gold shadow-2xl">
            <img 
              src="/images/karachi_hero_feast_1791536033852.jpg" 
              alt="Karachi Traditional Kitchen Feast" 
              class="w-full object-cover"
              style="height: 400px;"
            />
            <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);"></div>
            <div class="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-surface border border-gold">
              <div class="font-royal font-bold text-sm text-[#D4AF37]">Clay Handis & Glowing Embers</div>
              <p class="text-xs text-[#C5BDB0] mt-1">Every recipe dates back generations, perfected in the historic food streets of Karachi.</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 space-y-4 text-left">
          <span class="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Our Culinary Story</span>
          <h2 class="text-3xl sm:text-5xl font-black text-white leading-tight">
            Where Raw Smoke Meets <span class="text-liquid-gold">Refined Royalty</span>
          </h2>
          <p class="text-sm text-[#A8A296] leading-relaxed">
            Founded with a singular passion: to elevate Karachi's beloved street flavours into an authentic, fine-dining home delivery experience. No artificial colours, no frozen patties, no compromises.
          </p>
          
          <div class="grid grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-2xl glass-surface border border-[#2A2F3D]">
              <div class="text-2xl font-black text-[#D4AF37] font-mono-num">100%</div>
              <div class="text-xs font-bold text-white mt-1">Fresh Daily Cuts</div>
              <div class="text-xs text-[#A8A296] mt-0.5" style="font-size: 11px;">Prime mutton & hand-trimmed chicken.</div>
            </div>
            <div class="p-4 rounded-2xl glass-surface border border-[#2A2F3D]">
              <div class="text-2xl font-black text-[#FF4500] font-mono-num">3 Hubs</div>
              <div class="text-xs font-bold text-white mt-1">Fast Thermal Dispatch</div>
              <div class="text-xs text-[#A8A296] mt-0.5" style="font-size: 11px;">Piping hot in thermal insulated bags.</div>
            </div>
          </div>

          <div class="pt-2">
            <a href="#menu" class="btn-primary-liquid py-3 px-6 text-xs font-bold">
              <span>Taste the Heritage</span>
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ==========================================================================
       KITCHEN BRANCH HUBS SECTION (#branches)
       ========================================================================== -->
  <section id="branches" class="py-20 relative">
    <div class="max-w-7xl px-4 sm:px-6 text-left">
      <div class="max-w-2xl mb-10 space-y-2">
        <span class="text-xs font-black uppercase tracking-widest text-[#D4AF37]">City-Wide Coverage</span>
        <h2 class="text-3xl sm:text-5xl font-black text-white">
          Our Kitchen <span class="text-liquid-gold">Branches</span>
        </h2>
        <p class="text-sm text-[#A8A296]">
          Order from your closest kitchen hub to ensure lightning-fast dispatch and sizzling temperature.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Clifton Branch -->
        <div class="p-6 rounded-3xl glass-surface border border-gold hover:border-[#FF4500] transition-all">
          <div class="flex items-center justify-between mb-4">
            <span class="p-2 rounded-2xl bg-[#0F1115] border border-gold text-[#D4AF37]">
              <i data-lucide="map-pin" style="width: 20px; height: 20px;"></i>
            </span>
            <span class="text-xs font-mono-num font-bold text-[#2E7D32] px-2 py-1 rounded-full border border-[#2E7D32]/30" style="background: rgba(46, 125, 50, 0.1);">
              Open · 12 PM - 3 AM
            </span>
          </div>
          <h3 class="text-xl font-bold text-white">Clifton Hub</h3>
          <p class="text-xs text-[#A8A296] mt-1">Block 4, Boat Basin Food Street, Clifton, Karachi</p>
          <div class="mt-4 pt-4 border-t border-[#2A2F3D] flex items-center justify-between text-xs">
            <span class="text-[#6E7480]">Delivery: 30-40 min</span>
            <a href="tel:+923001234567" class="text-[#D4AF37] font-bold">0300-1234567</a>
          </div>
        </div>

        <!-- Gulshan-e-Iqbal Branch -->
        <div class="p-6 rounded-3xl glass-surface border border-[#2A2F3D] hover:border-gold transition-all">
          <div class="flex items-center justify-between mb-4">
            <span class="p-2 rounded-2xl bg-[#0F1115] border border-[#2A2F3D] text-[#D4AF37]">
              <i data-lucide="map-pin" style="width: 20px; height: 20px;"></i>
            </span>
            <span class="text-xs font-mono-num font-bold text-[#2E7D32] px-2 py-1 rounded-full border border-[#2E7D32]/30" style="background: rgba(46, 125, 50, 0.1);">
              Open · 12 PM - 3 AM
            </span>
          </div>
          <h3 class="text-xl font-bold text-white">Gulshan Hub</h3>
          <p class="text-xs text-[#A8A296] mt-1">Block 13-B, Main University Road, Gulshan-e-Iqbal, Karachi</p>
          <div class="mt-4 pt-4 border-t border-[#2A2F3D] flex items-center justify-between text-xs">
            <span class="text-[#6E7480]">Delivery: 35-45 min</span>
            <a href="tel:+923001234567" class="text-[#D4AF37] font-bold">0300-1234567</a>
          </div>
        </div>

        <!-- North Nazimabad Branch -->
        <div class="p-6 rounded-3xl glass-surface border border-[#2A2F3D] hover:border-gold transition-all">
          <div class="flex items-center justify-between mb-4">
            <span class="p-2 rounded-2xl bg-[#0F1115] border border-[#2A2F3D] text-[#D4AF37]">
              <i data-lucide="map-pin" style="width: 20px; height: 20px;"></i>
            </span>
            <span class="text-xs font-mono-num font-bold text-[#2E7D32] px-2 py-1 rounded-full border border-[#2E7D32]/30" style="background: rgba(46, 125, 50, 0.1);">
              Open · 12 PM - 3 AM
            </span>
          </div>
          <h3 class="text-xl font-bold text-white">North Nazimabad Hub</h3>
          <p class="text-xs text-[#A8A296] mt-1">Block H, Hydri Market, North Nazimabad, Karachi</p>
          <div class="mt-4 pt-4 border-t border-[#2A2F3D] flex items-center justify-between text-xs">
            <span class="text-[#6E7480]">Delivery: 40-50 min</span>
            <a href="tel:+923001234567" class="text-[#D4AF37] font-bold">0300-1234567</a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ==========================================================================
       CONTACT & CATERING SECTION (#contact)
       ========================================================================== -->
  <section id="contact" class="py-20 relative bg-[#0C0E14] border-t border-[#2A2F3D]">
    <div class="max-w-7xl px-4 sm:px-6 text-left">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div class="lg:col-span-5 space-y-4">
          <span class="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Get In Touch</span>
          <h2 class="text-3xl sm:text-4xl font-black text-white">
            Direct Line & <span class="text-liquid-gold">Customer Support</span>
          </h2>
          <p class="text-sm text-[#A8A296] leading-relaxed">
            Have a question about an ongoing order, corporate dawat catering, or franchise inquiries? Reach our operations desk 24/7.
          </p>

          <div class="space-y-4 pt-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#181B22] border border-gold flex items-center justify-center text-[#D4AF37]">
                <i data-lucide="phone" style="width: 16px; height: 16px;"></i>
              </div>
              <div>
                <div class="text-xs text-[#A8A296] uppercase font-bold" style="font-size: 10px;">Phone & WhatsApp</div>
                <a href="tel:+923001234567" class="text-sm font-bold text-white hover:text-[#D4AF37] transition-colors font-mono-num">
                  +92 300 1234567
                </a>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#181B22] border border-gold flex items-center justify-center text-[#D4AF37]">
                <i data-lucide="mail" style="width: 16px; height: 16px;"></i>
              </div>
              <div>
                <div class="text-xs text-[#A8A296] uppercase font-bold" style="font-size: 10px;">Official Email</div>
                <a href="mailto:info@karachibites.pk" class="text-sm font-bold text-white hover:text-[#D4AF37] transition-colors font-mono-num">
                  info@karachibites.pk
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <form id="contact-form" class="p-6 sm:p-8 rounded-3xl glass-surface border border-[#2A2F3D] space-y-4">
            <h3 class="text-lg font-bold text-white">Send a Direct Message</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-[#A8A296] uppercase mb-1" style="font-size: 11px;">Full Name</label>
                <input type="text" required placeholder="Saad Asif" class="w-full p-3 rounded-xl bg-[#0F1115] border border-[#2A2F3D] text-xs text-white placeholder-[#6E7480] focus:outline-none" style="border: 1px solid #2A2F3D;" />
              </div>
              <div>
                <label class="block text-xs font-bold text-[#A8A296] uppercase mb-1" style="font-size: 11px;">Contact Phone</label>
                <input type="tel" required placeholder="0300 1234567" class="w-full p-3 rounded-xl bg-[#0F1115] border border-[#2A2F3D] text-xs text-white placeholder-[#6E7480] focus:outline-none" style="border: 1px solid #2A2F3D;" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-[#A8A296] uppercase mb-1" style="font-size: 11px;">Message / Catering Details</label>
              <textarea rows="3" required placeholder="Details about your catering order or feedback..." class="w-full p-3 rounded-xl bg-[#0F1115] border border-[#2A2F3D] text-xs text-white placeholder-[#6E7480] focus:outline-none" style="border: 1px solid #2A2F3D;"></textarea>
            </div>
            <button type="submit" class="btn-primary-liquid w-full py-3 text-xs font-bold">
              <span>Send Message</span>
              <i data-lucide="send" style="width: 16px; height: 16px;"></i>
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>

  <!-- ==========================================================================
       PERSISTENT CART DRAWER & CHECKOUT
       ========================================================================== -->
  <div id="cart-backdrop" class="fixed inset-0 bg-black/60 z-40 opacity-0 pointer-events-none transition-opacity duration-300"></div>
  <aside id="cart-drawer">
    <!-- Cart Header -->
    <div class="p-5 border-b border-[#2A2F3D] flex items-center justify-between">
      <div class="flex items-center gap-2">
        <i data-lucide="shopping-bag" style="width: 20px; height: 20px; color: #D4AF37;"></i>
        <h3 class="font-royal font-bold text-base text-white">Your Culinary Bag</h3>
      </div>
      <button id="cart-close-btn" class="btn-kinetic" aria-label="Close Bag">
        <i data-lucide="x" style="width: 16px; height: 16px;"></i>
      </button>
    </div>

    <!-- Cart Items Scroll List -->
    <div id="cart-items-container" class="overflow-y-auto p-5 space-y-3" style="flex: 1;">
      <!-- Cart items injected dynamically -->
    </div>

    <!-- Cart Summary Footer -->
    <div class="p-5 border-t border-[#2A2F3D] space-y-3" style="background: #141720;">
      <div class="flex items-center justify-between text-xs text-[#A8A296]">
        <span>Subtotal</span>
        <span class="font-mono-num font-bold text-white">Rs. <span id="cart-subtotal-val">0</span></span>
      </div>
      <div class="flex items-center justify-between text-xs text-[#A8A296]">
        <span>Thermal Bag Delivery</span>
        <span class="font-mono-num font-bold text-[#D4AF37]">Rs. <span id="cart-delivery-val">150</span></span>
      </div>
      <div class="flex items-center justify-between text-base font-black text-white pt-2 border-t border-[#2A2F3D]">
        <span>Grand Total</span>
        <span class="font-mono-num text-[#FFB800]">Rs. <span id="cart-grand-total-val">0</span></span>
      </div>
      <button id="cart-checkout-btn" class="btn-primary-liquid w-full py-3 text-xs font-black uppercase tracking-wider ripple-surface">
        <span>Checkout Now</span>
        <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
      </button>
    </div>
  </aside>

  <!-- ==========================================================================
       CHECKOUT MODAL
       ========================================================================== -->
  <div id="checkout-modal" class="modal-overlay">
    <div class="modal-content-box p-6 sm:p-8 glass-surface-gold text-left space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-[#2A2F3D]">
        <h3 class="font-royal font-black text-lg text-white">Complete Delivery Order</h3>
        <button id="checkout-close-btn" class="btn-kinetic"><i data-lucide="x" style="width: 16px; height: 16px;"></i></button>
      </div>

      <form id="checkout-form" class="space-y-3">
        <div>
          <label class="block text-xs font-bold text-[#A8A296] uppercase mb-1" style="font-size: 11px;">Customer Name</label>
          <input type="text" id="order-name" required placeholder="Saad Asif" class="w-full p-2.5 rounded-xl bg-[#0F1115] text-xs text-white placeholder-[#6E7480] focus:outline-none" style="border: 1px solid #2A2F3D;" />
        </div>
        <div>
          <label class="block text-xs font-bold text-[#A8A296] uppercase mb-1" style="font-size: 11px;">Phone Number (+92)</label>
          <input type="tel" id="order-phone" required placeholder="0300 1234567" class="w-full p-2.5 rounded-xl bg-[#0F1115] text-xs text-white placeholder-[#6E7480] focus:outline-none" style="border: 1px solid #2A2F3D;" />
        </div>
        <div>
          <label class="block text-xs font-bold text-[#A8A296] uppercase mb-1" style="font-size: 11px;">Delivery Address (Karachi)</label>
          <textarea id="order-address" required rows="2" placeholder="House/Flat #, Street, Block, Clifton / Gulshan..." class="w-full p-2.5 rounded-xl bg-[#0F1115] text-xs text-white placeholder-[#6E7480] focus:outline-none" style="border: 1px solid #2A2F3D;"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-[#A8A296] uppercase mb-1" style="font-size: 11px;">Kitchen Hub</label>
            <select id="order-hub" class="w-full p-2.5 rounded-xl bg-[#0F1115] text-xs text-white focus:outline-none" style="border: 1px solid #2A2F3D;">
              <option value="clifton">Clifton Hub</option>
              <option value="gulshan">Gulshan Hub</option>
              <option value="nazimabad">North Nazimabad</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-[#A8A296] uppercase mb-1" style="font-size: 11px;">Payment</label>
            <select id="order-payment" class="w-full p-2.5 rounded-xl bg-[#0F1115] text-xs text-white focus:outline-none" style="border: 1px solid #2A2F3D;">
              <option value="cod">Cash on Delivery</option>
              <option value="card">Debit/Credit Card</option>
            </select>
          </div>
        </div>

        <div class="pt-2 border-t border-[#2A2F3D] flex items-center justify-between text-xs">
          <span class="text-[#A8A296]">Total Payable:</span>
          <span class="font-mono-num font-black text-lg text-[#FFB800]">Rs. <span id="checkout-total-display">0</span></span>
        </div>

        <button type="submit" class="btn-primary-liquid w-full py-3 text-xs font-black uppercase tracking-wider">
          <span>Confirm & Place Order</span>
          <i data-lucide="check-circle-2" style="width: 16px; height: 16px;"></i>
        </button>
      </form>
    </div>
  </div>

  <!-- ==========================================================================
       CUSTOM 404 DISH OVERLAY MODAL
       ========================================================================== -->
  <div id="modal-404" class="modal-overlay">
    <div class="modal-content-box p-6 sm:p-8 glass-surface-gold text-center space-y-4">
      <div class="w-14 h-14 rounded-full bg-[#181B22] border border-[#FF4500] text-[#FF4500] flex items-center justify-center mx-auto shadow-lg">
        <i data-lucide="alert-circle" style="width: 28px; height: 28px;"></i>
      </div>
      <h3 class="font-royal font-black text-xl text-white">Dish Not Found</h3>
      <p class="text-xs text-[#A8A296] leading-relaxed">
        We couldn't find a dish matching your search query. Try searching for <span class="text-[#D4AF37] font-bold">Biryani</span>, <span class="text-[#D4AF37] font-bold">Karahi</span>, or <span class="text-[#D4AF37] font-bold">Malai Boti</span>.
      </p>
      <div class="pt-2 flex flex-col gap-2">
        <button id="btn-reset-menu" class="btn-primary-liquid w-full py-3 text-xs font-bold">
          <span>Return to Full Menu</span>
        </button>
        <button id="btn-close-404" class="btn-outline-conic w-full py-2.5 text-xs font-semibold">
          <span>Close Window</span>
        </button>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       FOOTER & HARDCODED COPYRIGHT
       ========================================================================== -->
  <footer class="py-10 bg-[#0A0C10] border-t border-[#2A2F3D] text-xs text-[#A8A296]">
    <div class="max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="Karachi Bites" class="max-h-9 w-auto object-contain" />
        <span class="font-royal font-black text-white text-sm">Karachi Bites</span>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-6 font-bold uppercase tracking-wider" style="font-size: 11px;">
        <a href="#hero" class="hover:text-[#D4AF37]">Home</a>
        <a href="#menu" class="hover:text-[#D4AF37]">Menu</a>
        <a href="#about" class="hover:text-[#D4AF37]">Heritage</a>
        <a href="#branches" class="hover:text-[#D4AF37]">Branches</a>
        <a href="#contact" class="hover:text-[#D4AF37]">Contact</a>
      </div>

      <div class="text-[#6E7480] text-center md:text-right font-medium">
        © 2026 Karachi Bites. All rights reserved.
      </div>
    </div>
  </footer>

  <!-- ==========================================================================
       JAVASCRIPT APPLICATION ENGINE (THREE.JS, GSAP, STATE & LOGIC)
       ========================================================================== -->
  <script>
    // --- 1. INITIALIZE ICONS ---
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // --- 2. LENIS SMOOTH SCROLL INTEGRATION ---
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // --- 3. MENU DATA ---
    const MENU_ITEMS = [
      {
        id: 1,
        name: 'Karachi Chicken Dum Biryani',
        category: 'Rice',
        price: 890,
        rating: '4.9',
        portion: 'Double Portion (Serves 1-2)',
        desc: 'Aged basmati rice slow-steamed with farm-fresh chicken, golden potatoes, dried plums, and house spices.',
        image: '/images/karachi_chicken_biryani_1791473086349.jpg',
        badge: 'Bestseller'
      },
      {
        id: 2,
        name: 'Shinwari Mutton Karahi',
        category: 'Karahi',
        price: 1850,
        rating: '5.0',
        portion: 'Half KG (Serves 2-3)',
        desc: 'Tender sheep cutlets braised in their natural fats with organic vine tomatoes, crushed black peppercorns, and ginger.',
        image: '/images/shinwari_mutton_karahi_1791473105219.jpg',
        badge: 'Chef Signature'
      },
      {
        id: 3,
        name: 'Chicken Malai Boti',
        category: 'BBQ',
        price: 850,
        rating: '4.9',
        portion: '8 Skewered Cubes',
        desc: 'Melt-in-mouth boneless chicken marinated for 12 hours in fresh cream, mild herbs, and grilled over charcoal.',
        image: '/images/chicken_malai_boti_1791473120307.jpg',
        badge: 'Popular'
      },
      {
        id: 4,
        name: 'Zinger Paratha Roll',
        category: 'BBQ',
        price: 420,
        rating: '4.8',
        portion: '1 Jumbo Roll',
        desc: 'Crispy fried chicken fillet wrapped in a flaky handmade butter paratha with garlic mayo and diced onions.',
        image: '/images/zinger_paratha_roll_1791473138394.jpg',
        badge: 'Fast Bite'
      },
      {
        id: 5,
        name: 'Tandoori Garlic Naan Basket',
        category: 'Breads',
        price: 240,
        rating: '4.7',
        portion: '3 Pieces',
        desc: 'Piping hot leavened bread brushed with garlic-infused desi ghee and nigella seeds, baked in a clay tandoor.',
        image: '/images/karachi_tandoor_bread_1791536139799.jpg',
        badge: 'Clay Baked'
      },
      {
        id: 6,
        name: 'Zeera Raita & Fresh Salad',
        category: 'Sides',
        price: 150,
        rating: '4.8',
        portion: 'Bowl',
        desc: 'Cooling yogurt infused with toasted cumin, mint essence, accompanied by sliced cucumbers and red onions.',
        image: '/images/karachi_drinks_raita_1791536103023.jpg',
        badge: 'Cooling'
      },
      {
        id: 7,
        name: 'Beef Seekh Kebab (4 pcs)',
        category: 'BBQ',
        price: 750,
        rating: '4.9',
        portion: '4 Jumbo Skewers',
        desc: 'Minced beef blended with crushed coriander, marrow fat, and pomegranate seeds seared on glowing skewers.',
        image: '/images/chicken_malai_boti_1791473120307.jpg',
        badge: 'Spicy'
      },
      {
        id: 8,
        name: 'Chilled Pakola Soda',
        category: 'Sides',
        price: 120,
        rating: '4.9',
        portion: '330ml Can',
        desc: 'Karachi icon - ice cold vibrant cream soda pairing perfectly with fiery karahi and spiced biryani.',
        image: '/images/karachi_drinks_raita_1791536103023.jpg',
        badge: 'Classic'
      }
    ];

    // --- 4. CART & APPLICATION STATE ---
    let cart = [];
    let activeBranch = 'clifton';
    let currentActiveDishIndex = 0;

    try {
      const savedCart = localStorage.getItem('kb_cart_items');
      if (savedCart) cart = JSON.parse(savedCart);
    } catch (e) {}

    // --- 5. TOAST NOTIFICATION ENGINE ---
    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast-msg ' + (type === 'success' ? 'toast-success' : 'toast-error');
      
      const icon = type === 'success' ? 'check-circle-2' : 'alert-circle';
      toast.innerHTML = '<i data-lucide="' + icon + '" style="width: 20px; height: 20px; flex-shrink: 0;"></i><span>' + message + '</span>';

      container.appendChild(toast);
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(110%)';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }

    // --- 6. RENDER MENU ITEMS ---
    function renderMenu(itemsToRender) {
      const container = document.getElementById('menu-grid-container');
      container.innerHTML = '';

      if (itemsToRender.length === 0) {
        open404Modal();
        return;
      }

      itemsToRender.forEach(item => {
        const card = document.createElement('article');
        card.className = 'p-4 rounded-3xl glass-surface border border-[#2A2F3D] hover:border-gold transition-all duration-300 flex flex-col justify-between group';
        
        card.innerHTML = [
          '<div>',
          '  <div class="relative h-48 rounded-2xl overflow-hidden mb-4 bg-[#0A0C10]">',
          '    <img src="' + item.image + '" alt="' + item.name + '" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />',
          '    <div class="absolute top-3 left-3 bg-[#0F1115]/90 border border-gold/40 px-2 py-1 rounded-md text-xs font-black uppercase text-[#D4AF37]" style="font-size: 10px;">',
          '      ' + item.badge,
          '    </div>',
          '    <div class="absolute top-3 right-3 bg-[#0F1115]/90 px-2 py-0.5 rounded-md text-xs font-bold text-[#FFB800] flex items-center gap-1 font-mono-num">',
          '      ★ ' + item.rating,
          '    </div>',
          '  </div>',
          '  <h3 class="font-royal font-bold text-base text-white group-hover:text-[#D4AF37] transition-colors leading-snug">',
          '    ' + item.name,
          '  </h3>',
          '  <p class="text-xs text-[#A8A296] line-clamp-2 mt-1 leading-relaxed" style="font-size: 11px;">',
          '    ' + item.desc,
          '  </p>',
          '  <div class="text-xs text-[#6E7480] font-semibold mt-2" style="font-size: 10px;">',
          '    ' + item.portion,
          '  </div>',
          '</div>',
          '<div class="mt-4 pt-3 border-t border-[#2A2F3D] flex items-center justify-between">',
          '  <div>',
          '    <span class="text-xs uppercase tracking-wider text-[#6E7480] block" style="font-size: 9px;">Price</span>',
          '    <span class="font-mono-num font-black text-base text-[#FFB800]">Rs. ' + item.price + '</span>',
          '  </div>',
          '  <button class="btn-primary-liquid py-2 px-4 text-xs font-bold ripple-surface add-to-cart-btn" data-id="' + item.id + '">',
          '    <i data-lucide="plus" style="width: 14px; height: 14px;"></i> Add',
          '  </button>',
          '</div>'
        ].join('\n');

        container.appendChild(card);
      });

      if (window.lucide) window.lucide.createIcons();

      container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = parseInt(btn.getAttribute('data-id'));
          addToCart(id);
        });
      });
    }

    // --- 7. CART ENGINE ---
    function addToCart(itemId) {
      const item = MENU_ITEMS.find(m => m.id === itemId);
      if (!item) return;

      const existing = cart.find(c => c.id === itemId);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ ...item, qty: 1 });
      }

      saveCart();
      updateCartUI();
      showToast('Added ' + item.name + ' to bag!', 'success');
    }

    function updateCartQty(itemId, delta) {
      const entry = cart.find(c => c.id === itemId);
      if (!entry) return;

      entry.qty += delta;
      if (entry.qty <= 0) {
        cart = cart.filter(c => c.id !== itemId);
        showToast('Item removed from bag', 'error');
      }
      saveCart();
      updateCartUI();
    }

    function saveCart() {
      try {
        localStorage.setItem('kb_cart_items', JSON.stringify(cart));
      } catch (e) {}
    }

    function updateCartUI() {
      const count = cart.reduce((acc, i) => acc + i.qty, 0);
      const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
      const delivery = count > 0 ? 150 : 0;
      const total = subtotal + delivery;

      document.getElementById('header-cart-count').textContent = count;
      document.getElementById('header-cart-total').textContent = subtotal;

      document.getElementById('cart-subtotal-val').textContent = subtotal;
      document.getElementById('cart-delivery-val').textContent = delivery;
      document.getElementById('cart-grand-total-val').textContent = total;
      document.getElementById('checkout-total-display').textContent = total;

      const container = document.getElementById('cart-items-container');
      container.innerHTML = '';

      if (cart.length === 0) {
        container.innerHTML = [
          '<div style="height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: #6E7480; gap: 8px;">',
          '  <i data-lucide="shopping-bag" style="width: 36px; height: 36px; color: #2A2F3D;"></i>',
          '  <p style="font-size: 12px;">Your bag is currently empty.</p>',
          '</div>'
        ].join('\n');
      } else {
        cart.forEach(item => {
          const row = document.createElement('div');
          row.className = 'p-3 rounded-2xl bg-[#141720] border border-[#2A2F3D] flex items-center justify-between gap-3';
          row.innerHTML = [
            '<div class="min-w-0" style="flex: 1;">',
            '  <h4 class="font-bold text-xs text-white" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + item.name + '</h4>',
            '  <div class="font-mono-num text-[#FFB800] mt-1" style="font-size: 11px;">Rs. ' + (item.price * item.qty) + '</div>',
            '</div>',
            '<div class="flex items-center gap-2">',
            '  <button class="btn-kinetic qty-minus" data-id="' + item.id + '">-</button>',
            '  <span class="font-mono-num font-bold text-xs text-white" style="width: 18px; text-align: center;">' + item.qty + '</span>',
            '  <button class="btn-kinetic qty-plus" data-id="' + item.id + '">+</button>',
            '</div>'
          ].join('\n');
          container.appendChild(row);
        });
      }

      if (window.lucide) window.lucide.createIcons();

      container.querySelectorAll('.qty-minus').forEach(b => {
        b.addEventListener('click', () => updateCartQty(parseInt(b.getAttribute('data-id')), -1));
      });
      container.querySelectorAll('.qty-plus').forEach(b => {
        b.addEventListener('click', () => updateCartQty(parseInt(b.getAttribute('data-id')), 1));
      });
    }

    // --- 8. CART DRAWER & CHECKOUT MODAL TOGGLES ---
    const cartDrawer = document.getElementById('cart-drawer');
    const cartBackdrop = document.getElementById('cart-backdrop');

    function openCart() {
      cartDrawer.classList.add('open');
      cartBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    }

    function closeCart() {
      cartDrawer.classList.remove('open');
      cartBackdrop.classList.add('opacity-0', 'pointer-events-none');
    }

    document.getElementById('cart-btn-trigger').addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
    document.getElementById('cart-close-btn').addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);

    const checkoutModal = document.getElementById('checkout-modal');
    document.getElementById('cart-checkout-btn').addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Cart is empty. Please add delicious items first!', 'error');
        return;
      }
      closeCart();
      checkoutModal.classList.add('active');
    });

    document.getElementById('checkout-close-btn').addEventListener('click', () => {
      checkoutModal.classList.remove('active');
    });

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('order-name').value.trim();
      const phone = document.getElementById('order-phone').value.trim();
      const address = document.getElementById('order-address').value.trim();
      const hub = document.getElementById('order-hub').value;

      checkoutModal.classList.remove('active');
      cart = [];
      saveCart();
      updateCartUI();

      showToast('Order Placed Successfully for ' + name + '!', 'success');
      showToast('Dispatching from ' + hub.toUpperCase() + ' Hub to: ' + address, 'success');
    });

    // --- 9. CUSTOM 404 MODAL ---
    const modal404 = document.getElementById('modal-404');
    function open404Modal() {
      modal404.classList.add('active');
    }
    function close404Modal() {
      modal404.classList.remove('active');
    }
    document.getElementById('btn-close-404').addEventListener('click', close404Modal);
    document.getElementById('btn-reset-menu').addEventListener('click', () => {
      close404Modal();
      document.getElementById('menu-search-input').value = '';
      renderMenu(MENU_ITEMS);
    });

    // --- 10. SEARCH & CATEGORY FILTER LISTENERS ---
    const searchInput = document.getElementById('menu-search-input');
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = MENU_ITEMS.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.category.toLowerCase().includes(q) || 
        m.desc.toLowerCase().includes(q)
      );
      renderMenu(filtered);
    });

    document.querySelectorAll('#category-filter-bar .pill-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#category-filter-bar .pill-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        if (cat === 'all') {
          renderMenu(MENU_ITEMS);
        } else {
          renderMenu(MENU_ITEMS.filter(m => m.category === cat));
        }
      });
    });

    // --- 11. BRANCH SELECTOR SYNCHRONIZATION ---
    document.querySelectorAll('#hero-branch-pills .pill-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#hero-branch-pills .pill-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeBranch = btn.getAttribute('data-branch');
        const label = activeBranch === 'clifton' ? 'Clifton' : activeBranch === 'gulshan' ? 'Gulshan' : 'Nazimabad';
        document.getElementById('header-branch-name').textContent = label;
        showToast('Active Kitchen Hub switched to ' + label, 'success');
      });
    });

    // --- 12. MOBILE NAVIGATION DRAWER ---
    const mobileDrawer = document.getElementById('mobile-menu-drawer');
    const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
    function openMobileDrawer() {
      mobileDrawer.classList.add('open');
      mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    }
    function closeMobileDrawer() {
      mobileDrawer.classList.remove('open');
      mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
    }
    document.getElementById('mobile-menu-toggle').addEventListener('click', openMobileDrawer);
    document.getElementById('mobile-drawer-close').addEventListener('click', closeMobileDrawer);
    mobileBackdrop.addEventListener('click', closeMobileDrawer);
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });

    // --- 13. TOUCH RIPPLE EFFECT FOR ALL TOUCH CONTROLS ---
    document.addEventListener('pointerdown', (e) => {
      const target = e.target.closest('.ripple-surface, button, .pill-filter');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      target.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });

    // --- 14. CONTACT FORM FEEDBACK ---
    document.getElementById('contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      e.target.reset();
      showToast('Thank you! Your catering message has been received.', 'success');
    });

    document.getElementById('hero-track-btn').addEventListener('click', () => {
      showToast('Live GPS Dispatch: Kitchen Hub #1 (Clifton) is preparing orders.', 'success');
    });

    // ==========================================================================
    // --- 15. THREE.JS 3D WEBGL SHOWCASE ENGINE ---
    // ==========================================================================
    const canvasContainer = document.getElementById('webgl-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0C10);

    const camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
    camera.position.set(0, 3.5, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    canvasContainer.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xFFDDAA, 0.85);
    scene.add(ambientLight);

    const goldSpotLight = new THREE.DirectionalLight(0xD4AF37, 2.8);
    goldSpotLight.position.set(5, 8, 4);
    scene.add(goldSpotLight);

    const fieryRimLight = new THREE.PointLight(0xFF4500, 3.5, 12);
    fieryRimLight.position.set(-3, -1, -2);
    scene.add(fieryRimLight);

    const coolFillLight = new THREE.DirectionalLight(0x406080, 0.8);
    coolFillLight.position.set(-5, 4, -3);
    scene.add(coolFillLight);

    const dishesRootGroup = new THREE.Group();
    scene.add(dishesRootGroup);

    // ----------------------------------------------------
    // MODEL 1: BIRYANI CLAY HANDI
    // ----------------------------------------------------
    const handiGroup = new THREE.Group();

    // Terracotta clay pot belly
    const potGeo = new THREE.SphereGeometry(1.6, 32, 24);
    const clayMat = new THREE.MeshStandardMaterial({
      color: 0x6A341A,
      roughness: 0.85,
      metalness: 0.1
    });
    const potMesh = new THREE.Mesh(potGeo, clayMat);
    potMesh.scale.set(1.1, 0.85, 1.1);
    potMesh.position.y = 0.2;
    handiGroup.add(potMesh);

    // Polished Metallic Gold Neck Ring
    const goldRimGeo = new THREE.TorusGeometry(1.18, 0.08, 16, 48);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.9,
      roughness: 0.2
    });
    const goldRim = new THREE.Mesh(goldRimGeo, goldMat);
    goldRim.rotation.x = Math.PI / 2;
    goldRim.position.y = 1.05;
    handiGroup.add(goldRim);

    // Steaming Saffron Basmati Rice Mound
    const riceGeo = new THREE.CylinderGeometry(1.05, 1.2, 0.6, 32);
    const riceMat = new THREE.MeshStandardMaterial({
      color: 0xF5C755,
      roughness: 0.9,
      metalness: 0.05
    });
    const riceMesh = new THREE.Mesh(riceGeo, riceMat);
    riceMesh.position.y = 0.95;
    handiGroup.add(riceMesh);

    // Handi Lid
    const lidGeo = new THREE.ConeGeometry(1.25, 0.65, 32);
    const lidMesh = new THREE.Mesh(lidGeo, clayMat);
    lidMesh.position.set(0.15, 1.5, 0.1);
    lidMesh.rotation.z = 0.18;
    handiGroup.add(lidMesh);

    // Lid Gold Knob
    const knobGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const knobMesh = new THREE.Mesh(knobGeo, goldMat);
    knobMesh.position.set(0.2, 1.9, 0.1);
    handiGroup.add(knobMesh);

    dishesRootGroup.add(handiGroup);

    // ----------------------------------------------------
    // MODEL 2: SHINWARI MUTTON KARAHI WOK
    // ----------------------------------------------------
    const karahiGroup = new THREE.Group();
    karahiGroup.visible = false;

    const wokGeo = new THREE.SphereGeometry(1.8, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const castIronMat = new THREE.MeshStandardMaterial({
      color: 0x1A1C22,
      roughness: 0.65,
      metalness: 0.8
    });
    const wokMesh = new THREE.Mesh(wokGeo, castIronMat);
    wokMesh.rotation.x = Math.PI;
    wokMesh.position.y = 0.8;
    karahiGroup.add(wokMesh);

    const handleGeo = new THREE.TorusGeometry(0.35, 0.06, 12, 24, Math.PI);
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.85, roughness: 0.25 });
    const handleL = new THREE.Mesh(handleGeo, brassMat);
    handleL.position.set(-1.85, 0.75, 0);
    handleL.rotation.y = -Math.PI / 2;
    karahiGroup.add(handleL);

    const handleR = new THREE.Mesh(handleGeo, brassMat);
    handleR.position.set(1.85, 0.75, 0);
    handleR.rotation.y = Math.PI / 2;
    karahiGroup.add(handleR);

    // Sizzling Tomato Gravy Surface
    const gravyGeo = new THREE.CylinderGeometry(1.6, 1.0, 0.35, 32);
    const gravyMat = new THREE.MeshStandardMaterial({
      color: 0x9E2A0A,
      roughness: 0.3,
      metalness: 0.2
    });
    const gravyMesh = new THREE.Mesh(gravyGeo, gravyMat);
    gravyMesh.position.y = 0.5;
    karahiGroup.add(gravyMesh);

    // Mutton chunks
    for (let i = 0; i < 9; i++) {
      const meatGeo = new THREE.DodecahedronGeometry(0.22, 0);
      const meatMat = new THREE.MeshStandardMaterial({ color: 0x481E10, roughness: 0.7 });
      const meatMesh = new THREE.Mesh(meatGeo, meatMat);
      const angle = (i / 9) * Math.PI * 2;
      const radius = 0.45 + (i % 3) * 0.3;
      meatMesh.position.set(Math.cos(angle) * radius, 0.65, Math.sin(angle) * radius);
      karahiGroup.add(meatMesh);
    }

    dishesRootGroup.add(karahiGroup);

    // ----------------------------------------------------
    // MODEL 3: SIZZLING CHARCOAL BBQ PLATTER
    // ----------------------------------------------------
    const bbqGroup = new THREE.Group();
    bbqGroup.visible = false;

    const plateGeo = new THREE.CylinderGeometry(1.8, 1.6, 0.2, 32);
    plateGeo.scale(1.2, 1, 0.8);
    const plateMesh = new THREE.Mesh(plateGeo, castIronMat);
    plateMesh.position.y = 0.2;
    bbqGroup.add(plateMesh);

    const woodGeo = new THREE.CylinderGeometry(2.0, 1.9, 0.25, 32);
    woodGeo.scale(1.25, 1, 0.85);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3E2723, roughness: 0.9 });
    const woodMesh = new THREE.Mesh(woodGeo, woodMat);
    woodMesh.position.y = 0.05;
    bbqGroup.add(woodMesh);

    for (let k = -1; k <= 1; k++) {
      const kebabGeo = new THREE.CylinderGeometry(0.14, 0.14, 2.2, 16);
      const kebabMat = new THREE.MeshStandardMaterial({ color: 0x4A2511, roughness: 0.75 });
      const kebabMesh = new THREE.Mesh(kebabGeo, kebabMat);
      kebabMesh.rotation.z = Math.PI / 2;
      kebabMesh.position.set(0, 0.38, k * 0.45);
      bbqGroup.add(kebabMesh);
    }

    dishesRootGroup.add(bbqGroup);

    // ----------------------------------------------------
    // FLOATING STEAM PARTICLES SYSTEM
    // ----------------------------------------------------
    const particleCount = 140;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(particleCount * 3);
    const steamVelocities = [];

    for (let p = 0; p < particleCount; p++) {
      steamPositions[p * 3] = (Math.random() - 0.5) * 1.6;
      steamPositions[p * 3 + 1] = 0.8 + Math.random() * 2.5;
      steamPositions[p * 3 + 2] = (Math.random() - 0.5) * 1.6;

      steamVelocities.push({
        y: 0.012 + Math.random() * 0.02,
        xDrift: (Math.random() - 0.5) * 0.005,
        zDrift: (Math.random() - 0.5) * 0.005
      });
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xFDFBF7,
      size: 0.28,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    const steamParticles = new THREE.Points(steamGeo, steamMat);
    scene.add(steamParticles);

    // ----------------------------------------------------
    // 3D DISH SWITCHING INTERACTION
    // ----------------------------------------------------
    const dishModels = [handiGroup, karahiGroup, bbqGroup];

    function switch3DDish(index) {
      if (index === currentActiveDishIndex) return;
      currentActiveDishIndex = index;

      dishModels.forEach((dish, idx) => {
        if (idx === index) {
          dish.visible = true;
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(dish.scale, { x: 0.6, y: 0.6, z: 0.6 }, { x: 1, y: 1, z: 1, duration: 0.7, ease: 'back.out(1.7)' });
            gsap.fromTo(dish.rotation, { y: dishesRootGroup.rotation.y - 1.2 }, { y: 0, duration: 0.8, ease: 'power2.out' });
          }
        } else {
          dish.visible = false;
        }
      });

      document.querySelectorAll('#btn-dish-biryani, #btn-dish-karahi, #btn-dish-bbq').forEach((b, idx) => {
        if (idx === index) b.classList.add('active');
        else b.classList.remove('active');
      });
    }

    document.getElementById('btn-dish-biryani').addEventListener('click', () => switch3DDish(0));
    document.getElementById('btn-dish-karahi').addEventListener('click', () => switch3DDish(1));
    document.getElementById('btn-dish-bbq').addEventListener('click', () => switch3DDish(2));

    // ----------------------------------------------------
    // USER DRAG & ROTATION INTERACTION
    // ----------------------------------------------------
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = 0;

    canvasContainer.addEventListener('pointerdown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      targetRotationY += deltaX * 0.008;
    });

    window.addEventListener('pointerup', () => { isDragging = false; });

    // ----------------------------------------------------
    // GSAP SCROLLTRIGGER FOR 3D CAMERA PHYSICS
    // ----------------------------------------------------
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(dishesRootGroup.rotation, {
        y: Math.PI * 2,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      gsap.to(camera.position, {
        y: 4.8,
        z: 7.2,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // ----------------------------------------------------
    // ANIMATION TICK LOOP
    // ----------------------------------------------------
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        targetRotationY += delta * 0.25;
      }
      dishesRootGroup.rotation.y += (targetRotationY - dishesRootGroup.rotation.y) * 0.08;

      fieryRimLight.intensity = 3.2 + Math.sin(clock.getElapsedTime() * 12) * 0.6;

      const pos = steamGeo.attributes.position.array;
      for (let p = 0; p < particleCount; p++) {
        pos[p * 3 + 1] += steamVelocities[p].y;
        pos[p * 3] += Math.sin(clock.getElapsedTime() * 2 + p) * 0.003;

        if (pos[p * 3 + 1] > 3.6) {
          pos[p * 3 + 1] = 0.8;
          pos[p * 3] = (Math.random() - 0.5) * 1.5;
          pos[p * 3 + 2] = (Math.random() - 0.5) * 1.5;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });

    // --- 16. INITIALIZE RENDER ON PAGE LOAD ---
    renderMenu(MENU_ITEMS);
    updateCartUI();

  </script>
</body>
</html>
'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Written index.html, size: {len(html_content)} bytes")
