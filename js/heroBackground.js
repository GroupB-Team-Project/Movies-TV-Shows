// =======================
// HERO BACKGROUND MODULE
// Message From Aaron: no touchy, this is my baby
//
// =======================

export function initHeroBackground(heroId = "hero-bg") {
  const hero = document.getElementById(heroId);
  if (!hero) return;

  // Create layers
  const glow1 = document.createElement("div");
  const glow2 = document.createElement("div");
  const sheen = document.createElement("div");

  glow1.className = `
    absolute w-[700px] h-[700px]
    bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_65%)]
    blur-2xl opacity-60
    -top-40 -left-40
    transition-transform duration-[6000ms] ease-out
    pointer-events-none
  `;

  glow2.className = `
    absolute w-[700px] h-[700px]
    bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_65%)]
    blur-2xl opacity-50
    -bottom-40 -right-40
    transition-transform duration-[7000ms] ease-out
    pointer-events-none
  `;

  sheen.className = `
    absolute inset-0
    bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_40%,rgba(255,255,255,0.03)_100%)]
    opacity-60
    pointer-events-none
  `;

  hero.appendChild(glow1);
  hero.appendChild(glow2);
  hero.appendChild(sheen);

  // =======================
  // SLOW FLOAT ANIMATION
  // =======================
  let t = 0;

  function animate() {
    t += 0.002;

    const x1 = Math.sin(t) * 40;
    const y1 = Math.cos(t) * 30;

    const x2 = Math.cos(t * 0.8) * 50;
    const y2 = Math.sin(t * 0.8) * 35;

    glow1.style.transform = `translate(${x1}px, ${y1}px)`;
    glow2.style.transform = `translate(${x2}px, ${y2}px)`;

    requestAnimationFrame(animate);
  }

  animate();

  // =======================
  // PARALLAX (SUBTLE)
  // =======================
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    sheen.style.transform = `translate(${x}px, ${y}px)`;
  });
}
