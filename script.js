// Variable global para controlar la instancia del gráfico
let budgetChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  // --- MENÚ DESPLEGABLE MÓVIL ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // --- CALCULADORA DE PRESUPUESTO 50/30/20 Y GRÁFICO DE TORTA ---
  const btnBudgetCalc = document.getElementById('btnBudgetCalc');
  if (btnBudgetCalc) {
    btnBudgetCalc.addEventListener('click', (e) => {
      e.preventDefault();
      const incomeInput = document.getElementById('incomeInput');
      const income = parseFloat(incomeInput ? incomeInput.value : 0) || 0;

      if (income <= 0) {
        alert('Por favor, ingresa un monto de ingresos válido y mayor a 0.');
        return;
      }

      const needs = income * 0.50;
      const wants = income * 0.30;
      const savings = income * 0.20;

      const resNeeds = document.getElementById('resNeeds');
      const resWants = document.getElementById('resWants');
      const resSavings = document.getElementById('resSavings');

      if (resNeeds) resNeeds.textContent = `$ ${needs.toLocaleString('es-UY')}`;
      if (resWants) resWants.textContent = `$ ${wants.toLocaleString('es-UY')}`;
      if (resSavings) resSavings.textContent = `$ ${savings.toLocaleString('es-UY')}`;

      // --- RENDERIZADO DEL GRÁFICO DE TORTA ---
      const chartContainer = document.getElementById('chartContainer');
      const ctx = document.getElementById('budgetChart');

      if (chartContainer) chartContainer.style.display = 'block';

      if (ctx) {
        // Si ya hay un gráfico dibujado, se destruye antes de crear uno nuevo
        if (budgetChartInstance) {
          budgetChartInstance.destroy();
        }

        budgetChartInstance = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Necesidades (50%)', 'Gustos (30%)', 'Ahorro (20%)'],
            datasets: [{
              data: [needs, wants, savings],
              backgroundColor: ['#2e7d32', '#0288d1', '#f57c00'],
              hoverOffset: 6
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const value = context.raw || 0;
                    return ` $ ${value.toLocaleString('es-UY')}`;
                  }
                }
              }
            }
          }
        });
      }
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

        let timeText = '';
        if (fullYears === 0) {
          timeText = `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
        } else if (remMonths === 0) {
          timeText = `${totalMonths} meses (${fullYears} ${fullYears === 1 ? 'año' : 'años'})`;
        } else {
          timeText = `${totalMonths} meses (${fullYears} ${fullYears === 1 ? 'año' : 'años'} y ${remMonths} ${remMonths === 1 ? 'mes' : 'meses'})`;
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
document.addEventListener('DOMContentLoaded', () => {
  let budgetChartInstance = null;

  // --- MENÚ DESPLEGABLE MÓVIL ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // --- PROTECCIÓN CON CONTRASEÑA PARA EL CLUB VIP ---
  const validCodes = [
    "A7B9X2M4", "K9P3V1L8", "W2N5Z8Q6", "R4F7C9T2",
    "J8H2D5B1", "M6X3Y9K7", "L1V8P4N5", "Q3T6Z2R9",
    "G5C8B1F4", "D9M2H7J3", "T4N1X6W8", "P7L5K3V2"
  ];

  const vipLinks = document.querySelectorAll('.vip-link');
  vipLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Evita que el enlace haga la redirección normal
      
      const userCode = prompt('🔒 Ingresa tu código de acceso de 8 caracteres (incluido en tu EcoPocket):');

      // Si el usuario escribió algo y le dio Aceptar
      if (userCode) {
        // Limpiamos espacios extra y pasamos todo a mayúsculas para evitar errores comunes
        const cleanCode = userCode.trim().toUpperCase();

        if (validCodes.includes(cleanCode)) {
          alert('¡Código aceptado! Bienvenido al Club VIP EcoPocket.');
          // Aquí hacemos la redirección real a la página hiper mega secreta
          window.location.href = 'ecopockethypermegaultrapaginasecretitaparasololosquecompraronproductos.html';
        } else {
          alert('❌ Código incorrecto. Verifica tu tarjeta EcoPocket e inténtalo de nuevo.');
        }
      }
    });
  });

  // --- CALCULADORA DE PRESUPUESTO 50/30/20 CON GRÁFICO DE TORTA ---
  const btnBudgetCalc = document.getElementById('btnBudgetCalc');
  if (btnBudgetCalc) {
    btnBudgetCalc.addEventListener('click', (e) => {
      e.preventDefault();
      const incomeInput = document.getElementById('incomeInput');
      const income = parseFloat(incomeInput ? incomeInput.value : 0) || 0;

      if (income <= 0) {
        alert('Por favor, ingresa un monto de ingresos válido y mayor a 0.');
        return;
      }

      const needs = income * 0.50;
      const wants = income * 0.30;
      const savings = income * 0.20;

      const resNeeds = document.getElementById('resNeeds');
      const resWants = document.getElementById('resWants');
      const resSavings = document.getElementById('resSavings');

      if (resNeeds) resNeeds.textContent = `$ ${needs.toLocaleString('es-UY')}`;
      if (resWants) resWants.textContent = `$ ${wants.toLocaleString('es-UY')}`;
      if (resSavings) resSavings.textContent = `$ ${savings.toLocaleString('es-UY')}`;

      // Renderizar o actualizar el gráfico de torta
      const chartContainer = document.getElementById('chartContainer');
      const ctx = document.getElementById('budgetChart');

      if (chartContainer) chartContainer.style.display = 'block';

      if (ctx) {
        if (budgetChartInstance) {
          budgetChartInstance.destroy();
        }

        budgetChartInstance = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Necesidades (50%)', 'Gustos (30%)', 'Ahorro (20%)'],
            datasets: [{
              data: [needs, wants, savings],
              backgroundColor: ['#2e7d32', '#66bb6a', '#a5d6a7'],
              borderWidth: 2,
              borderColor: '#ffffff'
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: {
                    family: 'inherit',
                    size: 13
                  }
                }
              }
            }
          }
        });
      }
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

        let timeText = '';
        if (fullYears === 0) {
          timeText = `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
        } else if (remMonths === 0) {
          timeText = `${totalMonths} meses (${fullYears} ${fullYears === 1 ? 'año' : 'años'})`;
        } else {
          timeText = `${totalMonths} meses (${fullYears} ${fullYears === 1 ? 'año' : 'años'} y ${remMonths} ${remMonths === 1 ? 'mes' : 'meses'})`;
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