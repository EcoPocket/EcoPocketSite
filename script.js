document.addEventListener('DOMContentLoaded', () => {
  // --- MENÚ DESPLEGABLE MÓVIL ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // --- SIMULADOR FINANCIERO (PÁGINA SECRETA) ---
  const btnCalc = document.getElementById('btnCalc');
  if (btnCalc) {
    btnCalc.addEventListener('click', () => {
      const q = parseFloat(document.getElementById('simQuantity').value) || 0;
      const price = parseFloat(document.getElementById('simPrice').value) || 0;
      
      const unitCost = 14500;
      const fixedCosts = 550000;

      const ingresos = q * price;
      const costosTotales = fixedCosts + (q * unitCost);
      const ganancia = ingresos - costosTotales;

      document.getElementById('resIngresos').textContent = `$ ${ingresos.toLocaleString('es-UY')}`;
      document.getElementById('resCostos').textContent = `$ ${costosTotales.toLocaleString('es-UY')}`;
      
      const elemGanancia = document.getElementById('resGanancia');
      elemGanancia.textContent = `$ ${ganancia.toLocaleString('es-UY')}`;

      if (ganancia >= 0) {
        elemGanancia.className = 'text-success';
      } else {
        elemGanancia.className = 'text-danger';
      }
    });
  }
});