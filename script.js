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
        const fullYears = Math.floor(totalMonths / 12);
        const remMonths = totalMonths % 12;

        // Construir texto de tiempo legible
        let timeText = '';
        if (fullYears === 0) {
          timeText = `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
        } else if (remMonths === 0) {
          timeText = `${totalMonths} meses (${fullYears} ${fullYears === 1 ? 'año' : 'años'})`;
        } else {
          timeText = `${totalMonths} meses (${fullYears} ${fullYears === 1 ? 'año' : 'años'} y ${remMonths} ${remMonths === 1 ? 'mes' : 'meses'})`;
        }

        // Elementos en el DOM
        const elemTotal = document.getElementById('resGoalTotal');
        const elemMonthly = document.getElementById('resGoalMonthly');
        const elemTimeText = document.getElementById('resGoalTimeText');
        const elemMonths = document.getElementById('resGoalMonths');
        const elemYears = document.getElementById('resGoalYears');

        if (elemTotal) elemTotal.textContent = `$ ${goal.toLocaleString('es-UY')}`;
        if (elemMonthly) elemMonthly.textContent = `$ ${monthly.toLocaleString('es-UY')}`;

        // Soporte para ID único
        if (elemTimeText) elemTimeText.textContent = timeText;

        // Soporte retrocompatible por si mantuviste los IDs separados
        if (elemMonths) elemMonths.textContent = totalMonths;
        if (elemYears) elemYears.textContent = (totalMonths / 12).toFixed(1).replace('.', ',');

        if (resultsBox) resultsBox.style.display = 'block';
      } else {
        alert('Por favor, ingresa números válidos y mayores a 0 en ambos campos.');
      }
    });
  }
});