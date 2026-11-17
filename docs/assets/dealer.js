(() => {
  const field = document.getElementById("informed");
  const buy = document.getElementById("buy");
  const sell = document.getElementById("sell");
  const undo = document.getElementById("undo");
  const status = document.getElementById("trade-status");
  const orders = [];
  const price = value => value.toFixed(2);
  const probability = logOdds => 1 / (1 + Math.exp(-logOdds));
  function quotes() {
    const share = Number(field.value) / 100;
    const evidence = Math.log((1 + share) / (1 - share));
    const netBuys = orders.reduce((sum, order) => sum + (order === "Buy" ? 1 : -1), 0);
    const logOdds = netBuys * evidence;
    return { bid: probability(logOdds - evidence), ask: probability(logOdds + evidence), belief: probability(logOdds) };
  }
  function render(message) {
    const { bid, ask, belief } = quotes();
    document.getElementById("share").textContent = field.value + "%";
    document.getElementById("bid").textContent = price(bid);
    document.getElementById("ask").textContent = price(ask);
    document.getElementById("posterior").textContent = (100 * belief).toFixed(1) + "%";
    document.getElementById("history").textContent = "Order history · " + (orders.join(" → ") || "No trades yet");
    undo.disabled = orders.length === 0;
    status.textContent = message + " Next bid " + price(bid) + ", next ask " + price(ask) + ".";
  }
  function execute(order) {
    const previous = quotes();
    const fill = order === "Buy" ? previous.ask : previous.bid;
    orders.push(order);
    render(order + " executed at " + price(fill) + ".");
  }
  buy.addEventListener("click", () => execute("Buy"));
  sell.addEventListener("click", () => execute("Sell"));
  undo.addEventListener("click", () => { orders.pop(); render("Last trade removed."); });
  document.getElementById("reset").addEventListener("click", () => { orders.length = 0; render("Order history cleared."); });
  field.addEventListener("input", () => { orders.length = 0; render("Informed share changed. Starting a new session."); });
})();
