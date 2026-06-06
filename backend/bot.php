<?php
// ============================================================
//  bot.php — Shahrixon 1-son Texnikum Telegram Bot
//  Standalone webhook handler
//
//  JOYLASHTIRISH:
//    1. Ushbu faylni PHP hosting ga yuklang
//    2. Webhookni o'rnatish uchun brauzerdan oching:
//       https://sizning-serveringiz.com/bot.php?set_webhook=https://sizning-serveringiz.com/bot.php
//    3. Tekshirish: https://sizning-serveringiz.com/bot.php?webhook_info
//
//  MARSHRUTLAR:
//    POST (Telegram dan) → webhook update ishlov beradi
//    GET ?set_webhook=URL → webhookni o'rnatadi
//    GET ?webhook_info    → webhook holati
// ============================================================

define('BOT_TOKEN', 'YOUR_TELEGRAM_BOT_TOKEN');
define('GROUP_ID',  '-5216329346');
define('API',       'https://api.telegram.org/bot' . BOT_TOKEN . '/');

// ── Telegram API helper ──────────────────────────────────────
function tg(string $method, array $p = []): array {
    $ch = curl_init(API . $method);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($p),
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
    ]);
    $r = curl_exec($ch);
    curl_close($ch);
    return json_decode($r ?: '{}', true) ?? [];
}

function hesc(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

// ══════════════════════════════════════════════════════════════
//  WEBHOOK — POST (Telegram dan keladi)
// ══════════════════════════════════════════════════════════════
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw    = file_get_contents('php://input');
    $update = json_decode($raw, true) ?? [];

    // ── Callback query (tugma bosildi) ──────────────────────
    if (isset($update['callback_query'])) {
        $cb     = $update['callback_query'];
        $cbId   = $cb['id'];
        $cbData = $cb['data'] ?? '';
        $msg    = $cb['message'];
        $chatId = $msg['chat']['id'];
        $msgId  = $msg['message_id'];
        $from   = $cb['from'];
        $admin  = trim(
            ($from['first_name'] ?? '') . ' ' . ($from['last_name'] ?? '')
        );

        // ── "✅ Qabul qilindi" tugmasi ──────────────────────
        if (str_starts_with($cbData, 'accept:')) {
            $phone = substr($cbData, 7); // telefon raqamini ajratib olish

            // Eski matndan "Holat" qatoridan oldingi qismni olish
            $origText = $msg['text'] ?? '';
            $cutPos   = mb_strrpos($origText, "\nHolat:");
            $baseText = $cutPos !== false ? mb_substr($origText, 0, $cutPos) : $origText;

            $newText  = $baseText;
            $newText .= "\n<b>Holat:</b> ✅ Qabul qilingan";
            $newText .= "\n👮 <b>Qabul qildi:</b> " . hesc($admin);

            // Xabarni tahrirlash
            tg('editMessageText', [
                'chat_id'      => $chatId,
                'message_id'   => $msgId,
                'text'         => $newText,
                'parse_mode'   => 'HTML',
                'reply_markup' => ['inline_keyboard' => [[
                    [
                        'text' => "📞 Qo'ng'iroq qilish",
                        'url'  => 'tel:' . $phone,
                    ],
                    [
                        'text'          => '✅ Qabul qilingan ✓',
                        'callback_data' => 'done',
                    ],
                ]]],
            ]);

            tg('answerCallbackQuery', [
                'callback_query_id' => $cbId,
                'text'              => '✅ Ariza qabul qilindi!',
                'show_alert'        => false,
            ]);

        // ── "done" — allaqachon qabul qilingan ─────────────
        } elseif ($cbData === 'done') {
            tg('answerCallbackQuery', [
                'callback_query_id' => $cbId,
                'text'              => '✅ Bu ariza allaqachon qabul qilingan.',
                'show_alert'        => true,
            ]);
        }
    }

    http_response_code(200);
    echo 'ok';
    exit;
}

