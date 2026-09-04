document.addEventListener('DOMContentLoaded', () => {
  // --- MENÚ DESPLEGABLE MÓVIL ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // --- CALCULADORA DE PRESUPUESTO 50/30/20 ---
  const btnBudgetCalc = document.getElementById('btnBudgetCalc');
  if (btnBudgetCalc) {
    btnBudgetCalc.addEventListener('click', (e) => {
      e.preventDefault();
      const incomeInput = document.getElementById('incomeInput');
      const income = parseFloat(incomeInput ? incomeInput.value : 0) || 0;

      const needs = income * 0.50;
      const wants = income * 0.30;
      const savings = income * 0.20;

      const resNeeds = document.getElementById('resNeeds');
      const resWants = document.getElementById('resWants');
      const resSavings = document.getElementById('resSavings');

      if (resNeeds) resNeeds.textContent = `$ ${needs.toLocaleString('es-UY')}`;
      if (resWants) resWants.textContent = `$ ${wants.toLocaleString('es-UY')}`;
      if (resSavings) resSavings.textContent = `$ ${savings.toLocaleString('es-UY')}`;
    });
  }

  // --- SIMULADOR DE METAS DE AHORRO ---
  const btnGoalCalc = document.getElementById('btnGoalCalc');
  if (btnGoalCalc) {
    btnGoalCalc.addEventListener('click', (e) => {
      e.preventDefault();

      const goalInput = document.getElementById('goalAmount');
      const monthlyInput = document.getElementById('monthlySave');
      const resultsBox = document.getElementById('goalResults');

      const goal = parseFloat(goalInput ? goalInput.value : 0);
      const monthly = parseFloat(monthlyInput ? monthlyInput.value : 0);

      if (!isNaN(goal) && !isNaN(monthly) && goal > 0 && monthly > 0) {
        const totalMonths = Math.ceil(goal / monthly);
        const years = Math.floor(totalMonths / 12);
        const remainingMonths = totalMonths % 12;

        let timeText = '';

        if (years === 0) {
          timeText = `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
        } else {
          const yearStr = `${years} ${years === 1 ? 'año' : 'años'}`;
          if (remainingMonths === 0) {
            timeText = `${totalMonths} meses (${yearStr})`;
          } else {
            const monthStr = `${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
            timeText = `${totalMonths} meses (${yearStr} y ${monthStr})`;
          }
        }

        const elemTotal = document.getElementById('resGoalTotal');
        const elemMonthly = document.getElementById('resGoalMonthly');
        const elemTimeText = document.getElementById('resGoalTimeText');

        if (elemTotal) elemTotal.textContent = `$ ${goal.toLocaleString('es-UY')}`;
        if (elemMonthly) elemMonthly.textContent = `$ ${monthly.toLocaleString('es-UY')}`;
        if (elemTimeText) elemTimeText.textContent = timeText;

        if (resultsBox) resultsBox.style.display = 'block';
      } else {
        alert('Por favor, ingresa números válidos y mayores a 0 en ambos campos.');
      }
    });
  }
});