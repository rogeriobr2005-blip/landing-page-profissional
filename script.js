document.addEventListener("DOMContentLoaded", () => {
  // --- MENU MOBILE ---
  const menuToggle = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Pequena animação no ícone hambúrguer
      const bars = menuToggle.querySelectorAll('.bar');
      bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
      bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
      bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -7px)' : 'none';
    });
  }

  // Fecha o menu ao clicar em links
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      // Reseta ícone hambúrguer
      const bars = menuToggle.querySelectorAll('.bar');
      bars.forEach(bar => bar.style.transform = 'none');
      bars[1].style.opacity = '1';
    });
  });

  // --- LÓGICA DO BLOB LÍQUIDO (LERP) ---
  const blob = document.querySelector('.img-wrapper');
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  
  const smoothness = 0.07; // Quanto menor, mais suave/fluido
  const activeRadius = 350; // Área de ativação em pixels

  // Função para deformar o blob organicamente
  const getBlobShape = (intensity) => {
    const r = () => 50 + (Math.random() * intensity * 25);
    return `${r()}% ${100-r()}% ${r()}% ${100-r()}% / ${r()}% ${r()}% ${100-r()}% ${100-r()}%`;
  };

  window.addEventListener('mousemove', (e) => {
    if (!blob) return;

    const rect = blob.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (dist < activeRadius) {
      // Cálculo de força baseado na proximidade
      const force = 1 - (dist / activeRadius);
      targetX = (e.clientX - centerX) * 0.25;
      targetY = (e.clientY - centerY) * 0.25;

      // Deforma o border-radius suavemente
      if (Math.random() > 0.8) {
        blob.style.borderRadius = getBlobShape(force);
      }
    } else {
      targetX = 0;
      targetY = 0;
      blob.style.borderRadius = "50%";
    }
  });

  // Loop de animação contínua (60fps)
  function animate() {
    // Interpolação Linear (LERP)
    currentX += (targetX - currentX) * smoothness;
    currentY += (targetY - currentY) * smoothness;

    if (blob) {
      // Aplica o movimento e um leve efeito de estiramento (scale)
      const stretch = 1 + (Math.abs(currentX + currentY) / 1000);
      blob.style.transform = `translate(${currentX}px, ${currentY}px) scale(${stretch})`;
    }

    requestAnimationFrame(animate);
  }

  animate();

  // --- SCROLL REVEAL (ANIMAÇÕES DE ENTRADA) ---
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1200,
    delay: 200,
    reset: false // Anima apenas uma vez ao descer
  });

  sr.reveal('.badge', { delay: 100, origin: 'left' });
  sr.reveal('.hero-text h2', { delay: 200, origin: 'left' });
  sr.reveal('.hero-text p', { delay: 300, origin: 'left' });
  sr.reveal('.hero-btns', { delay: 400, origin: 'bottom' });
  sr.reveal('.hero-img', { delay: 200, scale: 0.8 });
  
  sr.reveal('.card', { interval: 150, origin: 'bottom' });
  sr.reveal('.projeto-card', { interval: 200, origin: 'bottom', scale: 0.9 });
  sr.reveal('.contato-box', { delay: 200, scale: 0.9 });

  // Inicializa ícones Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});