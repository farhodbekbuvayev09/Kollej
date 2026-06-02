<?php
require_once 'auth.php';

// Already logged in → go to chat
if (!empty($_SESSION['admin_logged_in'])) {
    header('Location: chat.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $u = trim($_POST['username'] ?? '');
    $p = trim($_POST['password'] ?? '');
    if ($u === ADMIN_USER && $p === ADMIN_PASS) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: chat.php');
        exit;
    } else {
        $error = "Foydalanuvchi nomi yoki parol noto'g'ri.";
    }
}
?>
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin — Shahrixon 1-Son Texnikum</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', sans-serif;
      background: #080b0f;
      color: #e8e8e8;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* Ambient background glow */
    body::before {
      content: '';
      position: fixed;
      width: 700px; height: 700px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(80,40,200,0.12) 0%, transparent 70%);
      top: -200px; left: -150px;
      pointer-events: none;
    }
    body::after {
      content: '';
      position: fixed;
      width: 500px; height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(212,23,30,0.08) 0%, transparent 70%);
      bottom: -100px; right: -100px;
      pointer-events: none;
    }

    .login-card {
      position: relative;
      width: 420px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 52px 44px 44px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 40px 80px rgba(0,0,0,0.4);
      animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
    }

    @keyframes slideUp {
      from { opacity:0; transform:translateY(32px); }
      to   { opacity:1; transform:translateY(0); }
    }

    .login-logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: rgba(255,255,255,0.5);
      letter-spacing: 0.03em;
      margin-bottom: 8px;
    }

    .login-title {
      font-size: 1.8rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #fff;
      margin-bottom: 36px;
    }

    .login-title span { color: #d4171e; }

    label {
      display: block;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.45);
      margin-bottom: 8px;
    }

    input[type=text], input[type=password] {
      width: 100%;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 14px 16px;
      font-family: 'Inter', sans-serif;
      font-size: 0.95rem;
      color: #fff;
      outline: none;
      transition: border-color 0.25s, background 0.25s;
      margin-bottom: 20px;
    }

    input[type=text]:focus, input[type=password]:focus {
      border-color: rgba(80,40,200,0.6);
      background: rgba(255,255,255,0.09);
    }

    .login-btn {
      width: 100%;
      background: #d4171e;
      border: none;
      border-radius: 10px;
      padding: 15px;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #fff;
      cursor: pointer;
      transition: background 0.25s, transform 0.15s;
      margin-top: 4px;
    }

    .login-btn:hover { background: #b5121a; transform: translateY(-1px); }
    .login-btn:active { transform: translateY(0); }

    .error-msg {
      background: rgba(212,23,30,0.12);
      border: 1px solid rgba(212,23,30,0.3);
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 0.84rem;
      color: #ff7a7a;
      margin-bottom: 20px;
    }

    .login-footer {
      margin-top: 32px;
      font-size: 0.74rem;
      color: rgba(255,255,255,0.2);
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="login-card">
    <p class="login-logo">Shahrixon 1-Son Texnikum</p>
    <h1 class="login-title">Admin <span>Panel</span></h1>

    <?php if ($error): ?>
      <div class="error-msg"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <form method="POST" action="">
      <label for="username">Foydalanuvchi nomi</label>
      <input type="text" id="username" name="username" placeholder="Admin1" required autocomplete="off">

      <label for="password">Parol</label>
      <input type="password" id="password" name="password" placeholder="••••••••" required>

      <button type="submit" class="login-btn">Kirish</button>
    </form>

    <p class="login-footer">Maxfiy. Ruxsatsiz kirish taqiqlanadi.</p>
  </div>
</body>
</html>
