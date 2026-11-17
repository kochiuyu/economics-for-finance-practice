(() => {
  const mix = document.getElementById("recession-payoff");
  const recession = document.getElementById("recession-payment");
  const expansion = document.getElementById("expansion-payment");
  const price = document.getElementById("claim-price");
  const calculation = document.getElementById("pricing-calculation");

  function reprice() {
    const down = Number(mix.value);
    const up = 100 - down;
    recession.textContent = "HK$" + down;
    expansion.textContent = "HK$" + up;
    document.getElementById("recession-bar").style.width = down + "%";
    document.getElementById("expansion-bar").style.width = up + "%";
    price.textContent = "HK$" + (0.60 * down + 0.35 * up).toFixed(2);
    calculation.textContent = "Price today = 0.60 × " + down + " + 0.35 × " + up + " = " + price.textContent + ".";
  }

  mix.addEventListener("input", reprice);
  reprice();
})();
