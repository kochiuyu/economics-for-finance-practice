(() => {
  const weight = document.querySelector("#weight");
  const correlation = document.querySelector("#corr");
  const constraint = document.querySelector("#limit");
  function update() {
    const longOnly = constraint.value === "long";
    weight.min = longOnly ? 0 : -100;
    weight.max = longOnly ? 100 : 200;
    const w = Number(weight.value) / 100;
    const b = 1 - w;
    const covariance = 0.02 * Number(correlation.value);
    const risk = Math.sqrt(w*w*0.04 + b*b*0.01 + 2*w*b*covariance);
    const optimum = (0.01-covariance)/(0.05-2*covariance);
    const minimum = longOnly ? Math.max(0, Math.min(1,optimum)) : optimum;
    document.querySelector("#mix").textContent = "Equities " + Math.round(w*100) + "% · Bonds " + Math.round(b*100) + "% · Expected return " + (4+4*w).toFixed(2) + "% · Volatility " + (100*risk).toFixed(2) + "% · Minimum-volatility equity weight " + (100*minimum).toFixed(1) + "%.";
  }
  weight.addEventListener("input", update);
  correlation.addEventListener("change", update);
  constraint.addEventListener("change", update);
  update();
})();
