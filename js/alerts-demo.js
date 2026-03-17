/* ===================================================
   Matheus AI — Alertas: WhatsApp Chat Animation
   =================================================== */

(function initAlertsChatDemo() {

  /* ---- CONFIG ---- */
  var TYPING_DURATION   = 1500;   /* ms typing indicator visible */
  var MSG_PAUSE         = 2500;   /* ms gap between messages */
  var RESTART_PAUSE     = 3000;   /* ms after last message before loop */

  /* ---- TIMESTAMPS (advances as animation plays) ---- */
  var BASE_HOUR   = 14;
  var BASE_MINUTE = 31;

  function nextTimestamp() {
    BASE_MINUTE += 1;
    if (BASE_MINUTE >= 60) { BASE_MINUTE = 0; BASE_HOUR = (BASE_HOUR + 1) % 24; }
    var h = String(BASE_HOUR).padStart(2, '0');
    var m = String(BASE_MINUTE).padStart(2, '0');
    return h + ':' + m;
  }

  function resetTimestamps() {
    BASE_HOUR   = 14;
    BASE_MINUTE = 31;
  }

  /* ---- MESSAGES ---- */
  var MESSAGES = [
    {
      lines: [
        { bold: false, text: '\u26a0\ufe0f ' },
        { bold: true,  text: 'CPA Ultrapassou a Meta!' },
        { bold: false, text: '\n\nSeu CPA chegou em ' },
        { bold: true,  text: 'R$ 22,15' },
        { bold: false, text: ' \u2014 acima do limite de R$ 20,00.\n\n\ud83d\udcc9 Campanha: iOS \u2014 Black Friday\n\ud83d\udd50 Detectado agora' }
      ]
    },
    {
      lines: [
        { bold: true,  text: '\ud83d\udcca Resumo r\u00e1pido:' },
        { bold: false, text: '\n\n\u2022 ROAS atual: 2.8x (meta: 3x)\n\u2022 Impress\u00f5es: 45.2k\n\u2022 Cliques: 1.847\n\nDeseja pausar a campanha?' }
      ]
    },
    {
      lines: [
        { bold: false, text: '\u2705 ' },
        { bold: true,  text: 'A\u00e7\u00e3o registrada!' },
        { bold: false, text: '\n\nCampanha iOS pausada com sucesso.\n\nMonitorando as demais campanhas... \ud83d\udc40' }
      ]
    },
    {
      lines: [
        { bold: false, text: '\ud83c\udfaf ' },
        { bold: true,  text: 'Meta atingida!' },
        { bold: false, text: '\n\nCampanha Android bateu 500 installs hoje!\n\nParab\u00e9ns! \ud83c\udf89' }
      ]
    }
  ];

  /* ---- STATE ---- */
  var timers  = [];
  var started = false;
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

  /* ---- BUILD ELEMENTS ---- */

  function buildDateChip() {
    var chip = document.createElement('div');
    chip.className = 'wa-date-chip';
    chip.textContent = 'Hoje';
    return chip;
  }

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

  function buildMessage(msgData, timestamp) {
    var wrap = document.createElement('div');
    wrap.className = 'wa-msg';

    var bubble = document.createElement('div');
    bubble.className = 'wa-bubble';

    /* Build text with bold spans */
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

    var check = document.createElement('span');
    check.className = 'wa-bubble-check';
    check.setAttribute('aria-hidden', 'true');
    check.innerHTML =
      '<svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.033l6.272-8.048a.366.366 0 0 0-.064-.51zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.516.031l-.423.48a.418.418 0 0 0 .025.546l3.098 2.781a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.064-.51z" fill="currentColor"/>' +
      '</svg>';

    meta.appendChild(timeEl);
    meta.appendChild(check);

    bubble.appendChild(textEl);
    bubble.appendChild(meta);
    wrap.appendChild(bubble);

    return wrap;
  }

  /* ---- SCROLL to bottom ---- */
  function scrollToBottom() {
    if (!chatBody) return;
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  /* ---- SHOW one message in sequence ---- */
  function showMessage(index, onDone) {
    var msgData   = MESSAGES[index];
    var timestamp = nextTimestamp();

    /* 1. Show typing indicator */
    var typingEl = buildTypingIndicator();
    chatBody.appendChild(typingEl);
    scrollToBottom();

    t(function() {
      typingEl.classList.add('wa-typing-visible');
    }, 16); /* next frame */

    /* 2. After typing duration — swap typing for message bubble */
    t(function() {
      /* Fade out typing */
      typingEl.classList.remove('wa-typing-visible');

      t(function() {
        if (typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);

        /* Append message */
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

  /* ---- RUN full sequence ---- */
  function runSequence() {
    var index = 0;

    function next() {
      if (index >= MESSAGES.length) {
        /* All messages shown — wait then restart */
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

  /* ---- CLEAR chat and restart ---- */
  function restart() {
    clearTimers();
    resetTimestamps();

    if (!chatBody) return;

    /* Fade all messages out */
    var msgs = chatBody.querySelectorAll('.wa-msg, .wa-typing');
    msgs.forEach(function(el) {
      el.style.transition = 'opacity 0.4s ease';
      el.style.opacity = '0';
    });

    t(function() {
      /* Keep only date chip, remove messages */
      var toRemove = chatBody.querySelectorAll('.wa-msg, .wa-typing');
      toRemove.forEach(function(el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      });

      /* Small breath pause before re-starting */
      t(function() {
        runSequence();
      }, 600);
    }, 450);
  }

  /* ---- START ---- */
  function start() {
    chatBody = document.querySelector('.wa-chat-body');
    if (!chatBody) return;

    /* Small initial delay so user sees the empty chat first */
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
