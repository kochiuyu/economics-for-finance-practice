(() => {
  const withdrawals = document.getElementById("withdrawals");
  const reserve = document.getElementById("bank-cash");
  const salePrice = document.getElementById("bank-price");
  const number = new Intl.NumberFormat("en-HK", {maximumFractionDigits: 2});

  function display(id, value) {
    document.getElementById(id).textContent = number.format(value);
  }

  function update() {
    const requested = Number(withdrawals.value);
    const cash = Number(reserve.value);
    const price = Number(salePrice.value);
    const loans = 110 - cash;
    const loansSold = Math.min(loans, Math.max(0, requested - cash) / price);
    const paid = Math.min(requested, cash + loans * price);
    const equity = 10 - loansSold * (1 - price);
    display("withdrawal-amount", requested);
    display("bank-sold", loansSold);
    display("bank-paid", paid);
    display("bank-equity", equity);

    const payment = paid < requested
      ? number.format(requested - paid) + " million of requested withdrawals remains unpaid."
      : "All requests are paid.";
    let cushion = "Remaining assets cover deposits still owed.";
    if (equity < 0) cushion = "Remaining assets fall short of deposits still owed.";
    if (equity === 0) cushion = "The equity cushion is exhausted.";
    document.getElementById("bank-result").textContent = payment + " " + cushion;
  }

  withdrawals.addEventListener("input", update);
  reserve.addEventListener("change", update);
  salePrice.addEventListener("change", update);
  update();
})();
