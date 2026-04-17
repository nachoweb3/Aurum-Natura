export function initHeroScene(root) {
  if (!root) {
    return;
  }

  const stage = root.querySelector('.hero-stage');
  const pointer = { x: 0, y: 0 };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !stage) {
    root.classList.add('is-static');
    return;
  }

  root.addEventListener('pointermove', (event) => {
    const bounds = root.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  });

  root.addEventListener('pointerleave', () => {
    pointer.x = 0;
    pointer.y = 0;
  });

  const layers = Array.from(root.querySelectorAll('[data-depth]'));
  let frame = 0;

  const tick = () => {
    frame += 1;

    stage.style.transform = `rotateX(${pointer.y * -5}deg) rotateY(${pointer.x * 6}deg)`;

    for (const layer of layers) {
      const depth = Number(layer.dataset.depth ?? 1);
      const floatX = pointer.x * depth * 8;
      const floatY = pointer.y * depth * -10;
      const drift = Math.sin(frame / (40 + depth * 8)) * depth * 2;
      const lift = Math.cos(frame / (55 + depth * 6)) * depth * 3;

      layer.style.transform = `translate3d(${floatX}px, ${floatY + lift}px, ${depth * 26}px) rotateZ(${drift}deg)`;
    }

    window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
}
