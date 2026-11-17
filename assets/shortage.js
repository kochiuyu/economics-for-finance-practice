(() => {
  const delivery = document.getElementById("delivery");
  const price = document.getElementById("price");
  const allocation = document.getElementById("allocation");
  const contracts = {
    now: { stock: 100, cost: 4200, priority: { 50: 30, 70: 10 } },
    later: { stock: 80, cost: 2400, priority: { 50: 14, 70: 4 } }
  };
  const currency = value => "HK$" + value.toLocaleString("en-US");
  function update() {
    const contract = contracts[delivery.value];
    const charge = Number(price.value);
    const priority = contract.priority[charge];
    const others = charge === 50 ? 90 : 70;
    const demand = priority + others;
    const sold = Math.min(demand, contract.stock);
    const lottery = allocation.value === "lottery";
    const reach = lottery ? sold * priority / demand : Math.min(priority, sold);
    const contribution = sold * charge - contract.cost;
    const count = Number(reach.toFixed(1));
    document.getElementById("sold").textContent = sold;
    document.getElementById("reach").textContent = count;
    document.getElementById("profit").textContent = currency(contribution);
    const worstReach = lottery ? Math.max(0, sold - others) : reach;
    const target = worstReach >= 25 ? "The minimum of 25 is guaranteed." :
      reach >= 25 ? "The target is met on average. A lottery can reach fewer than 25." :
      "This policy falls below the target of 25.";
    document.getElementById("policy-result").textContent = "Reach: " + count + " priority households" +
      (lottery && sold < demand ? " on average. " : ". ") + target + " Contribution: " + currency(contribution) + ".";
  }
  [delivery, price, allocation].forEach(control => control.addEventListener("change", update));
  update();
})();
