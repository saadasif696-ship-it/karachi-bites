import gsap from 'gsap';

/**
 * High-performance 90 FPS 3D Tilt Effect on Food Cards
 * Uses GSAP quickTo for zero-lag cursor tracking on desktop,
 * and graceful touch-friendly fallback on mobile (360px+).
 */
export function setupCard3DTilt(cardElement: HTMLElement) {
  // If user is on a touch device without pointer precision, do not trap touch events
  const isTouchDevice =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);

  if (isTouchDevice) {
    return () => {};
  }

  // Pre-configure card 3D perspective
  cardElement.style.transformStyle = 'preserve-3d';
  cardElement.style.perspective = '1000px';

  // quickTo setters provide 90 FPS buttery smooth interpolation without GC overhead
  const rotateXTo = gsap.quickTo(cardElement, 'rotateX', { duration: 0.2, ease: 'power1.out' });
  const rotateYTo = gsap.quickTo(cardElement, 'rotateY', { duration: 0.2, ease: 'power1.out' });
  const scaleTo = gsap.quickTo(cardElement, 'scale', { duration: 0.25, ease: 'power1.out' });

  let isHovered = false;

  const onMouseMove = (e: MouseEvent) => {
    if (!isHovered) return;
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 10 deg tilt
    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;

    rotateXTo(tiltX);
    rotateYTo(tiltY);
  };

  const onMouseEnter = () => {
    isHovered = true;
    scaleTo(1.025);
  };

  const onMouseLeave = () => {
    isHovered = false;
    rotateXTo(0);
    rotateYTo(0);
    gsap.to(cardElement, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.55,
      ease: 'elastic.out(1.1, 0.45)',
      overwrite: 'auto'
    });
  };

  cardElement.addEventListener('mouseenter', onMouseEnter, { passive: true });
  cardElement.addEventListener('mousemove', onMouseMove, { passive: true });
  cardElement.addEventListener('mouseleave', onMouseLeave, { passive: true });

  return () => {
    cardElement.removeEventListener('mouseenter', onMouseEnter);
    cardElement.removeEventListener('mousemove', onMouseMove);
    cardElement.removeEventListener('mouseleave', onMouseLeave);
  };
}

/**
 * Triggers a viral 90 FPS Fly-to-Cart particle animation
 * Flies directly into the Header Cart Icon with parabolic arc & elastic recoil
 */
export function triggerFlyToCartAnimation(buttonElement: HTMLElement) {
  // Find destination: header cart button or mobile sticky cart button
  let targetCart = document.getElementById('header-cart-btn');
  if (!targetCart) {
    targetCart = document.getElementById('mobile-cart-btn');
  }

  const btnRect = buttonElement.getBoundingClientRect();
  const startX = btnRect.left + btnRect.width / 2;
  const startY = btnRect.top + btnRect.height / 2;

  let destX = window.innerWidth - 60;
  let destY = 32;

  if (targetCart) {
    const cartRect = targetCart.getBoundingClientRect();
    destX = cartRect.left + cartRect.width / 2;
    destY = cartRect.top + cartRect.height / 2;
  }

  // Create flying glowing particle element
  const particle = document.createElement('div');
  particle.className =
    'fixed z-[99999] pointer-events-none w-9 h-9 rounded-full bg-gradient-to-tr from-[#C86314] via-[#F7C44E] to-[#E69500] shadow-[0_0_22px_rgba(200,99,20,0.9)] flex items-center justify-center text-white border-2 border-white';
  
  particle.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  `;

  // Position at click epicenter
  particle.style.left = `${startX - 18}px`;
  particle.style.top = `${startY - 18}px`;
  particle.style.willChange = 'transform, opacity';

  document.body.appendChild(particle);

  const deltaX = destX - startX;
  const deltaY = destY - startY;

  // 90 FPS GPU accelerated parabolic timeline
  gsap.timeline({
    onComplete: () => {
      particle.remove();

      // Elastic cart recoil & glowing pulse on landing
      if (targetCart) {
        gsap.fromTo(
          targetCart,
          { scale: 1.35, rotate: -7, boxShadow: '0 0 25px rgba(200,99,20,0.9)' },
          { scale: 1, rotate: 0, boxShadow: 'none', duration: 0.5, ease: 'elastic.out(1.2, 0.4)' }
        );
      }
    }
  })
  .to(particle, {
    scale: 1.25,
    duration: 0.12,
    ease: 'power1.out'
  })
  .to(particle, {
    x: deltaX,
    y: deltaY,
    scale: 0.25,
    rotation: 720,
    opacity: 0.9,
    duration: 0.58,
    ease: 'power2.inOut'
  });
}
