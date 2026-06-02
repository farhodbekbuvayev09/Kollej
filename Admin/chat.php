<?php
require_once 'auth.php';
requireLogin();
?>
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Chat — Texnikum</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; overflow: hidden; }

    body {
      font-family: 'Inter', sans-serif;
      background: #07090c;
      color: #e2e2e2;
      display: flex;
      flex-direction: column;
    }

    /* ── TOPBAR ── */
    .topbar {
      flex-shrink: 0;
      height: 60px;
      background: rgba(12,14,20,0.95);
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex;
      align-items: center;
      padding: 0 24px;
      gap: 16px;
      backdrop-filter: blur(12px);
    }

    .topbar-icon {
      width: 36px; height: 36px;
      background: #d4171e;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .topbar-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #fff;
    }

    .topbar-sub {
      font-size: 0.72rem;
      color: rgba(255,255,255,0.35);
    }

    .topbar-spacer { flex: 1; }

    .topbar-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      color: rgba(255,255,255,0.35);
    }

    .topbar-status .dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #22c55e;
    }

    .logout-btn {
      padding: 7px 16px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      color: rgba(255,255,255,0.55);
      font-family: 'Inter', sans-serif;
      font-size: 0.76rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }
    .logout-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

    /* ── LAYOUT ── */
    .chat-layout {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    /* ── SIDEBAR ── */
    .sidebar {
      width: 260px;
      flex-shrink: 0;
      background: rgba(10,12,18,0.95);
      border-right: 1px solid rgba(255,255,255,0.06);
      display: flex;
      flex-direction: column;
      padding: 20px 16px;
      gap: 6px;
    }

    .sidebar-label {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.25);
      padding: 0 8px;
      margin-bottom: 6px;
      margin-top: 4px;
    }

    .sidebar-item {
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 0.84rem;
      color: rgba(255,255,255,0.5);
      cursor: default;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background 0.2s;
    }

    .sidebar-item.active {
      background: rgba(212,23,30,0.12);
      color: #ff7a7a;
    }

    .sidebar-item svg { opacity: 0.7; flex-shrink: 0; }

    .sidebar-divider {
      height: 1px;
      background: rgba(255,255,255,0.06);
      margin: 8px 0;
    }

    .sidebar-info {
      margin-top: auto;
      padding: 12px;
      background: rgba(255,255,255,0.03);
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.06);
    }

    .sidebar-info p {
      font-size: 0.72rem;
      color: rgba(255,255,255,0.25);
      line-height: 1.6;
    }

    /* ── CHAT AREA ── */
    .chat-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 32px 40px;
      display: flex;
      flex-direction: column;
      gap: 28px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.1) transparent;
    }

    .chat-messages::-webkit-scrollbar { width: 5px; }
    .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

    /* Welcome message */
    .welcome-msg {
      max-width: 700px;
      margin: 0 auto;
      text-align: center;
      padding: 60px 20px;
    }

    .welcome-msg .icon {
      width: 64px; height: 64px;
      background: rgba(212,23,30,0.1);
      border: 1px solid rgba(212,23,30,0.2);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin: 0 auto 24px;
    }

    .welcome-msg h2 {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 12px;
    }

    .welcome-msg p {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.4);
      line-height: 1.7;
    }

    .welcome-examples {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 28px;
    }

    .example-chip {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 12px 14px;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.45);
      text-align: left;
      line-height: 1.5;
    }

    /* Message bubbles */
    .msg-row {
      display: flex;
      gap: 14px;
      max-width: 820px;
      width: 100%;
      animation: fadeIn 0.35s ease both;
    }

    @keyframes fadeIn {
      from { opacity:0; transform:translateY(8px); }
      to   { opacity:1; transform:translateY(0); }
    }

    .msg-row.user { flex-direction: row-reverse; align-self: flex-end; }
    .msg-row.ai   { align-self: flex-start; }

    .msg-avatar {
      width: 34px; height: 34px;
      border-radius: 9px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .msg-row.user .msg-avatar {
      background: #d4171e;
      color: #fff;
    }
    .msg-row.ai .msg-avatar {
      background: rgba(80,40,200,0.25);
      color: #a89aee;
      font-size: 1rem;
    }

    .msg-bubble {
      max-width: 680px;
    }

    .msg-row.user .msg-bubble {
      background: rgba(212,23,30,0.12);
      border: 1px solid rgba(212,23,30,0.2);
      border-radius: 16px 4px 16px 16px;
      padding: 14px 18px;
    }

    .msg-row.ai .msg-bubble {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 4px 16px 16px 16px;
      padding: 18px 22px;
    }

    /* Rendered news card inside AI bubble */
    .news-preview-card {
      margin-top: 16px;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      overflow: hidden;
      background: rgba(255,255,255,0.03);
    }

    .news-preview-header {
      padding: 14px 18px;
      background: rgba(212,23,30,0.1);
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }

    .news-preview-header span {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #ff7a7a;
    }

    .news-preview-body {
      padding: 16px 18px;
    }

    .npc-title {
      font-family: 'DM Serif Display', serif;
      font-size: 1.15rem;
      color: #fff;
      margin-bottom: 6px;
      line-height: 1.35;
    }

    .npc-subtitle {
      font-family: 'Merriweather', serif;
      font-size: 0.82rem;
      font-weight: 300;
      color: rgba(255,255,255,0.55);
      margin-bottom: 12px;
      font-style: italic;
    }

    .npc-body {
      font-size: 0.83rem;
      color: rgba(255,255,255,0.55);
      line-height: 1.65;
    }

    .npc-images {
      display: flex;
      gap: 8px;
      padding: 12px 18px 16px;
      flex-wrap: wrap;
    }

    .npc-img {
      width: 80px; height: 60px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.08);
    }

    /* Attached image preview in input */
    .attached-imgs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      padding: 12px 20px 0;
    }

    .attached-img-wrap {
      position: relative;
    }

    .attached-img-thumb {
      width: 70px; height: 52px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.12);
    }

    .attached-img-del {
      position: absolute;
      top: -6px; right: -6px;
      width: 18px; height: 18px;
      border-radius: 50%;
      background: #d4171e;
      color: #fff;
      font-size: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      line-height: 1;
    }

    /* Status bar */
    .status-bar {
      padding: 8px 40px;
      font-size: 0.74rem;
      color: rgba(255,255,255,0.3);
      min-height: 28px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-bar.processing { color: #a89aee; }
    .status-bar.done { color: #22c55e; }
    .status-bar.error { color: #ff7a7a; }

    .spinner {
      width: 12px; height: 12px;
      border: 2px solid rgba(168,154,238,0.3);
      border-top-color: #a89aee;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── INPUT AREA ── */
    .input-area {
      flex-shrink: 0;
      padding: 16px 24px 20px;
      background: rgba(10,12,18,0.9);
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    .input-box {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      overflow: hidden;
      transition: border-color 0.25s;
    }

    .input-box:focus-within {
      border-color: rgba(80,40,200,0.5);
    }

    .input-top {
      padding: 16px 18px 4px;
    }

    textarea#msg-input {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      color: #e2e2e2;
      font-family: 'Inter', sans-serif;
      font-size: 0.94rem;
      line-height: 1.6;
      resize: none;
      min-height: 80px;
      max-height: 220px;
      overflow-y: auto;
    }

    textarea#msg-input::placeholder { color: rgba(255,255,255,0.25); }

    .input-bottom {
      display: flex;
      align-items: center;
      padding: 8px 14px 12px;
      gap: 8px;
    }

    .img-attach-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      color: rgba(255,255,255,0.45);
      font-family: 'Inter', sans-serif;
      font-size: 0.76rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .img-attach-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

    #file-input { display: none; }

    .input-spacer { flex: 1; }

    .input-hint {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.18);
    }

    .send-btn {
      width: 40px; height: 40px;
      background: #d4171e;
      border: none;
      border-radius: 10px;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, transform 0.15s;
    }

    .send-btn:hover { background: #b5121a; transform: translateY(-1px); }
    .send-btn:disabled { background: rgba(212,23,30,0.3); cursor: not-allowed; transform: none; }

    /* Typing indicator */
    .typing-dots {
      display: inline-flex;
      gap: 4px;
      align-items: center;
      padding: 4px 2px;
    }
    .typing-dots span {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: rgba(168,154,238,0.7);
      animation: blink 1.2s infinite;
    }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes blink { 0%,80%,100%{opacity:0.2} 40%{opacity:1} }

    /* User's message images */
    .msg-images {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    .msg-img {
      width: 90px; height: 68px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.1);
    }
  </style>
</head>
<body>

<!-- TOPBAR -->
<header class="topbar">
  <div class="topbar-icon">🎓</div>
  <div>
    <div class="topbar-title">Texnikum Content AI</div>
    <div class="topbar-sub">DeepSeek · Yangiliklar boshqaruvi</div>
  </div>
  <div class="topbar-spacer"></div>
  <div class="topbar-status">
    <div class="dot"></div>
    DeepSeek tayyor
  </div>
  <a href="logout.php" class="logout-btn">Chiqish</a>
</header>

<div class="chat-layout">

  <!-- SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-label">Boshqaruv</div>
    <div class="sidebar-item active">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      AI Chat
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-label">Havolalar</div>
    <div class="sidebar-item" style="cursor:pointer" onclick="window.open('../news.html','_blank')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Yangiliklar sahifasi
    </div>
    <div class="sidebar-item" style="cursor:pointer" onclick="window.open('../index.html','_blank')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      Bosh sahifa
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-label">Model</div>
    <div class="sidebar-item" style="font-size:0.78rem; color:rgba(255,255,255,0.3); cursor:default;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      deepseek-chat (V3)
    </div>
    <div class="sidebar-info" style="margin-top:12px;">
      <p>Rasm + matn yuboring, AI avtomatik tarzda Yangiliklar sahifasiga chiroyli post tuzadi va saqlaydi.</p>
    </div>
  </aside>

  <!-- CHAT AREA -->
  <div class="chat-area">

    <div class="chat-messages" id="chat-messages">
      <div class="welcome-msg" id="welcome-msg">
        <div class="icon">✦</div>
        <h2>Salom, Admin!</h2>
        <p>Menga rasm(lar) va matn yuboring — yangilikni avtomatik tarzda saqlaydi va saytga chiqaradi.<br>Faqat rasm yoki faqat matn ham yubora olasiz.</p>
        <div class="welcome-examples">
          <div class="example-chip">📸 2–3 ta rasm + "Bugun sport bayrami bo'ldi" yuboring</div>
          <div class="example-chip">✍️ Faqat matn yuboring — sarlavha o'zi tuziladi</div>
          <div class="example-chip">🗑️ "Oxirgi yangilikni o'chir" deb yozing</div>
          <div class="example-chip">📋 "Nechta yangilik bor?" deb so'rang</div>
        </div>
      </div>
    </div>

    <!-- Status -->
    <div class="status-bar" id="status-bar"></div>

    <!-- INPUT -->
    <div class="input-area">
      <div id="attached-imgs" class="attached-imgs"></div>
      <div class="input-box">
        <div class="input-top">
          <textarea
            id="msg-input"
            placeholder="Yangilik uchun matn yozing yoki rasm qo'shing..."
            rows="3"
          ></textarea>
        </div>
        <div class="input-bottom">
          <button class="img-attach-btn" onclick="document.getElementById('file-input').click()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Rasm qo'shish
          </button>
          <input type="file" id="file-input" accept="image/*" multiple>
          <div class="input-spacer"></div>
          <span class="input-hint">Enter — yangi qator &nbsp;·&nbsp; Ctrl+Enter — yuborish</span>
          <button class="send-btn" id="send-btn" title="Yuborish">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>

  </div>
</div>

<script>
// ================================================================
//  Admin Chat — Full Client Logic
// ================================================================
const messagesEl   = document.getElementById('chat-messages');
const welcomeMsg   = document.getElementById('welcome-msg');
const textarea     = document.getElementById('msg-input');
const sendBtn      = document.getElementById('send-btn');
const fileInput    = document.getElementById('file-input');
const attachedEl   = document.getElementById('attached-imgs');
const statusBar    = document.getElementById('status-bar');

let attachedFiles = [];   // {file, dataURL}

// ── Auto-resize textarea ──
textarea.addEventListener('input', () => {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 220) + 'px';
});

// ── Keyboard shortcuts ──
textarea.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    doSend();
  }
});

// ── File attach ──
fileInput.addEventListener('change', () => {
  const files = Array.from(fileInput.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      attachedFiles.push({ file, dataURL: e.target.result });
      renderAttachPreviews();
    };
    reader.readAsDataURL(file);
  });
  fileInput.value = '';
});

