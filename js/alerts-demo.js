/* ===================================================
   WatchTower.AI — Alertas: WhatsApp Chat Animation
   Premium WhatsApp Pro Design
   =================================================== */

(function initAlertsChatDemo() {

  /* ---- CONFIG ---- */
  var TYPING_DURATION = 1500;
  var MSG_PAUSE       = 2500;
  var RESTART_PAUSE   = 3500;

  /* ---- TIMESTAMPS ---- */
  var BASE_HOUR   = 14;
  var BASE_MINUTE = 30;

  function nextTimestamp() {
    BASE_MINUTE += 1;
    if (BASE_MINUTE >= 60) { BASE_MINUTE = 0; BASE_HOUR = (BASE_HOUR + 1) % 24; }
    var h = String(BASE_HOUR).padStart(2, '0');
    var m = String(BASE_MINUTE).padStart(2, '0');
    return h + ':' + m;
  }

  function resetTimestamps() {
    BASE_HOUR   = 14;
    BASE_MINUTE = 30;
  }

  /* ---- MESSAGES ----
     type: 'bot' = WatchTower (left bubble)
     type: 'user' = user reply (right bubble)
  ---- */
  var MESSAGES = [
    {
      type: 'bot',
      lines: [
        { bold: false, text: '\uD83D\uDEA8 ' },
        { bold: true,  text: 'Alerta Cr\u00edtico' },
        { bold: false, text: ' \u2014 Seu CPA ultrapassou R$ 20!\nAgora em ' },
        { bold: true,  text: 'R$ 22,15' },
        { bold: false, text: '. A\u00e7\u00e3o necess\u00e1ria.' }
      ]
    },
    {
      type: 'bot',
      lines: [
        { bold: false, text: '\uD83D\uDCCA ROAS caiu para ' },
        { bold: true,  text: '1.8x' },
        { bold: false, text: ' (meta: 3x).\nCampanha: Black Friday 2025.\n\n\u2022 Impress\u00f5es: 45.2k\n\u2022 Cliques: 1.847\n\u2022 Invest.: R$ 3.200' }
      ]
    },
    {
      type: 'user',
      lines: [
        { bold: false, text: 'Como resolvo isso?' }
      ]
    },
    {
      type: 'bot',
      lines: [
        { bold: true, text: '\uD83D\uDCA1 Sugest\u00f5es imediatas:' },
        { bold: false, text: '\n\n1. Pause criativos com CTR < 1%\n2. Reduza lance em 15%\n3. Exclua audi\u00eancias com CPA > R$ 25\n\nDeseja que eu aplique essas a\u00e7\u00f5es?' }
      ]
    }
  ];

  /* ---- STATE ---- */
  var timers   = [];
  var started  = false;
  var chatBody = null;

  /* ---- HELPERS ---- */
  function t(fn, ms) {
    var id = setTimeout(fn, ms);
    timers.push(id);
    return id;
  }

  function clearTimers() {
    timers.forEach(function(id) { clearTimeout(id); });
    timers = [];
  }

  /* ---- CHECKMARK SVG ---- */
  function buildCheckSvg() {
    var check = document.createElement('span');
    check.className = 'wa-bubble-check';
    check.setAttribute('aria-hidden', 'true');
    check.innerHTML =
      '<svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.033l6.272-8.048a.366.366 0 0 0-.064-.51zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.516.031l-.423.48a.418.418 0 0 0 .025.546l3.098 2.781a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.064-.51z" fill="currentColor"/>' +
      '</svg>';
    return check;
  }

  /* ---- BUILD DATE CHIP ---- */
  function buildDateChip() {
    var chip = document.createElement('div');
    chip.className = 'wa-date-chip';
    chip.textContent = 'Hoje';
    return chip;
  }

  /* ---- BUILD TYPING INDICATOR ---- */
  function buildTypingIndicator() {
    var wrap = document.createElement('div');
    wrap.className = 'wa-typing';

    var bubble = document.createElement('div');
    bubble.className = 'wa-typing-bubble';

    for (var i = 0; i < 3; i++) {
      var dot = document.createElement('span');
      dot.className = 'wa-dot';
      bubble.appendChild(dot);
    }

    wrap.appendChild(bubble);
    return wrap;
  }

  /* ---- BUILD MESSAGE ---- */
  function buildMessage(msgData, timestamp) {
    var isUser = msgData.type === 'user';

    var wrap = document.createElement('div');
    wrap.className = isUser ? 'wa-msg wa-msg-user' : 'wa-msg';

    var bubble = document.createElement('div');
    bubble.className = isUser ? 'wa-bubble-user' : 'wa-bubble';

    /* Text content */
    var textEl = document.createElement('div');
    textEl.className = 'wa-bubble-text';

    msgData.lines.forEach(function(segment) {
      if (segment.bold) {
        var strong = document.createElement('strong');
        strong.textContent = segment.text;
        textEl.appendChild(strong);
      } else {
        textEl.appendChild(document.createTextNode(segment.text));
      }
    });

    /* Meta (time + checkmarks) */
    var meta = document.createElement('div');
    meta.className = 'wa-bubble-meta';

    var timeEl = document.createElement('span');
    timeEl.className = 'wa-bubble-time';
    timeEl.textContent = timestamp;

    meta.appendChild(timeEl);
    if (isUser) {
      meta.appendChild(buildCheckSvg());
    }

    bubble.appendChild(textEl);
    bubble.appendChild(meta);
    wrap.appendChild(bubble);

    return wrap;
  }

  /* ---- SCROLL ---- */
  function scrollToBottom() {
    if (!chatBody) return;
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  /* ---- SHOW ONE MESSAGE ---- */
  function showMessage(index, onDone) {
    var msgData   = MESSAGES[index];
    var timestamp = nextTimestamp();
    var isUser    = msgData.type === 'user';

    if (isUser) {
      /* User messages appear directly — no typing indicator */
      var msgEl = buildMessage(msgData, timestamp);
      chatBody.appendChild(msgEl);
      scrollToBottom();

      t(function() {
        msgEl.classList.add('wa-msg-visible');
        scrollToBottom();
        if (onDone) t(onDone, MSG_PAUSE);
      }, 16);

    } else {
      /* Bot messages show typing indicator first */
      var typingEl = buildTypingIndicator();
      chatBody.appendChild(typingEl);
      scrollToBottom();

      t(function() {
        typingEl.classList.add('wa-typing-visible');
      }, 16);

      t(function() {
        typingEl.classList.remove('wa-typing-visible');

        t(function() {
          if (typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);

          var msgEl = buildMessage(msgData, timestamp);
          chatBody.appendChild(msgEl);
          scrollToBottom();

          t(function() {
            msgEl.classList.add('wa-msg-visible');
            scrollToBottom();
          }, 16);

          if (onDone) t(onDone, MSG_PAUSE);
        }, 250);

      }, TYPING_DURATION);
    }
  }

  /* ---- RUN SEQUENCE ---- */
  function runSequence() {
    var index = 0;

    function next() {
      if (index >= MESSAGES.length) {
        t(function() {
          restart();
        }, RESTART_PAUSE);
        return;
      }
      var current = index;
      index++;
      showMessage(current, next);
    }

    next();
  }

  /* ---- RESTART ---- */
  function restart() {
    clearTimers();
    resetTimestamps();

    if (!chatBody) return;

    var msgs = chatBody.querySelectorAll('.wa-msg, .wa-typing');
    msgs.forEach(function(el) {
      el.style.transition = 'opacity 0.4s ease';
      el.style.opacity = '0';
    });

    t(function() {
      var toRemove = chatBody.querySelectorAll('.wa-msg, .wa-typing');
      toRemove.forEach(function(el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      });

      t(function() {
        runSequence();
      }, 600);
    }, 450);
  }

  /* ---- START ---- */
  function start() {
    chatBody = document.querySelector('.wa-chat-body');
    if (!chatBody) return;

    t(function() {
      runSequence();
    }, 800);
  }

  /* ---- INTERSECTION OBSERVER ---- */
  var section = document.getElementById('alerts-demo');
  if (!section) {
    start();
    return;
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        if (!started) {
          started = true;
          start();
        }
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(section);
  } else {
    started = true;
    start();
  }

})();
