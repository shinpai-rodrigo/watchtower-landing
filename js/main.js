/* ===================================================
   Matheus AI — Main JavaScript
   =================================================== */

// ===== NAVBAR SCROLL =====
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();


// ===== MOBILE MENU =====
(function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  const iconMenu = document.getElementById('iconMenu');
  const iconClose = document.getElementById('iconClose');
  if (!btn || !menu) return;

  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
    menu.classList.toggle('open', isOpen);
    menu.setAttribute('aria-hidden', String(!isOpen));
    btn.setAttribute('aria-expanded', String(isOpen));
    iconMenu.style.display = isOpen ? 'none' : 'block';
    iconClose.style.display = isOpen ? 'block' : 'none';
  }

  btn.addEventListener('click', toggle);

  // Close on link click
  menu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (isOpen) toggle();
    });
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = anchor.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


// ===== SCROLL REVEAL =====
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const staggerItems = document.querySelectorAll('.reveal-stagger');

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '-60px 0px' });

  reveals.forEach(function(el) { observer.observe(el); });

  // Staggered reveal for grid children
  const staggerObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '-40px 0px' });

  staggerItems.forEach(function(el, i) {
    el.style.transitionDelay = (i % 6 * 0.08) + 's';
    staggerObserver.observe(el);
  });
})();


// ===== WHATSAPP CHAT ANIMATION =====
(function initChat() {
  const chatArea = document.getElementById('chatArea');
  if (!chatArea) return;

  const messages = [
    { type: 'user', text: 'ClaudIA, quantos installs tivemos ontem?' },
    { type: 'bot', text: 'Você teve 4.392 installs ontem. 📈 Crescimento de 12% vs semana passada.' },
    { type: 'user', text: 'E o meu CPA hoje?' },
    { type: 'bot', text: 'R$ 18,40. Abaixo da meta de R$ 20. ✅ Tudo sob controle!' },
    { type: 'alert', text: '⚠️ Alerta: Seu CPA ultrapassou R$ 20! Agora em R$ 22,15. Atenção necessária.' },
  ];

  // Timing: [show_at_ms, typing_starts_ms_before]
  const timing = [
    { show: 800, typing: false },
    { show: 2200, typing: 800 },
    { show: 4000, typing: false },
    { show: 5400, typing: 800 },
    { show: 7200, typing: 800 },
  ];

  let timers = [];
  let cycle = 0;

  function createUserBubble(text) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-bubble chat-user';
    const inner = document.createElement('div');
    inner.className = 'chat-user-inner';
    const p = document.createElement('p');
    p.textContent = text;
    inner.appendChild(p);
    wrap.appendChild(inner);
    return wrap;
  }

  function createBotBubble(text) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-bubble chat-bot';
    const avatar = document.createElement('div');
    avatar.className = 'chat-bot-avatar';
    avatar.textContent = 'C';
    const inner = document.createElement('div');
    inner.className = 'chat-bot-inner';
    const p = document.createElement('p');
    p.textContent = text;
    inner.appendChild(p);
    wrap.appendChild(avatar);
    wrap.appendChild(inner);
    return wrap;
  }

  function createAlertBubble(text) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-bubble chat-alert';
    const inner = document.createElement('div');
    inner.className = 'chat-alert-inner';
    const icon = document.createElement('div');
    icon.className = 'chat-alert-icon';
    icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    const p = document.createElement('p');
    p.textContent = text;
    inner.appendChild(icon);
    inner.appendChild(p);
    wrap.appendChild(inner);
    return wrap;
  }

  function createTypingIndicator() {
    const el = document.createElement('div');
    el.className = 'typing-indicator';
    el.innerHTML = '<span class="typing-label">ClaudIA está digitando</span><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    return el;
  }

  function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function resetChat() {
    // Keep date bubble, remove messages
    const children = Array.from(chatArea.children);
    children.slice(1).forEach(function(c) { chatArea.removeChild(c); });
  }

  function startCycle() {
    resetChat();
    let typingEl = null;

    messages.forEach(function(msg, i) {
      const t = timing[i];

      // Show typing indicator before bot messages
      if (t.typing) {
        const typingTimer = setTimeout(function() {
          if (typingEl) chatArea.removeChild(typingEl);
          typingEl = createTypingIndicator();
          chatArea.appendChild(typingEl);
          scrollToBottom();
        }, t.show - t.typing);
        timers.push(typingTimer);
      }

      const showTimer = setTimeout(function() {
        // Remove typing
        if (typingEl) {
          try { chatArea.removeChild(typingEl); } catch(e) {}
          typingEl = null;
        }

        let bubble;
        if (msg.type === 'user') bubble = createUserBubble(msg.text);
        else if (msg.type === 'bot') bubble = createBotBubble(msg.text);
        else bubble = createAlertBubble(msg.text);

        chatArea.appendChild(bubble);
        scrollToBottom();
      }, t.show);
      timers.push(showTimer);
    });

    // Restart after full sequence
    const restartTimer = setTimeout(function() {
      cycle++;
      timers = [];
      startCycle();
    }, 12000);
    timers.push(restartTimer);
  }

  // Start after a short delay so user sees the phone render first
  setTimeout(startCycle, 600);
})();


// ===== FEATURE CARDS GLOW =====
(function initFeatureGlow() {
  document.querySelectorAll('.feature-card[data-glow]').forEach(function(card) {
    const glow = card.getAttribute('data-glow');
    if (!glow) return;

    const overlay = document.createElement('div');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = [
      'position:absolute',
      'inset:0',
      'border-radius:16px',
      'opacity:0',
      'pointer-events:none',
      'transition:opacity 0.4s',
      'background:radial-gradient(ellipse 80% 60% at 50% 0%,' + glow + ' 0%,transparent 70%)',
    ].join(';');
    card.insertBefore(overlay, card.firstChild);

    card.addEventListener('mouseenter', function() { overlay.style.opacity = '1'; });
    card.addEventListener('mouseleave', function() { overlay.style.opacity = '0'; });
  });
})();


// ===== STEP ARROW VISIBILITY =====
(function initStepArrows() {
  function checkArrows() {
    const arrows = document.querySelectorAll('.step-arrow');
    const isDesktop = window.innerWidth >= 900;
    arrows.forEach(function(a) {
      a.style.display = isDesktop ? 'flex' : 'none';
    });
  }
  checkArrows();
  window.addEventListener('resize', checkArrows);
})();