function renderAttachPreviews() {
  attachedEl.innerHTML = '';
  attachedFiles.forEach((item, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'attached-img-wrap';
    wrap.innerHTML = `
      <img src="${item.dataURL}" class="attached-img-thumb" alt="">
      <button class="attached-img-del" onclick="removeAttach(${i})">✕</button>
    `;
    attachedEl.appendChild(wrap);
  });
}

function removeAttach(i) {
  attachedFiles.splice(i, 1);
  renderAttachPreviews();
}

// ── Send btn ──
sendBtn.addEventListener('click', doSend);

async function doSend() {
  const text = textarea.value.trim();
  if (!text && attachedFiles.length === 0) return;

  hideWelcome();
  showUserMessage(text, attachedFiles.map(a => a.dataURL));

  const filesSnap   = [...attachedFiles];
  attachedFiles     = [];
  renderAttachPreviews();
  textarea.value    = '';
  textarea.style.height = 'auto';
  sendBtn.disabled  = true;

  setStatus('processing', 'Bajarilmoqda...');
  showTyping();

  try {
    const formData = new FormData();
    formData.append('text', text);
    filesSnap.forEach((item, i) => {
      formData.append(`image_${i}`, item.file, item.file.name);
    });
    formData.append('image_count', filesSnap.length);

    const resp  = await fetch('process.php', { method: 'POST', body: formData });
    const rawText = await resp.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      removeTyping();
      setStatus('error', '✗ Server javobida xatolik.');
      showAIError('Serverdan noto\'g\'ri javob keldi (PHP xatolik bo\'lishi mumkin). Tafsilotlar: ' + rawText.substring(0, 500));
      return;
    }

    removeTyping();

    if (data.success) {
      setStatus('done', '✓ Bajarildi — yangilik saqlandi');
      showAISuccess(data.article, data.images);
    } else {
      setStatus('error', '✗ Xatolik: ' + (data.error || 'Noma\'lum xato'));
      showAIError(data.error || 'Noma\'lum xato yuz berdi.');
    }
  } catch (err) {
    removeTyping();
    setStatus('error', '✗ Tarmoq xatosi. Qayta urinib ko\'ring.');
    showAIError('Internet aloqa xatosi. Qayta urinib ko\'ring. Tafsilotlar: ' + err.message);
  } finally {
    sendBtn.disabled = false;
    setTimeout(() => setStatus('', ''), 6000);
  }
}

