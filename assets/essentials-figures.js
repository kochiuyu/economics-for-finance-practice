(() => {
  const figures = document.querySelectorAll('[data-essentials-figure]');
  if (!figures.length) return;

  const colors = { green: '#17634e', blue: '#23598a', rust: '#9c442e', gray: '#596863' };
  const series = (name, points, color = 'green', style = 'line') => ({ name, points, color, style });
  const samples = (low, high, fn) => Array.from({length: 81}, (_, index) => {
    const x = low + (high - low) * index / 80;
    return [x, fn(x)];
  });
  const input = (selector, fallback) => {
    const field = document.querySelector(selector);
    return field?.value && field.validity.valid ? Number(field.value) : fallback;
  };
  const plot = (xTitle, yTitle, xTicks, yTicks, lines) => ({xTitle, yTitle, xTicks, yTicks, lines});
  const format = n => Number(n.toFixed(2)).toLocaleString('en-HK');

  function marketPrices() {
    return [plot('Required return (%)', 'Expected payment (HK$)', [0, 5, 10, 15], [95, 100, 105, 110, 115, 120, 125], [
      series('Implied price HK$100', [[0,100],[15,115]], 'gray', 'dashed'),
      series('Implied price HK$105', [[0,105],[15,120.75]]),
      series('Yesterday: 10%, HK$110', [[10,110]], 'gray', 'point'),
      series('A: stronger outlook', [[10,115.5]], 'blue', 'point'),
      series('B: lower required return', [[100*(110/105-1),110]], 'rust', 'point')
    ])];
  }

  function demand() {
    return [plot('Subscribers', 'Monthly price (HK$)', [840, 880, 920, 960, 1000, 1020], [96, 100, 104, 108, 112, 116], [
      series('Few close substitutes', [[1000,100],[940,110]], 'blue', 'segment'),
      series('Close rival', [[1000,100],[860,110]], 'rust', 'segment')
    ])];
  }

  function project() {
    const root = document.querySelector('#project-appraisal-lab');
    const feeField = root?.querySelectorAll('select')[1];
    const feeDate = root?.querySelectorAll('select')[2];
    const fee = feeField ? Number(feeField.value) : 0;
    const today = feeDate?.value === 'Today';
    const rate = Number(root?.querySelector('select')?.value || 6);
    const base = r => 108/(1+r/100)-100;
    const adjusted = r => base(r) - fee/1000/(today ? 1 : 1+r/100);
    const limit = today ? 100*(108/(100+fee/1000)-1) : 8-fee/1000;
    const lines = [
      series('Before fees · break-even at 8%', samples(4,12,base), 'gray', 'dashed'),
      series('NPV = 0', [[4,0],[12,0]], 'gray'),
      series('After chosen fee · break-even at '+format(limit)+'%', samples(4,12,adjusted)),
      series('Selected '+rate+'% rate · NPV HK$'+format(1000*adjusted(rate)), [[rate,adjusted(rate)]], 'rust','point')
    ];
    return [plot('Annual financing rate (%)', 'Net present value (HK$ thousands)', [4,6,8,10,12], [-7,-4,0,4], lines)];
  }

  function budgetLine() {
    const balances = (rate, current) => 50 + (100-current)*(1+rate/100);
    return [plot('Consumption today', 'Consumption next year', [40,60,80,100,120,140], [0,25,50,75,100,125], [
      series('Borrow or save at 6%', [[40,balances(6,40)],[140,balances(6,140)]], 'gray','dashed'),
      series('Save at 4%, borrow at 10%', [[40,balances(4,40)],[100,50],[140,balances(10,140)]]),
      series('Current income: 100 today, 50 next year', [[100,50]], 'rust','point')
    ])];
  }

  function insurance() {
    return [plot('Final wealth (HK$ thousands)', 'Utility (square root of wealth)', [30,36,50,64,68,80,100], [5,6,7,8,9,10,10.5], [
      series('Utility of certain wealth', samples(30,100,Math.sqrt)),
      series('Chord spans uninsured outcomes', [[36,6],[100,10]], 'blue'),
      series('Uninsured outcomes: 36 and 100', [[36,6],[100,10]], 'blue','point'),
      series('Expected wealth 68, expected utility 8', [[68,5],[68,8]], 'blue','dashed'),
      series('Certainty equivalent 64', [[30,8],[64,8],[64,5]], 'gray','dashed'),
      series('Wealth with the quoted insurance: 66', [[66,Math.sqrt(66)]], 'rust','point')
    ])];
  }

  function statePrices() {
    const recession = input('#recession-payoff',50);
    const price = .25*recession+35;
    return [plot('Recession payoff (HK$)', 'Price today (HK$)', [0,25,50,75,100], [30,35,40,45,50,55,60,65], [
      series('Claim price', [[0,35],[100,60]]),
      series('Selected split: HK$'+format(price), [[recession,price]], 'rust','point')
    ])];
  }

  function selection() {
    const offer = input('#offer-quality',60);
    document.querySelector('#offer-quality-value').textContent = String(offer);
    const value = offer < 10 ? null : offer < 90 ? 20 : 60;
    const lines = [
      series('Buyer breaks even where value equals offer', [[0,0],[110,110]], 'gray','dashed'),
      series('Only poor cars accept', [[10,20],[90,20]], 'rust'),
      series('Both types accept', [[90,60],[110,60]]),
      series('At 90, both types accept', [[90,60]], 'green','point'),
      series('At 90, poor-only value ends', [[90,20]], 'rust','open')
    ];
    if (value !== null) lines.push(series('Selected offer '+offer+' · buyer value '+value, [[offer,value]], 'blue','point'));
    else lines.push(series('Selected offer '+offer+' · no cars offered', [[offer,0]], 'blue','open'));
    return [plot('Offer price (illustrative units)', 'Expected buyer value if accepted', [0,10,20,60,90,110], [0,20,40,60,80,100,110], lines)];
  }

  function dealer() {
    const informed = input('#informed',50)/100;
    const evidence = Math.log((1+informed)/(1-informed));
    const probability = x => 1/(1+Math.exp(-x));
    const orderHistory = document.querySelector('#history')?.textContent || '';
    const orders = orderHistory.match(/\b(?:Buy|Sell)\b/g) || [];
    const quotes = [[probability(-evidence), .5, probability(evidence)]];
    let score = 0;
    for (const order of orders) {
      score += order === 'Buy' ? evidence : -evidence;
      quotes.push([probability(score-evidence),probability(score),probability(score+evidence)]);
    }
    const end = Math.max(2,orders.length);
    const ticks = [...new Set(Array.from({length:Math.min(6,end+1)},(_,i)=>Math.round(i*end/Math.min(5,end))))];
    return [plot('Orders observed', 'Quote / probability', ticks, [0,.25,.5,.75,1], [
      series('Bid', quotes.map((q,i)=>[i,q[0]]),'blue','segment'),
      series('Probability of payoff 1', quotes.map((q,i)=>[i,q[1]]),'gray','segment'),
      series('Ask', quotes.map((q,i)=>[i,q[2]]),'rust','segment')
    ])];
  }

  function bank() {
    const cash = input('#bank-cash',20), price = input('#bank-price',.75);
    const requested = input('#withdrawals',50);
    const cashLimit = cash + (110-cash)*price;
    const equityAt = amount => 10 - (1-price)*Math.min(110-cash,Math.max(0,amount-cash)/price);
    const values = [...new Set([0,cash,Math.min(100,cashLimit),100])].sort((a,b)=>a-b);
    const shortfall = amount => Math.max(0,amount-cashLimit);
    const equityLimit = price < 1 ? cash+10*price/(1-price) : Infinity;
    const equityLines = [
      series('Equity remaining', values.map(x=>[x,equityAt(x)])),
      series('Zero equity', [[0,0],[100,0]], 'gray','dashed')
    ];
    if (equityLimit <= Math.min(100,cashLimit)) equityLines.push(series('Equity exhausted at HK$'+format(equityLimit)+'m', [[equityLimit,0]], 'blue','point'));
    else equityLines.push(series('Equity stays positive throughout the range', [], 'blue','point'));
    equityLines.push(series('Selected withdrawal: HK$'+format(requested)+'m', [[requested,equityAt(requested)]], 'rust','point'));
    const equityTicks = equityAt(100) < -25 ? [-40,-30,-20,-10,0,10,15] : [-25,-20,-10,0,10,15];
    const shortLines = [series('Withdrawals unpaid', values.map(x=>[x,shortfall(x)]))];
    if (cashLimit < 100) shortLines.push(series('Cash and sale proceeds exhausted at HK$'+format(cashLimit)+'m', [[cashLimit,0]], 'blue','point'));
    else shortLines.push(series('Cash and sale proceeds cover the full range', [], 'blue','point'));
    shortLines.push(series('Selected withdrawal: HK$'+format(requested)+'m', [[requested,shortfall(requested)]],'rust','point'));
    return [
      plot('Withdrawals requested (HK$ million)', 'Equity remaining (HK$ million)', [0,25,50,75,100], equityTicks, equityLines),
      plot('Withdrawals requested (HK$ million)', 'Unpaid withdrawals (HK$ million)', [0,25,50,75,100], [0,10,20,30,40], shortLines)
    ];
  }

  function returns() {
    return [plot('Reporting period', 'Index (base year = 100)', [0,1], [98,100,102,104,106,108,110], [
      series('Nominal sales: 108', [[0,100],[1,108]], 'blue','segment'),
      series('Retailer price index: 106', [[0,100],[1,106]], 'gray','segment'),
      series('Price-adjusted sales: 101.89', [[0,100],[1,108/1.06]], 'green','segment')
    ])];
  }

  function shocks() {
    const demand = x => 125-x/4, supply = x => 75+x/4;
    const part = (lo,hi,fn) => [[lo,fn(lo)],[hi,fn(hi)]];
    const make = isDemand => plot('Quantity (illustrative units)', 'Price (HK$ per unit)', [60,80,100,120,140], [85,90,95,100,105,110,115], [
      series('Original demand', part(60,140,demand), 'blue', isDemand?'dashed':'line'),
      series('Original supply', part(60,140,supply), 'rust', isDemand?'line':'dashed'),
      series(isDemand?'Demand shifts left · idle capacity':'Supply shifts left · backlog',isDemand?part(60,120,x=>115-x/4):part(60,100,x=>90+x/4),isDemand?'blue':'rust'),
      series('Original equilibrium', [[100,100]],'gray','point'),
      series(isDemand?'A: price 95, quantity 80':'B: price 110, quantity 80', [[80,isDemand?95:110]],'green','point')
    ]);
    return [make(true),make(false)];
  }

  function covenant() {
    const lab = document.querySelector('#policy-transmission-lab');
    const controls = lab?.querySelectorAll('select');
    const [rate, share, ebit] = controls ? [...controls].map(x=>Number(x.value)) : [4,100,6];
    const minimum = (r,s) => (r+2)*s + 5*(1-s);
    const lines = [
      series('Half of debt resets', [[2,minimum(2,.5)],[6,minimum(6,.5)]], 'blue','dashed'),
      series('All debt resets', [[2,minimum(2,1)],[6,minimum(6,1)]]),
      series('Before reset and rate-only stress', [[3,6],[5,6]], 'gray','segment')
    ];
    if (share !== 50 && share !== 100) lines.push(series('Selected share resets: '+share+'%', [[2,minimum(2,share/100)],[6,minimum(6,share/100)]],'gray','dashed'));
    lines.push(series('Selected borrower · minimum EBIT HK$'+format(minimum(rate,share/100))+'m', [[rate,ebit]], 'rust','point'));
    return [plot('Reference rate (%)', 'Annual EBIT (HK$ million)', [2,3,4,5,6], [3,4,5,6,7,8,9], lines)];
  }

  function currency() {
    const full = [[0,7.88],[1,7.88],[1,7.93],[2,7.93],[2,7.97],[3,7.97]];
    const hedge = [[0,7.88],[2,7.88],[2,7.92],[3,7.92]];
    return [plot('Cash forecast component', 'Invoice + interest (HK$ million)', [0,1,2,3], [7.86,7.88,7.90,7.92,7.94,7.96,7.98], [
      series('Unhedged stress: HK$7.97m', full,'rust'),
      series('Invoice fixed at 7.80: HK$7.92m', hedge,'green','dashed')
    ])];
  }

  const models = {'market-prices':marketPrices,'demand-elasticity':demand,'project-appraisal':project,
    'budget-line':budgetLine,'risk-insurance':insurance,'state-prices':statePrices,'adverse-selection':selection,'dealer-pricing':dealer,
    'bank-liquidity':bank,'real-returns':returns,'business-cycle-shocks':shocks,'policy-transmission':covenant,
    'hong-kong-exchange-rate':currency};
  const labels = {
    'real-returns': {0:'Base year',1:'Current year'},
    'hong-kong-exchange-rate': {0:'Base',1:'FX + 50k',2:'Interest + 40k',3:'Total'}
  };

  function renderChart(container, spec, key) {
    const canvas = document.createElement('canvas');
    const legend = document.createElement('ul');
    legend.className = 'ess-chart-legend';
    const box = document.createElement('div');
    box.className = 'ess-chart-panel';
    canvas.setAttribute('aria-hidden','true');
    box.append(canvas,legend);
    container.append(box);

    const width = Math.max(225,Math.min(780,container.clientWidth || 640));
    const height = width < 430 ? 255 : 310;
    const ratio = Math.min(2,window.devicePixelRatio || 1);
    canvas.width = width*ratio;
    canvas.height = height*ratio;
    canvas.style.width = width+'px';
    canvas.style.height = height+'px';
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(ratio,ratio);
    const {xTitle,yTitle,xTicks,yTicks,lines} = spec;
    const left=55, right=width-(labels[key] ? 38 : 25), top=36, bottom=height-54;
    const xMin=xTicks[0], xMax=xTicks.at(-1), yMin=yTicks[0], yMax=yTicks.at(-1);
    const x=n=>left+(n-xMin)*(right-left)/(xMax-xMin);
    const y=n=>bottom-(n-yMin)*(bottom-top)/(yMax-yMin);
    ctx.font='12px system-ui';
    ctx.fillStyle='#19372c';
    ctx.fillText(yTitle,8,17);
    ctx.textAlign='center';
    ctx.fillText(xTitle,(left+right)/2,height-9);
    for (const n of xTicks) ctx.fillText(labels[key]?.[n] ?? format(n),x(n),bottom+20);
    ctx.textAlign='right';
    for (const n of yTicks) {
      ctx.fillText(format(n),left-7,y(n)+4);
      ctx.strokeStyle='#cdd6d0';
      ctx.beginPath();
      ctx.moveTo(left,y(n));
      ctx.lineTo(right,y(n));
      ctx.stroke();
    }
    ctx.strokeStyle='#596863';
    ctx.beginPath();
    ctx.moveTo(left,top);
    ctx.lineTo(left,bottom);
    ctx.lineTo(right,bottom);
    ctx.stroke();
    for (const line of lines) {
      const item=document.createElement('li');
      const symbol=document.createElement('span');
      symbol.className='ess-chart-symbol';
      symbol.style.color=colors[line.color];
      symbol.setAttribute('aria-hidden','true');
      symbol.textContent=({point:'●',open:'○',dashed:'┄',line:'━',segment:'◆'})[line.style];
      item.append(symbol,line.name);
      legend.append(item);
      ctx.strokeStyle=ctx.fillStyle=colors[line.color];
      ctx.lineWidth=2.2;
      ctx.setLineDash(line.style==='dashed'?[6,4]:[]);
      if (line.style==='line'||line.style==='dashed'||line.style==='segment') {
        ctx.beginPath();
        for(const [index,[xx,yy]] of line.points.entries()) {
          if(index===0) ctx.moveTo(x(xx),y(yy));
          else ctx.lineTo(x(xx),y(yy));
        }
        ctx.stroke();
      }
      if (['point','open','segment'].includes(line.style)) {
        for(const [xx,yy] of line.points) {
          ctx.beginPath();
          ctx.arc(x(xx),y(yy),4.5,0,Math.PI*2);
          if(line.style==='open') {
            ctx.save();
            ctx.fillStyle='#fff';
            ctx.fill();
            ctx.restore();
            ctx.stroke();
          } else ctx.fill();
        }
      }
    }
  }

  function refresh() {
    for (const figure of figures) {
      const key=figure.dataset.essentialsFigure;
      const container=figure.querySelector('.ess-chart');
      container.replaceChildren();
      for (const data of models[key]()) renderChart(container,data,key);
    }
  }
  let frame;
  function schedule() {
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(refresh);
  }
  document.addEventListener('input',schedule);
  document.addEventListener('change',schedule);
  document.addEventListener('reset',schedule);
  document.addEventListener('click',event=>{
    if (event.target.closest('#desk button, .lab-reset')) schedule();
  });
  document.addEventListener('toggle',event=>{
    if (event.target.matches('.ess-optional') && event.target.open) schedule();
  },true);
  window.addEventListener('resize',schedule);
  refresh();
})();
