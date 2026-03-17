/* ===================================================
   WatchTower.AI — Animação 1: ClaudIA em Ação
   Premium WhatsApp Pro Design
   =================================================== */

(function initClaudiaDemo() {

  /* ---- DOM REFERENCES ---- */
  var chatBody    = document.getElementById('claudia-chat-body');
  var inputText   = document.getElementById('claudia-input-text');
  var inputCursor = document.getElementById('claudia-input-cursor');
  var sendBtn     = document.getElementById('claudia-send-btn');

  if (!chatBody || !inputText || !inputCursor || !sendBtn) return;

  /* ---- DATA ---- */
  var BAR_HEIGHTS = ['55%','80%','40%','70%','90%','60%','75%'];

  var CONVERSATIONS = [
    {
      user: 'Qual meu ROAS de hoje?',
      botText: 'Seu ROAS hoje está em:',
      botData: [
        { label: 'ROAS Geral',        value: '3.2x',     cls: 'claudia-data-value-green' },
        { label: 'Brand Search',      value: '5.1x',     cls: 'claudia-data-value-green' },
        { label: 'Remarketing',       value: '4.3x',     cls: 'claudia-data-value-blue' },
        { label: 'App Install iOS',   value: '2.8x',     cls: 'claudia-data-value-orange' }
      ],
      chart: true
    },
    {
      user: 'E o CPA das últimas 24h?',
      botText: 'CPA nas últimas 24 horas:',
      botData: [
        { label: 'CPA Médio',         value: 'R$ 18,40', cls: 'claudia-data-value-blue' },
        { label: 'Meta',              value: 'R$ 20,00', cls: 'claudia-data-value-green' },
        { label: 'Variação (7d)',      value: '−5.1%',   cls: 'claudia-data-value-green' },
        { label: 'Installs',          value: '4.392',    cls: 'claudia-data-value-blue' }
      ],
      chart: false
    },
    {
      user: 'Qual campanha performa melhor?',
      botText: 'Top 3 campanhas por ROAS:',
      botData: [
        { label: '1. Brand Search',    value: 'ROAS 5.1x', cls: 'claudia-data-value-green' },
        { label: '2. Remarketing',     value: 'ROAS 4.3x', cls: 'claudia-data-value-blue' },
        { label: '3. App Install iOS', value: 'ROAS 2.8x', cls: 'claudia-data-value-orange' }
      ],
      chart: false
    }
  ];

  var timers    = [];
  var convIndex = 0;

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

  function scrollBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function clearChat() {
    chatBody.innerHTML = '';
  }

  function getCurrentTime() {
    var d = new Date();
    var h = String(d.getHours()).padStart(2, '0');
    var m = String(d.getMinutes()).padStart(2, '0');
    return h + ':' + m;
  }

  /* ---- INPUT TYPING SIMULATION ---- */
  function typeInInput(text, doneCb) {
    inputText.textContent = '';
    inputCursor.classList.add('active');
    var i = 0;
    function next() {
      if (i < text.length) {
        inputText.textContent += text[i];
        i++;
        delay(next, 42 + Math.random() * 28);
      } else {
        if (doneCb) doneCb();
      }
    }
    next();
  }

  function clearInput() {
    inputText.textContent = '';
    inputCursor.classList.remove('active');
  }

  /* ---- CHECKMARK SVG ---- */
  function buildCheckSvg() {
    var check = document.createElement('span');
    check.className = 'claudia-bubble-check';
    check.setAttribute('aria-hidden', 'true');
    check.innerHTML =
      '<svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.033l6.272-8.048a.366.366 0 0 0-.064-.51zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.516.031l-.423.48a.418.418 0 0 0 .025.546l3.098 2.781a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.064-.51z" fill="currentColor"/>' +
      '</svg>';
    return check;
  }

  /* ---- MESSAGE BUILDERS ---- */
  function addTimestampChip() {
    var el = document.createElement('div');
    el.className = 'claudia-timestamp';
    el.textContent = 'Hoje';
    chatBody.appendChild(el);
    scrollBottom();
  }

  function addUserMessage(text) {
    var wrap = document.createElement('div');
    wrap.className = 'claudia-msg claudia-msg-user';

    var bubble = document.createElement('div');
    bubble.className = 'claudia-bubble';

    var textEl = document.createElement('span');
    textEl.textContent = text;
    bubble.appendChild(textEl);

    var footer = document.createElement('div');
    footer.className = 'claudia-bubble-footer';

    var time = document.createElement('span');
    time.className = 'claudia-bubble-time';
    time.textContent = getCurrentTime();

    footer.appendChild(time);
    footer.appendChild(buildCheckSvg());
    bubble.appendChild(footer);

    wrap.appendChild(bubble);
    chatBody.appendChild(wrap);
    scrollBottom();
  }

  function addTypingIndicator() {
    var wrap = document.createElement('div');
    wrap.className = 'claudia-typing';
    wrap.id = 'claudia-typing-indicator';

    var avatar = document.createElement('div');
    avatar.className = 'claudia-typing-avatar';
    avatar.textContent = 'C';

    var bubble = document.createElement('div');
    bubble.className = 'claudia-typing-bubble';

    for (var j = 0; j < 3; j++) {
      var dot = document.createElement('span');
      dot.className = 'claudia-typing-dot';
      bubble.appendChild(dot);
    }

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    chatBody.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function removeTypingIndicator() {
    var el = document.getElementById('claudia-typing-indicator');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function addBotMessage(conv) {
    var wrap = document.createElement('div');
    wrap.className = 'claudia-msg claudia-msg-bot';

    var avatar = document.createElement('div');
    avatar.className = 'claudia-msg-avatar';
    avatar.textContent = 'C';

    var bubble = document.createElement('div');
    bubble.className = 'claudia-bubble';

    var p = document.createElement('p');
    p.textContent = conv.botText;
    bubble.appendChild(p);

    /* Data card */
    var card = document.createElement('div');
    card.className = 'claudia-data-card';

    conv.botData.forEach(function(row) {
      var rowEl = document.createElement('div');
      rowEl.className = 'claudia-data-row';

      var lbl = document.createElement('span');
      lbl.className = 'claudia-data-label';
      lbl.textContent = row.label;

      var val = document.createElement('span');
      val.className = 'claudia-data-value ' + row.cls;
      val.textContent = row.value;

      rowEl.appendChild(lbl);
      rowEl.appendChild(val);
      card.appendChild(rowEl);
    });

    /* Mini chart */
    if (conv.chart) {
      var chart = document.createElement('div');
      chart.className = 'claudia-mini-chart';

      BAR_HEIGHTS.forEach(function(h, idx) {
        var bar = document.createElement('div');
        bar.className = 'claudia-bar';
        bar.style.height = h;
        bar.style.animationDelay = (idx * 0.06) + 's';
        chart.appendChild(bar);
      });

      card.appendChild(chart);
    }

    bubble.appendChild(card);

    /* Bubble footer with time */
    var footer = document.createElement('div');
    footer.className = 'claudia-bubble-footer';
    var time = document.createElement('span');
    time.className = 'claudia-bubble-time';
    time.textContent = getCurrentTime();
    footer.appendChild(time);
    bubble.appendChild(footer);

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    chatBody.appendChild(wrap);
    scrollBottom();
  }

  /* ---- CYCLE ---- */
  function runConversation(conv) {
    /* 1. Type question into input */
    typeInInput(conv.user, function() {

      /* 2. Flash send button, clear input */
      delay(function() {
        sendBtn.classList.add('sending');
        delay(function() { sendBtn.classList.remove('sending'); }, 350);
        clearInput();

        /* 3. Append user message bubble */
        addUserMessage(conv.user);

        /* 4. Show typing indicator */
        delay(function() {
          addTypingIndicator();

          /* 5. Replace with bot response */
          delay(function() {
            removeTypingIndicator();
            addBotMessage(conv);
          }, 1400);

        }, 300);

      }, 400);
    });
  }

  function startLoop() {
    clearChat();
    addTimestampChip();
    convIndex = 0;

    function nextConv() {
      if (convIndex >= CONVERSATIONS.length) {
        /* Pause then restart */
        delay(function() {
          startLoop();
        }, 3000);
        return;
      }

      var conv = CONVERSATIONS[convIndex];
      convIndex++;

      delay(function() {
        runConversation(conv);
        /* Schedule next conversation */
        delay(nextConv, 5800);
      }, convIndex === 1 ? 600 : 0);
    }

    nextConv();
  }

  /* ---- INTERSECTION OBSERVER ---- */
  var started = false;

  function start() {
    if (started) return;
    started = true;
    startLoop();
  }

  var section = document.getElementById('claudia-demo');
  if (!section) { start(); return; }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        start();
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(section);
  } else {
    start();
  }

})();
