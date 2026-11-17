(() => {
  const weight = document.querySelector("#weight");
  const correlation = document.querySelector("#corr");
  const constraint = document.querySelector("#limit");
  const figure = document.createElement("figure");
  figure.className = "portfolio-figure";
  const canvas = document.createElement("canvas");
  canvas.width = 580;
  canvas.height = 300;
  canvas.setAttribute("role","img");
  const caption = document.createElement("figcaption");
  figure.append(canvas,caption);
  document.querySelector("#mix").after(figure);
  function draw(w, best, covariance, longOnly) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const low = longOnly ? 0 : -1, high = longOnly ? 1 : 2;
    const riskAt = t => 100*Math.sqrt(t*t*.04+(1-t)*(1-t)*.01+2*t*(1-t)*covariance);
    const xmax = Math.ceil(Math.max(riskAt(low),riskAt(high))/5)*5;
    const x = t => 58 + 490*riskAt(t)/xmax;
    const y = t => 245 - 200*(t-low)/(high-low);
    ctx.clearRect(0,0,580,300);
    ctx.font = "16px system-ui";
    ctx.fillStyle = "#294d40";
    ctx.fillText("Expected annual return (%)",12,22);
    ctx.fillText("Annual volatility (%)",205,292);
    for(let i=0;i<=4;i++){
      const at=low+(high-low)*i/4, yy=y(at);
      ctx.fillText(String(4+4*at),23,yy+5);
      ctx.strokeStyle="#cbd2c4";ctx.beginPath();ctx.moveTo(58,yy);ctx.lineTo(548,yy);ctx.stroke();
      ctx.fillText(String(xmax*i/4),52+490*i/4,267);
    }
    ctx.beginPath();
    for(let i=0;i<=200;i++){const t=low+(high-low)*i/200;if(i===0)ctx.moveTo(x(t),y(t));else ctx.lineTo(x(t),y(t));}
    ctx.lineWidth=2;ctx.strokeStyle="#154839";ctx.stroke();
    ctx.strokeStyle="#934931";ctx.strokeRect(x(best)-7,y(best)-7,14,14);
    ctx.fillStyle="#154839";ctx.beginPath();ctx.arc(x(w),y(w),5,0,2*Math.PI);ctx.fill();
    caption.textContent="● Selected mix · □ Minimum volatility ("+riskAt(best).toFixed(2)+"% volatility, "+(4+4*best).toFixed(2)+"% return)";
    canvas.setAttribute("aria-label","Portfolio opportunity set. "+document.querySelector("#mix").textContent+" "+caption.textContent);
  }
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
    draw(w,minimum,covariance,longOnly);
  }
  weight.addEventListener("input", update);
  correlation.addEventListener("change", update);
  constraint.addEventListener("change", update);
  update();
})();
