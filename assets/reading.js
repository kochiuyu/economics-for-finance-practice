(() => {
  const openRoute = () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target instanceof HTMLDetailsElement) target.open = true;
  };
  openRoute();
  window.addEventListener('hashchange', openRoute);
  const chapter = location.pathname.match(/\/chapters\/([^/]+)\.html$/)?.[1] ||
    location.pathname.match(/\/cases\/(shenzhen-evidence)\.html$/)?.[1];
  if (!chapter) return;
  const lessonURL = new URL(location.href);
  const mapURL = new URL('../curriculum.html', lessonURL);
  function anchor(label, href) {
    const a = document.createElement('a');
    a.textContent = label;
    a.href = href;
    return a;
  }
  async function showRoute() {
    const response = await fetch(mapURL);
    if (!response.ok) return;
    const map = new DOMParser().parseFromString(await response.text(), 'text/html');
    const routes = [...map.querySelectorAll('[data-route-name]')].filter(r =>
      [...r.querySelectorAll('[data-lesson]')].some(a => a.dataset.lesson === chapter));
    const active = routes.find(r => r.id === lessonURL.searchParams.get('route'));
    const old = document.querySelector('nav.route-nav');
    const top = document.createElement('nav');
    top.className = 'reading-context';
    top.setAttribute('aria-label', 'Reading route');
    if (!active) {
      const group = [...map.querySelectorAll('.topic-group')].find(g =>
        [...g.querySelectorAll('a')].some(a => a.dataset.lesson === chapter));
      if (!group) return;
      top.append(group.querySelector('summary').textContent);
      for (const route of routes) {
        const url = new URL(lessonURL);
        url.searchParams.set('route', route.id);
        top.append(anchor(route.dataset.routeName, url));
      }
      old?.remove();
    } else {
      const steps = [...active.querySelectorAll('[data-lesson]')];
      const i = steps.findIndex(a => a.dataset.lesson === chapter);
      mapURL.hash = active.id;
      const full = active.id === 'full-course';
      top.append(active.dataset.routeName+' · '+(full ? 'Step ' : 'Lesson ')+(i+1)+' of '+steps.length,
        anchor(full ? 'View full sequence' : 'View route',mapURL));
      const bottom = document.createElement('nav');
      bottom.className = 'route-nav';
      bottom.setAttribute('aria-label','Continue reading');
      const links = document.createElement('div');
      for (const [index,label,rel] of [[i-1,'Previous','prev'],[i+1,'Next','next']]) {
        const step = steps[index];
        if (!step) continue;
        const a = anchor(label+' · '+step.textContent,new URL(step.getAttribute('href'),mapURL));
        a.rel = rel;
        links.append(a);
      }
      links.append(anchor('Return to '+active.dataset.routeName,mapURL));
      bottom.append(links);
      if (old) old.replaceWith(bottom); else document.querySelector('main').append(bottom);
    }
    document.querySelector('.pagehead').after(top);
    const panel = document.querySelector('section.panel');
    const target = panel?.id || panel?.querySelector('[id]')?.id;
    if (target) top.append(anchor('Jump to lab','#'+target));
  }
  showRoute().catch(() => {});
})();