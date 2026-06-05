// ================================================================
//  agent-widget.js  — Texnikum Agenti floating chat widget
//  Works on ALL pages. Draggable, resizable, remembers 10 msgs.
// ================================================================

(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────────  // === SOZLAMALAR ===
  const AGENT_ENDPOINT = '/backend/agent.php';
  const MAX_HISTORY = 10;     // messages kept per session
  const STORAGE_KEY = 'txAgent_history';

  // ── State ────────────────────────────────────────────────────
  let history  = [];          // [{role,content}]
  let isOpen   = false;
  let isTyping = false;
  let isDragging = false;
  let dragOffX = 0, dragOffY = 0;

  // ── Current page name ────────────────────────────────────────
  function getPageName() {
    const p = location.pathname.split('/').pop().replace(/\.html?$/,'') || 'index';
    return p;
  }

  // ── Inject CSS ───────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* Agent button */
    #tx-agent-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 54px; height: 54px;
      background: #0a0a0a;
      border: 1.5px solid rgba(255,255,255,0.12);
      border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      z-index: 9990;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      transition: transform 0.25s, box-shadow 0.25s;
      user-select: none;
    }
    #tx-agent-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    }
    #tx-agent-btn svg { display: block; }

    /* Pulse ring */
    #tx-agent-btn::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1.5px solid rgba(80,40,200,0.35);
      animation: txPulse 2.5s ease-out infinite;
    }
    @keyframes txPulse {
      0% { transform: scale(1); opacity: 0.7; }
      70%{ transform: scale(1.4); opacity: 0; }
      100%{ transform: scale(1.4); opacity: 0; }
    }

    /* Widget panel */
    #tx-agent-panel {
      position: fixed;
      bottom: 96px;
      right: 28px;
      width: 380px;
      height: 520px;
      min-width: 300px;
      min-height: 360px;
      max-width: 90vw;
      max-height: 80vh;
      background: #0c0e14;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      box-shadow: 0 24px 64px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 9991;
      transform: translateY(16px) scale(0.97);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                  opacity 0.3s ease;
    }

    #tx-agent-panel.open {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    /* Resize handle */
    #tx-resize-handle {
      position: absolute;
      top: 0; left: 0;
      right: 0;
      height: 54px;
      cursor: move;
      z-index: 2;
      border-radius: 20px 20px 0 0;
    }

    /* Panel header */
    .tx-header {
      flex-shrink: 0;
      height: 54px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 10px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      position: relative;
      z-index: 3;
    }

    .tx-header-icon {
      width: 32px; height: 32px;
      background: rgba(80,40,200,0.2);
      border: 1px solid rgba(80,40,200,0.3);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.9rem;
      flex-shrink: 0;
    }

    .tx-header-text { flex: 1; }
    .tx-header-name {
      font-family: 'Inter', sans-serif;
      font-size: 0.83rem;
      font-weight: 700;
      color: #fff;
    }
    .tx-header-status {
      font-family: 'Inter', sans-serif;
      font-size: 0.68rem;
      color: rgba(255,255,255,0.3);
    }

    .tx-close-btn {
      width: 28px; height: 28px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 7px;
      cursor: pointer;
      color: rgba(255,255,255,0.5);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8rem;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .tx-close-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }

    .tx-expand-btn {
      width: 28px; height: 28px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 7px;
      cursor: pointer;
      color: rgba(255,255,255,0.35);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.75rem;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .tx-expand-btn:hover { color: rgba(255,255,255,0.7); }

    /* Messages */
    .tx-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.08) transparent;
    }
    .tx-messages::-webkit-scrollbar { width: 4px; }
    .tx-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

    /* Intro message */
    .tx-intro {
      text-align: center;
      padding: 20px 10px;
    }
    .tx-intro p {
      font-family: 'Inter', sans-serif;
      font-size: 0.78rem;
      color: rgba(255,255,255,0.3);
      line-height: 1.65;
    }
    .tx-intro strong {
      display: block;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      color: rgba(255,255,255,0.75);
      margin-bottom: 8px;
    }

    /* Bubble */
    .tx-bubble {
      display: flex;
      gap: 8px;
      animation: txFadeIn 0.3s ease both;
    }
    @keyframes txFadeIn {
      from { opacity:0; transform:translateY(6px); }
      to   { opacity:1; transform:translateY(0); }
    }

    .tx-bubble.user { flex-direction: row-reverse; }

    .tx-avatar {
      width: 28px; height: 28px;
      border-radius: 7px;
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.72rem;
      font-weight: 700;
      font-family: 'Inter', sans-serif;
    }
    .tx-bubble.user .tx-avatar {
      background: rgba(212,23,30,0.25);
      color: #ff7a7a;
    }
    .tx-bubble.ai .tx-avatar {
      background: rgba(80,40,200,0.2);
      color: #a89aee;
    }

    .tx-text {
      max-width: 82%;
      padding: 10px 13px;
      border-radius: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 0.82rem;
      line-height: 1.65;
    }
    .tx-bubble.user .tx-text {
      background: rgba(212,23,30,0.1);
      border: 1px solid rgba(212,23,30,0.18);
      border-radius: 12px 3px 12px 12px;
      color: #e2e2e2;
    }
    .tx-bubble.ai .tx-text {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 3px 12px 12px 12px;
      color: rgba(255,255,255,0.82);
    }

    /* Typing indicator */
    .tx-typing-dots {
      display: inline-flex;
      gap: 3px;
      align-items: center;
      padding: 2px 0;
    }
    .tx-typing-dots span {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: rgba(168,154,238,0.7);
      animation: txBlink 1.2s infinite;
    }
    .tx-typing-dots span:nth-child(2) { animation-delay:0.2s; }
    .tx-typing-dots span:nth-child(3) { animation-delay:0.4s; }
    @keyframes txBlink { 0%,80%,100%{opacity:0.2} 40%{opacity:1} }

    /* Input area */
    .tx-input-area {
      flex-shrink: 0;
      padding: 10px 12px 12px;
      border-top: 1px solid rgba(255,255,255,0.07);
    }

    .tx-input-row {
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }

    .tx-input {
      flex: 1;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 10px 14px;
      font-family: 'Inter', sans-serif;
      font-size: 0.83rem;
      color: #e2e2e2;
      outline: none;
      resize: none;
      min-height: 40px;
      max-height: 120px;
      line-height: 1.5;
      transition: border-color 0.2s;
    }
    .tx-input:focus { border-color: rgba(80,40,200,0.45); }
    .tx-input::placeholder { color: rgba(255,255,255,0.22); }

    .tx-send {
      width: 36px; height: 36px;
      background: rgba(80,40,200,0.7);
      border: none;
      border-radius: 9px;
      color: #fff;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, transform 0.15s;
      flex-shrink: 0;
    }
    .tx-send:hover { background: rgba(80,40,200,0.9); transform: translateY(-1px); }
    .tx-send:disabled { background: rgba(80,40,200,0.25); cursor: not-allowed; transform: none; }

    .tx-disclaimer {
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 0.64rem;
      color: rgba(255,255,255,0.15);
      margin-top: 6px;
    }

    /* Expanded mode */
    #tx-agent-panel.expanded {
      width: 500px;
      height: 680px;
    }
  `;
  document.head.appendChild(style);

  // ── Build DOM ────────────────────────────────────────────────
  // Toggle button
  const btn = document.createElement('button');
  btn.id = 'tx-agent-btn';
  btn.title = 'Texnikum Agenti';
  btn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
      <path d="M8 12h8M12 8v8" stroke="#a89aee" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="12" cy="12" r="3" fill="rgba(168,154,238,0.25)" stroke="#a89aee" stroke-width="1.2"/>
    </svg>
  `;
  document.body.appendChild(btn);

  // Panel
  const panel = document.createElement('div');
  panel.id = 'tx-agent-panel';
  panel.innerHTML = `
    <div id="tx-resize-handle"></div>
    <div class="tx-header">
      <div class="tx-header-icon">✦</div>
      <div class="tx-header-text">
        <div class="tx-header-name">Texnikum Agenti</div>
        <div class="tx-header-status">Har doim yordam berishga tayyorman</div>
      </div>
      <button class="tx-expand-btn" id="tx-expand" title="Kattalashtirish">⤢</button>
      <button class="tx-close-btn" id="tx-close" title="Yopish">✕</button>
    </div>
    <div class="tx-messages" id="tx-messages">
      <div class="tx-intro">
        <strong>Salom! Men Texnikum Agentiman.</strong>
        <p>Sayt haqida istalgan savolingizni bering — manzil, sahifalar, yangiliklar, yo'nalishlar haqida yordam beraman.</p>
      </div>
    </div>
    <div class="tx-input-area">
      <div class="tx-input-row">
        <textarea class="tx-input" id="tx-input" rows="1" placeholder="Savol bering..."></textarea>
        <button class="tx-send" id="tx-send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <p class="tx-disclaimer">Texnikum Agenti · AI yordamchi</p>
    </div>
  `;
  document.body.appendChild(panel);

  // ── References ───────────────────────────────────────────────
  const msgEl   = document.getElementById('tx-messages');
  const inputEl = document.getElementById('tx-input');
  const sendEl  = document.getElementById('tx-send');
  const closeEl = document.getElementById('tx-close');
  const expandEl= document.getElementById('tx-expand');
  const handle  = document.getElementById('tx-resize-handle');

  // ── Toggle open/close ────────────────────────────────────────
  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    if (isOpen) {
      setTimeout(() => inputEl.focus(), 300);
    }
  });

  closeEl.addEventListener('click', () => {
    isOpen = false;
    panel.classList.remove('open');
  });

  // ── Expand toggle ────────────────────────────────────────────
  let expanded = false;
  expandEl.addEventListener('click', () => {
    expanded = !expanded;
    panel.classList.toggle('expanded', expanded);
    expandEl.textContent = expanded ? '⤡' : '⤢';
  });

  // ── Drag (move panel) ────────────────────────────────────────
  handle.addEventListener('mousedown', e => {
    if (e.target === closeEl || e.target === expandEl) return;
    isDragging = true;
    const rect = panel.getBoundingClientRect();
    dragOffX = e.clientX - rect.left;
    dragOffY = e.clientY - rect.top;
    panel.style.transition = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    let left = e.clientX - dragOffX;
    let top  = e.clientY - dragOffY;
    // Clamp to viewport
    left = Math.max(0, Math.min(left, window.innerWidth  - panel.offsetWidth));
    top  = Math.max(0, Math.min(top,  window.innerHeight - panel.offsetHeight));
    panel.style.left   = left + 'px';
    panel.style.top    = top  + 'px';
    panel.style.bottom = 'auto';
    panel.style.right  = 'auto';
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      panel.style.transition = '';
    }
  });

  // ── Textarea auto-resize ─────────────────────────────────────
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
  });

  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doSend();
    }
  });

  sendEl.addEventListener('click', doSend);

  // ── Send message ─────────────────────────────────────────────
  async function doSend() {
    const text = inputEl.value.trim();
    if (!text || isTyping) return;

    addBubble('user', text);
    inputEl.value = '';
    inputEl.style.height = 'auto';
    sendEl.disabled = true;
    isTyping = true;

    // Add to history
    history.push({ role: 'user', content: text });
    if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY);

    // Show typing
    const typingId = showTyping();

    try {
      const resp = await fetch(AGENT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          page: getPageName(),
        }),
      });

      const data = await resp.json();
      removeTyping(typingId);

      const reply = data.reply || 'Javob olishda xatolik.';
      history.push({ role: 'assistant', content: reply });
      if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY);

      addBubble('ai', reply);
    } catch (err) {
      removeTyping(typingId);
      addBubble('ai', 'Tarmoq xatosi yuz berdi. Bir oz kutib qayta urinib ko\'ring.');
    } finally {
      sendEl.disabled = false;
      isTyping = false;
    }
  }

  function addBubble(role, text) {
    const avText = role === 'user' ? 'S' : '✦';
    const div = document.createElement('div');
    div.className = 'tx-bubble ' + role;
    div.innerHTML = `
      <div class="tx-avatar">${avText}</div>
      <div class="tx-text">${role === 'user' ? escHtml(text) : formatResponse(text)}</div>
    `;
    msgEl.appendChild(div);
    msgEl.scrollTop = msgEl.scrollHeight;
  }

  function showTyping() {
    const id = 'tx-typing-' + Date.now();
    const div = document.createElement('div');
    div.className = 'tx-bubble ai';
    div.id = id;
    div.innerHTML = `
      <div class="tx-avatar">✦</div>
      <div class="tx-text">
        <div class="tx-typing-dots"><span></span><span></span><span></span></div>
      </div>
    `;
    msgEl.appendChild(div);
    msgEl.scrollTop = msgEl.scrollHeight;
    return id;
  }

  function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function formatResponse(text) {
    let escaped = escHtml(text);
    // Parse [text](url) -> styled HTML link
    return escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #a89aee; text-decoration: underline; font-weight: 600;">$1</a>');
  }

  function escHtml(s) {
    return String(s||'')
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/\n/g,'<br>');
  }

})();