// ══════════════════════════════════════════════════════════════
//  GET ROUTES
// ══════════════════════════════════════════════════════════════
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="UTF-8">
<title>Texnikum Bot</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 600px; margin: 60px auto; padding: 0 20px; color: #1a1a2e; }
  h1 { font-size: 1.5rem; }
  pre { background: #f4f4f4; border-radius: 8px; padding: 16px; overflow-x: auto; font-size: 0.85rem; }
  a { color: #125da3; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .btn { display: inline-block; background: #0e2942; color: #fff; padding: 10px 20px; border-radius: 8px; margin: 8px 0; font-size: 0.9rem; }
  .success { color: #0f7a5a; }
  .error   { color: #b91c1c; }
  input[type=text] { border: 1.5px solid #ccc; border-radius: 8px; padding: 10px 14px; width: 100%; box-sizing: border-box; font-size: 0.95rem; margin-bottom: 8px; }
</style>
</head>
<body>
<?php

// ── Set webhook ──────────────────────────────────────────────
if (isset($_GET['set_webhook'])) {
    $url = trim(filter_var($_GET['set_webhook'], FILTER_SANITIZE_URL));
    if (!$url || !filter_var($url, FILTER_VALIDATE_URL)) {
        echo '<h1>❌ Noto\'g\'ri URL</h1>';
        echo '<p>Masalan: <code>bot.php?set_webhook=https://sizning-serveringiz.com/bot.php</code></p>';
        echo '<a href="bot.php">← Orqaga</a>';
        exit;
    }
    $res = tg('setWebhook', [
        'url'             => $url,
        'allowed_updates' => ['callback_query'],
    ]);
    $ok = $res['ok'] ?? false;
    echo '<h1>' . ($ok ? '✅ Webhook muvaffaqiyatli o\'rnatildi!' : '❌ Xatolik yuz berdi') . '</h1>';
    echo '<pre>' . json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . '</pre>';
    echo '<p><a href="bot.php?webhook_info">Webhook holatini tekshirish</a></p>';
    echo '<a href="bot.php">← Bosh sahifa</a>';
    exit;
}

// ── Webhook info ─────────────────────────────────────────────
if (isset($_GET['webhook_info'])) {
    $res = tg('getWebhookInfo', []);
    $url = $res['result']['url'] ?? '';
    echo '<h1>Webhook holati</h1>';
    if ($url) {
        echo '<p class="success">✅ Webhook faol: <code>' . hesc($url) . '</code></p>';
    } else {
        echo '<p class="error">❌ Webhook o\'rnatilmagan</p>';
    }
    echo '<pre>' . json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . '</pre>';
    echo '<a href="bot.php">← Bosh sahifa</a>';
    exit;
}

// ── Test: send test message ──────────────────────────────────
if (isset($_GET['test'])) {
    $res = tg('sendMessage', [
        'chat_id'    => GROUP_ID,
        'text'       => "🧪 <b>Test xabari</b>\n\nBot to'g'ri ishlayapti! ✅\nGuruh ID: " . GROUP_ID,
        'parse_mode' => 'HTML',
    ]);
    $ok = $res['ok'] ?? false;
    echo '<h1>' . ($ok ? '✅ Test xabari guruhga yuborildi!' : '❌ Yuborishda xatolik') . '</h1>';
    echo '<pre>' . json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . '</pre>';
    echo '<a href="bot.php">← Bosh sahifa</a>';
    exit;
}

// ── Default: bosh sahifa ─────────────────────────────────────
$botInfo = tg('getMe', []);
$botName = $botInfo['result']['username'] ?? 'Noma\'lum';
$botOk   = $botInfo['ok'] ?? false;
?>

<h1>🤖 Texnikum Bot</h1>
<p>
  Holati: <?= $botOk ? '<span class="success">✅ Bot ishlayapti</span>' : '<span class="error">❌ Bot bilan bog\'lanib bo\'lmadi</span>' ?>
  <?= $botOk ? '— @' . hesc($botName) : '' ?>
</p>

<h2 style="margin-top:32px;">Webhook o'rnatish</h2>
<p>Bot hostingga yuklanganidan keyin quyida to'liq URL ni kiriting:</p>
<form method="GET" action="bot.php">
  <input type="text" name="set_webhook" placeholder="https://sizning-serveringiz.com/bot.php" required>
  <button type="submit" class="btn" style="cursor:pointer;">✅ Webhookni o'rnatish</button>
</form>

<h2 style="margin-top:24px;">Boshqa amallar</h2>
<p>
  <a href="bot.php?webhook_info" class="btn">📋 Webhook holati</a>
  <a href="bot.php?test" class="btn" style="background:#0f7a5a;">🧪 Guruhga test xabar yuborish</a>
</p>

<h2 style="margin-top:24px;">Guruh ma'lumotlari</h2>
<pre>Bot Token: <?= BOT_TOKEN ?>

Guruh ID:  <?= GROUP_ID ?>
</pre>

<p style="color:#999;font-size:0.8rem;margin-top:32px;">
  Shahrixon tumani 1-son texnikumi · <?= date('Y') ?>
</p>

</body>
</html>
<?php exit; ?>
