document.addEventListener('DOMContentLoaded', () => {
  const formulaSelect = document.getElementById('formulaSelect');
  const inputsContainer = document.getElementById('inputsContainer');
  const calcularBtn = document.getElementById('calcularBtn');
  const resultado = document.getElementById('resultado');

  function renderInputs(formula) {
    let html = '';
    switch (formula) {
      case 'ohm':
        html = `
          <label class="form-label">Elige la variable a calcular:</label>
          <select id="variable" class="form-select mb-3">
            <option value="V">Voltaje (V)</option>
            <option value="I">Corriente (I)</option>
            <option value="R">Resistencia (R)</option>
          </select>
          <div id="valores"></div>
        `;
        break;
      case 'potencia':
        html = `
          <label class="form-label">Elige la variable a calcular:</label>
          <select id="variable" class="form-select mb-3">
            <option value="P">Potencia (P)</option>
            <option value="V">Voltaje (V)</option>
            <option value="I">Corriente (I)</option>
          </select>
          <div id="valores"></div>
        `;
        break;
      case 'energia':
        html = `
          <label class="form-label">Elige la variable a calcular:</label>
          <select id="variable" class="form-select mb-3">
            <option value="E">Energía (E)</option>
            <option value="P">Potencia (P)</option>
            <option value="t">Tiempo (t)</option>
          </select>
          <div id="valores"></div>
        `;
        break;
    }
    inputsContainer.innerHTML = html;
    actualizarInputs();
    document.getElementById('variable').addEventListener('change', actualizarInputs);
  }

  function actualizarInputs() {
    const formula = formulaSelect.value;
    const variable = document.getElementById('variable').value;
    const valoresDiv = document.getElementById('valores');

    let html = '';
    const input = (id, label) => `
      <div class="mb-3">
        <label for="${id}" class="form-label">${label}</label>
        <input type="number" id="${id}" class="form-control" placeholder="Ingresa ${label.toLowerCase()}">
      </div>
    `;

    if (formula === 'ohm') {
      if (variable === 'V') html = input('I', 'Corriente (A)') + input('R', 'Resistencia (Ω)');
      if (variable === 'I') html = input('V', 'Voltaje (V)') + input('R', 'Resistencia (Ω)');
      if (variable === 'R') html = input('V', 'Voltaje (V)') + input('I', 'Corriente (A)');
    } else if (formula === 'potencia') {
      if (variable === 'P') html = input('V', 'Voltaje (V)') + input('I', 'Corriente (A)');
      if (variable === 'V') html = input('P', 'Potencia (W)') + input('I', 'Corriente (A)');
      if (variable === 'I') html = input('P', 'Potencia (W)') + input('V', 'Voltaje (V)');
    } else if (formula === 'energia') {
      if (variable === 'E') html = input('P', 'Potencia (W)') + input('t', 'Tiempo (s)');
      if (variable === 'P') html = input('E', 'Energía (J)') + input('t', 'Tiempo (s)');
      if (variable === 't') html = input('E', 'Energía (J)') + input('P', 'Potencia (W)');
    }

    valoresDiv.innerHTML = html;
  }

  calcularBtn.addEventListener('click', () => {
    const formula = formulaSelect.value;
    const variable = document.getElementById('variable').value;

    let val1 = parseFloat(document.getElementById(Object.keys({}).find(k => true))) // placeholder para evitar error si nada cargó
    let result;

    try {
      if (formula === 'ohm') {
        const V = parseFloat(document.getElementById('V')?.value);
        const I = parseFloat(document.getElementById('I')?.value);
        const R = parseFloat(document.getElementById('R')?.value);
        if (variable === 'V') result = I * R;
        else if (variable === 'I') result = V / R;
        else result = V / I;
      } else if (formula === 'potencia') {
        const P = parseFloat(document.getElementById('P')?.value);
        const V = parseFloat(document.getElementById('V')?.value);
        const I = parseFloat(document.getElementById('I')?.value);
        if (variable === 'P') result = V * I;
        else if (variable === 'V') result = P / I;
        else result = P / V;
      } else if (formula === 'energia') {
        const E = parseFloat(document.getElementById('E')?.value);
        const P = parseFloat(document.getElementById('P')?.value);
        const t = parseFloat(document.getElementById('t')?.value);
        if (variable === 'E') result = P * t;
        else if (variable === 'P') result = E / t;
        else result = E / P;
      }

      if (isNaN(result)) throw 'Datos inválidos';

      resultado.textContent = `Resultado: ${variable} = ${result.toFixed(2)}`;
      resultado.classList.remove('d-none');
    } catch {
      resultado.textContent = 'Por favor, ingresa valores válidos.';
      resultado.classList.remove('d-none');
    }
  });

  formulaSelect.addEventListener('change', e => renderInputs(e.target.value));

  renderInputs('ohm');
});
