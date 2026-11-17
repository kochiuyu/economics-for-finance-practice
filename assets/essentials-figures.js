(() => {
  const figures = document.querySelectorAll('[data-essentials-figure]');
  const route = new URLSearchParams(window.location.search).get('route');
  const routes = ['essentials','investment','credit','treasury','fintech'];
  for (const task of document.querySelectorAll('[data-professional-route]')) {
    if (routes.includes(route)) task.hidden = route !== task.dataset.professionalRoute;
  }
  for (const section of document.querySelectorAll('.professional-practice')) {
    section.hidden = [...section.querySelectorAll('[data-professional-route]')].every(task=>task.hidden);
  }
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

  const bar = (name, points, color = 'green', offset = 0, base = 0) => ({
    ...series(name, points, color, 'bar'), offset, base
  });
  const named = (spec, tickLabels) => ({...spec, tickLabels});

  function marketRisk() {
    const a = [.4,7], b = [1.2,7];
    return [plot('Beta', 'Annual return (%)', [0,.4,.8,1.2,1.6], [0,3,5,7,9,11], [
      series('CAPM required return: 3% + beta × 5%', [[0,3],[1.6,11]]),
      series('A: 7% forecast vs 5% required', [[a[0],5],a],'blue','segment'),
      series('B: 7% forecast vs 9% required', [[b[0],9],b],'rust','segment')
    ])];
  }

  function betaEstimate() {
    return [plot('Market return (%)', 'Fund return (%)', [-3,-2,-1,0,1,2,3], [-3,-2,-1,0,1,2,3], [
      series('Four monthly observations', [[-2,-1],[-1,-2],[1,2],[2,1]],'blue','point'),
      series('Fitted slope with all four months: 0.80', [[-2.5,-2],[2.5,2]]),
      series('Without month 4: slope 1.14', [[-2,-13/7],[2,19/7]],'rust','dashed'),
      series('Month 4, omitted in the second fit', [[2,1]], 'rust','open')
    ])];
  }

  function sale() {
    const names = ['','Sell A','Sell B',''];
    return [
      named(plot('Sale choice', 'Cash raised and realized result (HK$)', [0,1,2,3], [-40,-20,0,20,40,60,80,100,120], [
        bar('Cash received: HK$100 either way', [[1,100],[2,100]],'green',-.13),
        bar('Realized gain or loss: +HK$30 / −HK$30', [[1,30],[2,-30]],'rust',.13)
      ]),names),
      named(plot('Sale choice', 'Immediate tax cash flow (HK$)', [0,1,2,3], [-8,-4,0,4,8], [
        bar('Sell A: HK$6 tax paid', [[1,-6]],'rust'),
        bar('Sell B: HK$6 tax saved if usable now', [[2,6]],'blue')
      ]),names)
    ];
  }

  function growth() {
    const value = (g,freeCash) => freeCash/(.08-g/100);
    return [
      named(plot('Year relative to installation', 'Annual output (units)', [0,1,2,3], [950,1000,1050,1100,1150], [
        series('With machine: 1,100 units from year 1', [[0,1000],[1,1100],[2,1100],[3,1100]],'green','segment'),
        series('Without machine: 1,000 units', [[0,1000],[3,1000]],'gray','dashed')
      ]),['Year 0','Year 1','Year 2','Year 3']),
      plot('Perpetual nominal growth (%)', 'Year-five terminal value (HK$ million)', [2,3,4,5,6], [1000,2000,3000,4000,5000], [
        series('Hold year-six free cash flow at HK$100m', samples(2,6,g=>value(g,100)),'blue'),
        series('Deduct reinvestment at 15% return on new capital', samples(2,6,g=>value(g,125*(1-g/15)))),
        series('At 5%: HK$3,333m fixed cash flow; HK$2,778m after reinvestment', [[5,value(5,100)],[5,value(5,125*(1-5/15))]],'rust','point')
      ])
    ];
  }

  function yields() {
    const maturities = [1,5];
    const pv = (t,rate) => 100/(1+rate/100)**t;
    const cases = [['Parallel rise',[5,5],'blue',-.14],['Steepening',[4,6],'rust',.14]];
    return [
      plot('Maturity (years)', 'Spot rate (%)', [0,1,2,3,4,5,6], [3,4,5,6,7], [
        series('Original rates: 4% at both maturities', [[1,4],[5,4]],'gray','segment'),
        ...cases.map(([name,rates,color])=>series(name,maturities.map((t,i)=>[t,rates[i]]),color,'segment'))
      ]),
      plot('Maturity (years)', 'Change in present value (HK$ million)', [0,1,2,3,4,5,6], [-8,-6,-4,-2,0,2],
        cases.map(([name,rates,color,offset])=>bar(name,maturities.map((t,i)=>[t,pv(t,rates[i])-pv(t,4)]),color,offset)))
    ];
  }

  function loanScreen() {
    return [named(plot('Borrower type', 'Borrower payoff (illustrative units)', [0,1,2,3], [0,10,20,30,40], [
      bar('Secured loan: 20 / 27.5', [[1,20],[2,27.5]],'green',-.23),
      bar('Unsecured loan: 0 / 30', [[1,0],[2,30]],'blue'),
      bar('Outside option: 15 / 0', [[1,15],[2,0]],'rust',.23)
    ]),['','Safe','Risky',''])];
  }

  function effort() {
    const selected = Number(document.querySelector('#borrower-incentives-lab select')?.value || 105);
    const effortPayoff = r => .8*(140-r)-9;
    const noEffortPayoff = r => .5*(140-r);
    const receipts = selected===110 ? [[110,88],[110,55]] : [[selected,selected*(selected<110?.8:.5)]];
    return [
      plot('Success repayment', 'Borrower expected payoff', [90,95,100,105,110,115,120], [0,10,20,30,40], [
        series('With effort', [[90,effortPayoff(90)],[120,effortPayoff(120)]]),
        series('Without effort',[[90,noEffortPayoff(90)],[120,noEffortPayoff(120)]],'blue'),
        series('Indifferent at 110', [[110,15]],'gray','point'),
        series('Selected repayment '+selected,[[selected,effortPayoff(selected)],[selected,noEffortPayoff(selected)]],'rust','point')
      ]),
      plot('Success repayment', 'Expected lender collections', [90,95,100,105,110,115,120], [45,55,65,75,80,90], [
        series('With effort below 110',[[90,72],[110,88]]),
        series('Without effort above 110',[[110,55],[120,60]],'blue'),
        series('Advance to recover: 80',[[90,80],[120,80]],'gray','dashed'),
        series('Strictly feasible repayments: 100 through values below 110',[[100,80],[110,88]],'green','highlight'),
        series('At 110: possible collections of 88 or 55',[[110,88],[110,55]],'blue','open'),
        series('Selected repayment '+selected,receipts,'rust','point')
      ])
    ];
  }

  function debtEquity() {
    const labels = ['','Weak / no','Weak / yes','Strong / no','Strong / yes',''];
    return [named(plot('State / project undertaken', 'Cash at maturity (illustrative units)', [0,1,2,3,4,5], [0,50,100,150,200], [
      bar('Old debt',[[1,60],[2,90],[3,100],[4,100]],'blue'),
      bar('Equity receives the remainder',[[3,140,100],[4,170,100]],'green')
    ]),labels),named(plot('Recipient', 'Expected net gain after funding (illustrative units)', [0,1,2,3,4], [-10,-5,0,5,10,15,20], [
      bar('Old debt: +15',[[1,15]],'blue'),
      bar('Existing equity: +15 cash flow less 20 cost',[[2,-5]],'rust'),
      bar('Firm overall: +10',[[3,10]])
    ]),['','Old debt','Old equity','Total',''])];
  }

  function rollover() {
    const gap = (renewed, rate) => (700-renewed)*rate-2000;
    return [plot('Principal renewed (US$ thousands)', 'Funding gap or surplus (HK$ thousands)', [350,400,450,500,550], [-900,-600,-300,0,300,600,900], [
      series('At 7.80 spot',[[350,gap(350,7.8)],[550,gap(550,7.8)]],'gray','dashed'),
      series('At 7.85 spot',[[350,gap(350,7.85)],[550,gap(550,7.85)]],'rust'),
      series('At 7.81 forward',[[350,gap(350,7.81)],[550,gap(550,7.81)]]),
      series('No funding gap',[[350,0],[550,0]],'gray'),
      series('Minimum at 7.80: US$443,590',[[700-2000/7.8,0]],'blue','point'),
      series('At US$400k renewal: deficits of HK$355k at spot and HK$343k with forward',[[400,gap(400,7.85)],[400,gap(400,7.81)]],'rust','point')
    ])];
  }

  function capacity() {
    const quotes = [85,100,115], orders = [120,90,65];
    const ticks = [70,...quotes,130];
    return [
      plot('Quoted price (HK$)', 'Units ordered or shipped', ticks, [0,30,60,90,120,150], [
        series('Orders',quotes.map((q,i)=>[q,orders[i]]),'gray','point'),
        bar('Shipments at capacity 100',quotes.map((q,i)=>[q,Math.min(100,orders[i])]),'blue',-1.7),
        bar('Shipments at capacity 65',quotes.map((q,i)=>[q,Math.min(65,orders[i])]),'green',1.7)
      ]),
      plot('Quoted price (HK$)', 'Weekly contribution at HK$55 unit cost (HK$)', ticks, [0,1000,2000,3000,4000,5000], [
        bar('Capacity 100: 3,000 / 4,050 / 3,900',quotes.map((q,i)=>[q,(q-55)*Math.min(100,orders[i])]),'blue',-1.7),
        bar('Capacity 65: 1,950 / 2,925 / 3,900',quotes.map((q,i)=>[q,(q-55)*Math.min(65,orders[i])]),'green',1.7)
      ])
    ];
  }

  function tariff() {
    return [named(plot('Party bearing the duty', 'Duty borne per unit (US$)', [0,1,2,3,4], [0,2,4,6,8,10], [
      bar('Exporter gives up US$4.00',[[1,4]],'blue'),
      bar('Customer pays US$4.00 more',[[2,8,4]]),
      bar('Importer loses US$1.60 of margin',[[3,9.6,8]],'rust'),
      series('Total burden equals duty: US$9.60',[[0,9.6],[4,9.6]],'gray','dashed')
    ]),['','Exporter','Customer','Importer',''])];
  }

  function switching() {
    const [confirmed,repeat,fee] = [...document.querySelectorAll('#tariff-incidence-lab select')].map(x=>Number(x.value));
    const wholeUnits = Math.ceil(fee/2.6);
    return [plot('Cumulative units (thousands)', 'Savings and qualification fee (US$ thousands)', [0,5,10,15,20,25], [0,15,30,45,60,70], [
      series('Gross savings at US$2.60 per unit',[[0,0],[25,65]]),
      series('Qualification fee: US$'+format(fee),[[0,fee/1000],[25,fee/1000]],'gray','dashed'),
      series('First whole-unit threshold: '+format(wholeUnits),[[fee/2600,fee/1000]],'blue','point'),
      series('Confirmed and possible total volume',[[confirmed/1000,confirmed*2.6/1000],[(confirmed+repeat)/1000,(confirmed+repeat)*2.6/1000]],'rust','point')
    ])];
  }

  function allocation() {
    const profit = p => (100*(80-p)+25*(120-p))/2;
    return [
      named(plot('Issue outcome', 'Shares allocated', [0,1,2,3], [0,25,50,75,100,125], [
        bar('Weak: 100 shares worth 80 each',[[1,100]],'rust'),
        bar('Strong: 25 shares worth 120 each',[[2,25]],'blue')
      ]),['','Weak','Strong','']),
      plot('Offer price per share', 'Expected profit per subscription', [75,80,85,90,95,100], [-1000,-500,0,500,1000], [
        series('Fixed allocation weights',[[75,profit(75)],[100,profit(100)]]),
        series('Break-even offer: 88',[[88,0]],'blue','point'),
        series('Offer 95: expected loss of 437.50',[[95,profit(95)]],'rust','point')
      ])
    ];
  }

  function platforms() {
    return [
      plot('Available lending capacity (loans)', 'Loans funded', [0,40,80,120,160], [0,40,80,120,160], [
        series('120 qualified applicants',[[0,0],[120,120],[160,120]]),
        series('140 qualified applicants',[[0,0],[140,140],[160,140]],'blue','dashed'),
        series('Baseline: 80 matches; adding capacity: 100',[[80,80],[100,100]],'rust','point')
      ]),
      named(plot('Acquisition choice', 'Contribution (illustrative units)', [0,1,2,3,4], [0,1000,2000,3000,4000], [
        bar('Baseline: 2,400',[[1,2400]],'gray'),
        bar('More applicants: 1,700',[[2,1700]],'rust'),
        bar('More lenders: 3,300',[[3,3300]])
      ]),['','Baseline','Applicants','Lenders',''])
    ];
  }

  function payments() {
    const advantage = p => 99000*(1-.001*p)/1.005-98500;
    return [plot('Probability of a 10% redemption loss (%)', 'Delayed settlement advantage today (HK$)', [0,.25,.5,.75,1], [-100,-75,-50,-25,0,25], [
      series('Value of B less value of A',[[0,advantage(0)],[1,advantage(1)]]),
      series('Break-even probability: about 0.076%',[[100*(1-98500*1.005/99000)/.1,0]],'blue','point'),
      series('At 1%: B is worth HK$91.04 less',[[1,advantage(1)]],'rust','point')
    ])];
  }

  const models = {'market-prices':marketPrices,'demand-elasticity':demand,'project-appraisal':project,
    'budget-line':budgetLine,'risk-insurance':insurance,'state-prices':statePrices,'adverse-selection':selection,'dealer-pricing':dealer,
    'bank-liquidity':bank,'real-returns':returns,'business-cycle-shocks':shocks,'policy-transmission':covenant,
    'hong-kong-exchange-rate':currency,'market-risk':marketRisk,'beta-estimate':betaEstimate,'sale-cash':sale,'terminal-growth':growth,'yield-sensitivity':yields,'loan-screening':loanScreen,'loan-effort':effort,'debt-waterfall':debtEquity,'rollover-gap':rollover,'plant-capacity':capacity,'tariff-burden':tariff,'supplier-switch':switching,'ipo-allocation':allocation,'platform-matches':platforms,'payment-value':payments};
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
    const tickLabels = spec.tickLabels || labels[key];
    const left=55, right=width-(tickLabels ? 38 : 25), top=36, bottom=height-54;
    const xMin=xTicks[0], xMax=xTicks.at(-1), yMin=yTicks[0], yMax=yTicks.at(-1);
    const x=n=>left+(n-xMin)*(right-left)/(xMax-xMin);
    const y=n=>bottom-(n-yMin)*(bottom-top)/(yMax-yMin);
    ctx.font='12px system-ui';
    ctx.fillStyle='#19372c';
    ctx.fillText(yTitle,8,17,width-16);
    ctx.textAlign='center';
    ctx.fillText(xTitle,(left+right)/2,height-9,width-16);
    for (const n of xTicks) ctx.fillText(tickLabels?.[n] ?? format(n),x(n),bottom+20,tickLabels ? (right-left)/(xTicks.length-1)+8 : width);
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
      symbol.textContent=({point:'●',open:'○',dashed:'┄',line:'━',segment:'◆',bar:'▮',highlight:'━'})[line.style];
      item.append(symbol,line.name);
      legend.append(item);
      ctx.strokeStyle=ctx.fillStyle=colors[line.color];
      ctx.lineWidth=2.2;
      ctx.setLineDash(line.style==='dashed'?[6,4]:[]);
      if (line.style === 'bar') {
        const barWidth = Math.min(32,(right-left)/(xTicks.length-1)*.19);
        for (const [xx,yy,base = line.base] of line.points) {
          const start = y(base), end = y(yy);
          ctx.fillRect(x(xx+line.offset)-barWidth/2,Math.min(start,end),barWidth,Math.abs(start-end));
        }
      }
      if (['line','dashed','segment','highlight'].includes(line.style)) {
        if (line.style === 'highlight') ctx.lineWidth=5;
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
