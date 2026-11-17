(() => {
  const lab = document.querySelector('[data-finance-lab]');
  if (!lab) return;
  const comparison = lab.querySelector('.lab-comparison');
  const type = lab.dataset.financeLab;
  const inputs = [...lab.querySelectorAll('input, select')];
  const output = lab.querySelector('.scenario-result');
  const headline = lab.querySelector('.lab-headline');
  const visual = lab.querySelector('.lab-visual');
  const hkd = new Intl.NumberFormat('en-HK', { maximumFractionDigits: 2 });
  const number = value => hkd.format(Math.abs(value));
  const valueOf = id => lab.querySelector('#' + id).textContent.trim();

  function rows() {
    if (output) {
      return [...output.querySelectorAll('tr')].map(row => [...row.cells].map(cell => cell.textContent.trim()));
    }
    if (type === 'state-prices') {
      return [['Recession payout', valueOf('recession-payment')], ['Expansion payout', valueOf('expansion-payment')], ['Price today', valueOf('claim-price')]];
    }
    if (type === 'portfolio-choice') {
      return valueOf('mix').replace(/\.$/, '').split(' · ').filter(Boolean).map(item => {
        const split = item.lastIndexOf(' ');
        return [item.slice(0, split), item.slice(split + 1)];
      });
    }
    const metrics = [...lab.querySelectorAll('.metric')].map(metric => [metric.querySelector('span').textContent, metric.querySelector('b').textContent]);
    if (type === 'dealer-pricing') metrics.push(['Order history', valueOf('history').replace(/^Order history · /, '')]);
    return metrics;
  }

  function snapshot() {
    return [
      ...inputs.map(field => [
        field.closest('label').firstChild.textContent.trim().replace(/ ·$/, ''),
        field.selectedOptions?.[0]?.textContent || field.value
      ]),
      ...rows()
    ];
  }

  function difference(before, after) {
    const parse = text => text.replaceAll(',', '').match(/^(HK\$|US\$)?([+-]?\d+(?:\.\d+)?)(%|×)?$/);
    const a = parse(before), b = parse(after);
    if (!a || !b || a[1] !== b[1] || a[3] !== b[3]) return '—';
    const delta = Number(b[2]) - Number(a[2]);
    if (Math.abs(delta) < 1e-8) return '0';
    return (delta < 0 ? '−' : '+') + (a[1] || '') + number(delta) + (a[3] === '%' ? ' pp' : a[3] || '');
  }

  function setVisual(text, main) {
    headline.textContent = text;
    visual.replaceChildren(main);
  }

  function pricing() {
    const [price, renewals] = inputs.map(input => Number(input.value));
    if (!inputs[1].validity.valid || !inputs[1].value) return;
    const margin = price - 40;
    const breakEven = Math.ceil(60000 / margin);
    const change = margin * renewals - 60000;
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 260;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Monthly contribution reaches HK$60,000 at ' + breakEven + ' renewals. The selected scenario has ' + renewals + ' renewals.');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const left = Math.max(0, Math.min(renewals, breakEven) - 50);
    const right = Math.max(renewals, breakEven) + 50;
    const span = Math.max(60000 - left * margin, right * margin - 60000);
    const x = n => 94 + (n - left) * 512 / (right - left);
    const y = contribution => 118 - (contribution - 60000) * 74 / span;
    function line(ax, ay, bx, by, color, dash = []) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash(dash);
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }
    ctx.font = '20px system-ui';
    ctx.fillStyle = '#19372c';
    ctx.fillText('Monthly contribution (HK$)', 16, 27);
    ctx.fillText('60,000', 14, 124);
    line(94, 118, 606, 118, '#805729', [7, 5]);
    line(x(left), y(left * margin), x(right), y(right * margin), '#216249');
    ctx.fillText(String(left), 94, 228);
    ctx.textAlign = 'right';
    ctx.fillText(String(right), 606, 228);
    ctx.textAlign = 'center';
    ctx.fillText('Renewals', 350, 253);
    ctx.beginPath();
    ctx.arc(x(renewals), y(renewals * margin), 7, 0, Math.PI * 2);
    ctx.fill();
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.textContent = 'Solid line: contribution at HK$' + price + '. Dashed line: current plan. Dot: selected renewals. Minimum to match or beat current contribution: ' + breakEven + '.';
    figure.append(canvas, caption);
    setVisual(change === 0 ? 'Monthly contribution matches the current plan.' : 'Monthly contribution ' + (change > 0 ? 'rises' : 'falls') + ' by HK$' + number(change) + '.', figure);
  }

  function hedge() {
    const forward = Number(inputs[0].value);
    const timing = inputs[1].value;
    const receipt = timing === 'On time' ? 300000 : 0;
    const gap = 1000000 - forward - receipt;
    const timeline = document.createElement('ol');
    timeline.className = 'lab-timeline';
    const dates = [
      ['Today', 'Book US$' + number(forward) + ' forward'],
      ['Day 90', 'Pay US$1,000,000. Receive US$' + number(forward) + ' from the forward and US$' + number(receipt) + ' from the customer.'],
      ['Day 97', timing === 'One week late' ? 'Receive US$300,000 from the customer.' : timing === 'Cancelled' ? 'Customer receipt cancelled.' : 'Customer receipt already settled.']
    ];
    for (const [date, event] of dates) {
      const item = document.createElement('li');
      const label = document.createElement('strong');
      label.textContent = date;
      item.append(label, event);
      timeline.append(item);
    }
    setVisual(gap === 0 ? 'The day 90 invoice is fully covered.' : 'Day 90 ' + (gap > 0 ? 'funding gap' : 'surplus') + ': US$' + number(gap) + '.', timeline);
  }

  function covenant(results) {
    const value = Number(results.find(([label]) => label === 'Coverage')?.[1].replace('×', ''));
    if (!Number.isFinite(value)) return;
    const track = document.createElement('div');
    const marker = document.createElement('span');
    const limit = document.createElement('span');
    const scale = Math.max(3, value);
    track.className = 'lab-limit';
    marker.className = 'lab-marker';
    limit.className = 'lab-boundary';
    marker.style.left = Math.min(99, value * 100 / scale) + '%';
    limit.style.left = 200 / scale + '%';
    track.setAttribute('role', 'img');
    track.setAttribute('aria-label', value.toFixed(3) + ' times coverage. Covenant boundary at 2 times.');
    track.append(marker, limit);
    const caption = document.createElement('p');
    caption.textContent = 'Dot: ' + value.toFixed(3) + '× coverage. Line: 2.000× minimum.';
    const chart = document.createElement('div');
    chart.append(track, caption);
    setVisual(value === 2 ? 'At the covenant minimum. No headroom.' : value < 2 ? 'Below the covenant minimum.' : 'Above the covenant minimum.', chart);
  }

  let kept;
  let keptLabel = 'Starting scenario';
  const table = comparison.querySelector('table');

  function refresh() {
    if (inputs.some(field => !field.validity.valid)) return;
    const current = snapshot();
    if (!kept) {
      kept = current;
      if (type === 'demand-elasticity') kept = [['Monthly price (HK$)', '100'], ['Renewals', '1000'], ['Monthly sales', 'HK$100,000.00'], ['Monthly contribution', 'HK$60,000.00'], ['Change in contribution', 'HK$0.00']];
    }
    if (type === 'demand-elasticity') pricing();
    if (type === 'currency-hedging') hedge();
    if (type === 'policy-transmission') covenant(current);
    const old = new Map(kept);
    table.tHead.rows[0].cells[1].textContent = keptLabel;
    table.tBodies[0].replaceChildren();
    for (const [label, now] of current) {
      const before = old.get(label) ?? '—';
      const row = table.tBodies[0].insertRow();
      const heading = document.createElement('th');
      heading.scope = 'row';
      heading.textContent = label;
      row.append(heading);
      for (const cell of [before, now, difference(before, now)]) row.insertCell().textContent = cell;
    }
  }

  comparison.querySelector('button').addEventListener('click', () => {
    if (inputs.some(field => !field.validity.valid)) return;
    kept = snapshot();
    keptLabel = 'Kept scenario';
    comparison.querySelector('[role="status"]').textContent = 'Scenario saved. Change a setting to compare.';
    refresh();
  });
  const reset = lab.querySelector('.lab-reset');
  if (reset) {
    const defaults = inputs.map(field => field.value);
    reset.addEventListener('click', () => {
      for (const [index, field] of inputs.entries()) field.value = defaults[index];
      lab.querySelector('#reset')?.click();
      for (const field of inputs) {
        field.dispatchEvent(new Event(field.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
      }
    });
  }
  lab.addEventListener('input', () => requestAnimationFrame(refresh));
  lab.addEventListener('change', () => requestAnimationFrame(refresh));
  lab.addEventListener('reset', () => requestAnimationFrame(refresh));
  lab.addEventListener('click', event => {
    if (event.target.closest('.buttons button, .lab-reset')) requestAnimationFrame(refresh);
  });
  refresh();
})();
