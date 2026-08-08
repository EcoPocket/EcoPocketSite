document.addEventListener('DOMContentLoaded', () => {
  // --- MENÚ DESPLEGABLE MÓVIL ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // --- CARRUSEL DE INTEGRANTES (EQUIPO.HTML) ---
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const cards = document.querySelectorAll('.team-card');

  if (track && cards.length > 0) {
    let currentIndex = 0;

    function getCardsPerPage() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, cards.length - getCardsPerPage());
    }

    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const maxIdx = getMaxIndex();
      for (let i = 0; i <= maxIdx; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      const maxIdx = getMaxIndex();
      if (currentIndex > maxIdx) currentIndex = maxIdx;

      const cardWidth = cards[0].offsetWidth + 24;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      if (dotsContainer) {
        document.querySelectorAll('.dot').forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }

      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= maxIdx;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < getMaxIndex()) {
          currentIndex++;
          updateCarousel();
        }
      });
    }

    // Gestos táctiles (Swipe)
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const threshold = 40;
      const maxIdx = getMaxIndex();

      if (startX - endX > threshold && currentIndex < maxIdx) {
        currentIndex++;
        updateCarousel();
      } else if (endX - startX > threshold && currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      createDots();
      updateCarousel();
    });

    createDots();
    updateCarousel();
  }
});