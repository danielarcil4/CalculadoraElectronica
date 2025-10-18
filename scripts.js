const inputsDiv = document.getElementById("inputs");
const resultadoDiv = document.getElementById("resultado");
const formulaSelect = document.getElementById("formula");

function mostrarInputs() {
  const formula = formulaSelect.value;
  let html = "";

  if (formula === "ohm") {
    html = `
      <label>Corriente (I en amperios):</label>
      <input id="I" type="number" step="any">
      <label>Resistencia (R en ohmios):</label>
      <input id="R" type="number" step="any">
    `;
  } else if (formula === "divisor") {
    html = `
      <label>Voltaje total (Vt):</label>
      <input id="Vt" type="number" step="any">
      <label>Resistencia R1 (Ω):</label>
      <input id="R1" type="number" step="any">
      <label>Resistencia R2 (Ω):</label>
      <input id="R2" type="number" step="any">
    `;
  } else if (formula === "potencia") {
    html = `
      <label>Voltaje (V):</label>
      <input id="V" type="number" step="any">
      <label>Corriente (I):</label>
      <input id="I" type="number" step="any">
    `;
  }

  inputsDiv.innerHTML = html;
  resultadoDiv.innerHTML = "";
}

function calcular() {
  const formula = formulaSelect.value;
  let resultado = 0;

  if (formula === "ohm") {
    const I = parseFloat(document.getElementById("I").value);
    const R = parseFloat(document.getElementById("R").value);
    if (isNaN(I) || isNaN(R)) {
      resultadoDiv.innerText = "Completa todos los campos.";
      return;
    }
    resultado = I * R;
    resultadoDiv.innerText = `Voltaje = ${resultado.toFixed(2)} V`;
  } else if (formula === "divisor") {
    const Vt = parseFloat(document.getElementById("Vt").value);
    const R1 = parseFloat(document.getElementById("R1").value);
    const R2 = parseFloat(document.getElementById("R2").value);
    if (isNaN(Vt) || isNaN(R1) || isNaN(R2)) {
      resultadoDiv.innerText = "Completa todos los campos.";
      return;
    }
    const Vout = Vt * (R2 / (R1 + R2));
    resultadoDiv.innerText = `Voltaje en R2 = ${Vout.toFixed(2)} V`;
  } else if (formula === "potencia") {
    const V = parseFloat(document.getElementById("V").value);
    const I = parseFloat(document.getElementById("I").value);
    if (isNaN(V) || isNaN(I)) {
      resultadoDiv.innerText = "Completa todos los campos.";
      return;
    }
    resultado = V * I;
    resultadoDiv.innerText = `Potencia = ${resultado.toFixed(2)} W`;
  }
}

formulaSelect.addEventListener("change", mostrarInputs);
mostrarInputs();