function hideWelcome() {
  if (welcomeMsg) welcomeMsg.style.display = 'none';
}

function showUserMessage(text, imgURLs) {
  const row = document.createElement('div');
  row.className = 'msg-row user';
  let imgsHtml = '';
  if (imgURLs.length) {
    imgsHtml = '<div class="msg-images">' +
      imgURLs.map(u => `<img src="${u}" class="msg-img" alt="">`).join('') +
      '</div>';
  }
  row.innerHTML = `
    <div class="msg-avatar">A</div>
    <div class="msg-bubble">
      ${text ? `<div style="font-size:0.9rem;line-height:1.6;color:#e2e2e2;">${escHtml(text)}</div>` : ''}
      ${imgsHtml}
    </div>
  `;
  messagesEl.appendChild(row);
  scrollBottom();
}

function showTyping() {
  const row = document.createElement('div');
  row.className = 'msg-row ai';
  row.id = 'typing-row';
  row.innerHTML = `
    <div class="msg-avatar">✦</div>
    <div class="msg-bubble">
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>
  `;
  messagesEl.appendChild(row);
  scrollBottom();
}

function removeTyping() {
  const t = document.getElementById('typing-row');
  if (t) t.remove();
}

function showAISuccess(article, savedImages) {
  const row = document.createElement('div');
  row.className = 'msg-row ai';

  let imgsHtml = '';
  if (savedImages && savedImages.length) {
    imgsHtml = '<div class="npc-images">' +
      savedImages.map(f => `<img src="../news-images/${escHtml(f)}" class="npc-img" alt="">`).join('') +
      '</div>';
  }

  row.innerHTML = `
    <div class="msg-avatar">✦</div>
    <div class="msg-bubble">
      <div style="font-size:0.86rem;color:rgba(255,255,255,0.6);margin-bottom:12px;line-height:1.6;">
        Yangilik muvaffaqiyatli yaratildi va <strong style="color:#22c55e">news.json</strong> ga saqlandi. Saytda darhol ko'rinadi.
      </div>
      <div class="news-preview-card">
        <div class="news-preview-header"><span>📰 Ko'rib chiqish</span></div>
        <div class="news-preview-body">
          <div class="npc-title">${escHtml(article.title || '')}</div>
          ${article.subtitle ? `<div class="npc-subtitle">${escHtml(article.subtitle)}</div>` : ''}
          <div class="npc-body">${escHtml((article.body || '').substring(0, 220))}${(article.body||'').length>220?'…':''}</div>
        </div>
        ${imgsHtml}
      </div>
    </div>
  `;
  messagesEl.appendChild(row);
  scrollBottom();
}

function showAIError(msg) {
  const row = document.createElement('div');
  row.className = 'msg-row ai';
  row.innerHTML = `
    <div class="msg-avatar">✦</div>
    <div class="msg-bubble">
      <div style="font-size:0.88rem;color:#ff7a7a;line-height:1.6;">⚠ ${escHtml(msg)}</div>
    </div>
  `;
  messagesEl.appendChild(row);
  scrollBottom();
}

function setStatus(type, msg) {
  statusBar.className = 'status-bar' + (type ? ' ' + type : '');
  if (!msg) { statusBar.innerHTML = ''; return; }
  const spinHtml = type === 'processing' ? '<div class="spinner"></div>' : '';
  statusBar.innerHTML = spinHtml + escHtml(msg);
}

function scrollBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function escHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
</script>

</body>
</html>
