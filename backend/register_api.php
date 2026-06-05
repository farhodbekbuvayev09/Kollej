<?php
// ============================================================
//  register_api.php — Ro'yxatdan o'tish obrabotkasi (Backend)
// ============================================================

// CORS Ruxsatlari (Vercel dan to'g'ridan-to'g'ri so'rov qabul qilish uchun)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

define('BOT_TOKEN', '8027930820:AAF6qJ2bNFTQxPH5v4UPrZPPOBMXalfg3ME');
define('GROUP_ID',  '-5216329346');
define('TG_API',    'https://api.telegram.org/bot' . BOT_TOKEN . '/');

function tg(string $method, array $p = []): array {
    $ch = curl_init(TG_API . $method);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($p),
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => false,
    ]);
    $r = curl_exec($ch);
    curl_close($ch);
    return json_decode($r ?: '{}', true) ?? [];
}

function hesc(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ism      = trim($_POST['ism']      ?? '');
    $familiya = trim($_POST['familiya'] ?? '');
    $telefon  = trim($_POST['telefon']  ?? '');
    $yonalish = trim($_POST['yonalish'] ?? '');
    $savol    = trim($_POST['savol']    ?? '');

    // Validation
    if (!$ism || !$familiya || !$telefon || !$yonalish) {
        echo json_encode(['ok' => false, 'error' => "Barcha majburiy maydonlarni to'ldiring."]);
        exit;
    }
    if (mb_strlen($savol) > 200) {
        echo json_encode(['ok' => false, 'error' => "Savol 200 ta belgidan oshmasligi kerak."]);
        exit;
    }

    $phone = preg_replace('/[^0-9+]/', '', $telefon);

    $text  = "📋 <b>YANGI RO'YXATDAN O'TISH</b>\n\n";
    $text .= "👤 <b>Ism:</b> " . hesc($ism) . "\n";
    $text .= "👤 <b>Familiya:</b> " . hesc($familiya) . "\n";
    $text .= "📱 <b>Telefon:</b> " . hesc($telefon) . "\n";
    $text .= "🎓 <b>Yo'nalish:</b> " . hesc($yonalish) . "\n";
    if ($savol !== '') {
        $text .= "❓ <b>Savol:</b> " . hesc($savol) . "\n";
    }
    $text .= "\n<b>Holat:</b> ⏳ Kutilmoqda";

    $cbData = 'accept:' . $phone;

    $res = tg('sendMessage', [
        'chat_id'      => GROUP_ID,
        'text'         => $text,
        'parse_mode'   => 'HTML',
        'reply_markup' => ['inline_keyboard' => [[
            ['text' => "📞 Qo'ng'iroq qilish", 'url'           => 'tel:' . $phone],
            ['text' => '✅ Qabul qilindi',      'callback_data' => $cbData],
        ]]],
    ]);

    if ($res['ok'] ?? false) {
        echo json_encode(['ok' => true]);
    } else {
        error_log("[register_api.php] Telegram error: " . ($res['description'] ?? "Noma'lum xatolik"));
        echo json_encode(['ok' => false, 'error' => "Yuborishda xatolik yuz berdi. Iltimos qayta urinib ko'ring."]);
    }
    exit;
}
?>
