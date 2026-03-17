/* ===================================================
   Matheus AI — Animação 1: ClaudIA em Ação
   =================================================== */

(function initClaudiaDemo() {

  /* ---- DOM REFERENCES ---- */
  var chatBody        = document.getElementById('claudia-chat-body');
  var inputText       = document.getElementById('claudia-input-text');
  var inputCursor     = document.getElementById('claudia-input-cursor');
  var sendBtn         = document.getElementById('claudia-send-btn');

  if (!chatBody || !inputText || !inputCursor || !sendBtn) return;

  /* ---- DATA ---- */
  var BAR_HEIGHTS = ['55%','80%','40%','70%','90%','60%','75%'];

  var CONVERSATIONS = [
    {
      user: 'ClaudIA, quais são as métricas de hoje?',
      botText: 'Aqui estão as métricas de hoje:',
      botData: [
        { label: 'Installs',   value: '4.392',   cls: 'claudia-data-value-green' },
        { label: 'CPA Médio',  value: 'R$ 18,40', cls: 'claudia-data-value-blue' },
        { label: 'ROAS',       value: '3.2x',     cls: 'claudia-data-value-green' },
        { label: 'Churn',      value: '2.1%',     cls: 'claudia-data-value-orange' }
      ],
      chart: true
    },
    {
      user: 'Compare esta semana com a anterior.',
      botText: 'Comparativo da semana:',
      botData: [
        { label: 'Installs (+12%)',   value: '4.392 vs 3.922', cls: 'claudia-data-value-green' },
        { label: 'Receita (+8%)',     value: 'R$ 82k vs R$ 76k', cls: 'claudia-data-value-green' },
        { label: 'CPA (-5%)',         value: 'R$ 18,40 vs R$ 19,30', cls: 'claudia-data-value-blue' }
      ],
      chart: false
    },
    {
      user: 'Qual campanha tem melhor ROAS?',
      botText: 'Top 3 campanhas por ROAS:',
      botData: [
        { label: '1. Brand Search',    value: 'ROAS 5.1x', cls: 'claudia-data-value-green' },
        { label: '2. Remarketing',     value: 'ROAS 4.3x', cls: 'claudia-data-value-blue' },
        { label: '3. App Install iOS', value: 'ROAS 3.8x', cls: 'claudia-data-value-orange' }
      ],
      chart: false
    }
  ];

  var timers     = [];
  var convIndex  = 0;

  /* ---- HELPERS ---- */
  function clearTimers() {
    timers.forEach(function(t) { clearTimeout(t); });
    timers = [];
  }

  function delay(fn, ms) {
    var t = setTimeout(fn, ms);
    timers.push(t);
  }

  function scrollBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function clearChat() {
    chatBody.innerHTML = '';
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
        delay(next, 45 + Math.random() * 30);
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

  /* ---- MESSAGE BUILDERS ---- */
  function addTimestamp() {
    var el = document.createElement('div');
    el.className = 'claudia-timestamp';
    el.textContent = 'Hoje · ' + getCurrentTime();
    chatBody.appendChild(el);
    scrollBottom();
  }

  function getCurrentTime() {
    var d = new Date();
    var h = String(d.getHours()).padStart(2,'0');
    var m = String(d.getMinutes()).padStart(2,'0');
    return h + ':' + m;
  }

  function addUserMessage(text) {
    var wrap = document.createElement('div');
    wrap.className = 'claudia-msg claudia-msg-user';

    var bubble = document.createElement('div');
    bubble.className = 'claudia-bubble';
    bubble.textContent = text;

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

    bubble.appendChild(card);

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
    addTimestamp();
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

      /* Small gap between exchanges */
      delay(function() {
        runConversation(conv);
        /* Schedule next conversation */
        delay(nextConv, 5800);
      }, convIndex === 1 ? 600 : 0);
    }

    nextConv();
  }

  /* ---- INTERSECTION OBSERVER — only run when visible ---- */
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
