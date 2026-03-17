/* ===================================================
   Matheus AI — Animação 2: Alertas Inteligentes
   =================================================== */

(function initAlertsDemo() {

  /* ---- DOM REFERENCES ---- */
  var alertsList    = document.getElementById('alerts-list');
  var footerCount   = document.getElementById('alerts-footer-count');
  var summaryRed    = document.getElementById('alerts-sum-red');
  var summaryYellow = document.getElementById('alerts-sum-yellow');
  var summaryBlue   = document.getElementById('alerts-sum-blue');

  if (!alertsList) return;

  /* ---- SVG ICONS ---- */
  var ICONS = {
    critical: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    warning:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    info:     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    success:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
  };

  /* ---- ALERT DATA ---- */
  var ALERTS_POOL = [
    {
      type: 'critical',
      title: 'CPA acima da meta',
      desc: 'CPA ultrapassou R$ 20 — atual: R$ 23,50 na campanha iOS',
      badge: 'CRÍTICO'
    },
    {
      type: 'warning',
      title: 'Taxa de conversão caindo',
      desc: 'Conversão da loja App Store caiu 14% nas últimas 3h',
      badge: 'ATENÇÃO'
    },
    {
      type: 'info',
      title: 'Relatório semanal pronto',
      desc: 'Resumo de desempenho da semana disponível para revisão',
      badge: 'INFO'
    },
    {
      type: 'success',
      title: 'Meta de installs atingida',
      desc: 'Campanha Android superou 5.000 installs — meta do dia',
      badge: 'SUCESSO'
    },
    {
      type: 'warning',
      title: 'Orçamento 80% consumido',
      desc: 'Google Ads — campanha "Remarketing Q2" com alto gasto',
      badge: 'ATENÇÃO'
    },
    {
      type: 'info',
      title: 'Nova integração ativa',
      desc: 'DataRank sincronizado — dados de ASO atualizados',
      badge: 'INFO'
    },
    {
      type: 'critical',
      title: 'Queda no Rating da App Store',
      desc: 'Rating caiu de 4.7 para 4.2 — 8 avaliações negativas hoje',
      badge: 'CRÍTICO'
    },
    {
      type: 'success',
      title: 'ROAS acima da meta',
      desc: 'ROAS da campanha de vídeo atingiu 4.1x — acima de 3.5x',
      badge: 'SUCESSO'
    },
    {
      type: 'warning',
      title: 'Latência de API elevada',
      desc: 'Webhook do RankMyApp com 2.4s de delay — monitorando',
      badge: 'ATENÇÃO'
    },
    {
      type: 'info',
      title: 'Pico de tráfego detectado',
      desc: '+340% de sessões orgânicas — possível viral nas redes',
      badge: 'INFO'
    }
  ];

  /* ---- STATE ---- */
  var shownAlerts  = [];
  var poolIndex    = 0;
  var totalShown   = 0;
  var counts       = { critical: 0, warning: 0, info: 0 };
  var MAX_VISIBLE  = 4;
  var timers       = [];

  /* ---- HELPERS ---- */
  function clearTimers() {
    timers.forEach(function(t) { clearTimeout(t); });
    timers = [];
  }

  function delay(fn, ms) {
    var t = setTimeout(fn, ms);
    timers.push(t);
    return t;
  }

  function relativeTime(secsAgo) {
    if (secsAgo < 10) return 'agora';
    if (secsAgo < 60) return secsAgo + 's atrás';
    return Math.floor(secsAgo / 60) + 'min atrás';
  }

  function updateSummary() {
    if (summaryRed)    summaryRed.textContent    = counts.critical;
    if (summaryYellow) summaryYellow.textContent = counts.warning;
    if (summaryBlue)   summaryBlue.textContent   = counts.info;
    if (footerCount)   footerCount.textContent   = totalShown + ' alertas disparados';
  }

  /* ---- BUILD ALERT ELEMENT ---- */
  function buildAlertEl(alertData, secsAgo) {
    var item = document.createElement('div');
    item.className = 'alert-item alert-item-' + alertData.type;

    /* Icon */
    var iconWrap = document.createElement('div');
    iconWrap.className = 'alert-icon alert-icon-' + alertData.type;
    iconWrap.innerHTML = ICONS[alertData.type] || ICONS.info;

    /* Content */
    var content = document.createElement('div');
    content.className = 'alert-content';

    var top = document.createElement('div');
    top.className = 'alert-content-top';

    var title = document.createElement('span');
    title.className = 'alert-title';
    title.textContent = alertData.title;

    var badge = document.createElement('span');
    badge.className = 'alert-badge alert-badge-' + alertData.type;
    badge.textContent = alertData.badge;

    var time = document.createElement('span');
    time.className = 'alert-time';
    time.textContent = relativeTime(secsAgo);

    top.appendChild(title);
    top.appendChild(badge);

    var desc = document.createElement('div');
    desc.className = 'alert-desc';
    desc.textContent = alertData.desc;

    var bottom = document.createElement('div');
    bottom.style.marginTop = '4px';
    bottom.appendChild(time);

    content.appendChild(top);
    content.appendChild(desc);
    content.appendChild(bottom);

    item.appendChild(iconWrap);
    item.appendChild(content);

    return item;
  }

  /* ---- ADD ALERT ---- */
  function addAlert() {
    var data = ALERTS_POOL[poolIndex % ALERTS_POOL.length];
    poolIndex++;
    totalShown++;

    /* Update counts */
    if (data.type === 'critical') counts.critical++;
    else if (data.type === 'warning') counts.warning++;
    else if (data.type === 'info') counts.info++;

    updateSummary();

    /* Build and prepend */
    var el = buildAlertEl(data, 0);
    alertsList.insertBefore(el, alertsList.firstChild);
    shownAlerts.unshift(el);

    /* Trim to max visible */
    if (shownAlerts.length > MAX_VISIBLE) {
      var old = shownAlerts.pop();
      /* Fade out smoothly */
      old.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      old.style.opacity = '0';
      old.style.transform = 'translateX(16px)';
      delay(function() {
        if (old.parentNode) old.parentNode.removeChild(old);
      }, 450);
    }

    /* Update relative timestamps over time */
    updateTimestamps();
  }

  /* ---- UPDATE TIMESTAMPS ---- */
  var secondsElapsed = 0;

  function updateTimestamps() {
    var timeEls = alertsList.querySelectorAll('.alert-time');
    timeEls.forEach(function(el, i) {
      var secs = i * 8 + secondsElapsed % 8;
      el.textContent = relativeTime(secs);
    });
  }

  /* ---- CYCLE ---- */
  var INTERVALS = [2200, 3000, 2600, 3400, 2800, 2000, 3200, 2500, 3000, 2700];
  var cycleStep = 0;

  function scheduleNext() {
    var ms = INTERVALS[cycleStep % INTERVALS.length];
    cycleStep++;
    secondsElapsed += Math.round(ms / 1000);
    delay(function() {
      addAlert();
      scheduleNext();
    }, ms);
  }

  /* ---- RESET ---- */
  function reset() {
    clearTimers();
    alertsList.innerHTML = '';
    shownAlerts = [];
    poolIndex = 0;
    totalShown = 0;
    counts = { critical: 0, warning: 0, info: 0 };
    cycleStep = 0;
    secondsElapsed = 0;
    updateSummary();
  }

  /* ---- INIT ---- */
  function start() {
    reset();

    /* Seed a couple of initial alerts immediately */
    addAlert();
    delay(function() { addAlert(); }, 700);
    delay(function() { addAlert(); }, 1400);

    /* Then keep adding on interval */
    delay(scheduleNext, 2500);
  }

  /* ---- INTERSECTION OBSERVER ---- */
  var started = false;

  function lazyStart() {
    if (started) return;
    started = true;
    start();
  }

  var section = document.getElementById('alerts-demo');
  if (!section) { lazyStart(); return; }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        lazyStart();
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(section);
  } else {
    lazyStart();
  }

})();
