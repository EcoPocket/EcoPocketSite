document.addEventListener('DOMContentLoaded', () => {
  // --- MENÚ DESPLEGABLE MÓVIL ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // --- CALCULADORA DE PRESUPUESTO 50/30/20 (PÁGINA SECRETA) ---
  const btnBudgetCalc = document.getElementById('btnBudgetCalc');
  if (btnBudgetCalc) {
    btnBudgetCalc.addEventListener('click', () => {
      const income = parseFloat(document.getElementById('incomeInput').value) || 0;

      const needs = income * 0.50;
      const wants = income * 0.30;
      const savings = income * 0.20;

      document.getElementById('resNeeds').textContent = `$ ${needs.toLocaleString('es-UY')}`;
      document.getElementById('resWants').textContent = `$ ${wants.toLocaleString('es-UY')}`;
      document.getElementById('resSavings').textContent = `$ ${savings.toLocaleString('es-UY')}`;
    });
  }

  // --- SIMULADOR DE METAS DE AHORRO (PÁGINA SECRETA) ---
  const btnGoalCalc = document.getElementById('btnGoalCalc');
  if (btnGoalCalc) {
    btnGoalCalc.addEventListener('click', () => {
      const goal = parseFloat(document.getElementById('goalAmount').value) || 0;
      const monthly = parseFloat(document.getElementById('monthlySave').value) || 0;
      const resultsBox = document.getElementById('goalResults');

      if (goal > 0 && monthly > 0) {
        const months = Math.ceil(goal / monthly);

        document.getElementById('resGoalTotal').textContent = `$ ${goal.toLocaleString('es-UY')}`;
        document.getElementById('resGoalMonthly').textContent = `$ ${monthly.toLocaleString('es-UY')}`;
        document.getElementById('resGoalMonths').textContent = months;

        resultsBox.style.display = 'block';
      } else {
        alert('Por favor, ingresa números mayores a 0 en ambos campos.');
      }
    });
  }
});