<?php
// CORS Ruxsatlari (Vercel dan to'g'ridan-to'g'ri so'rov qabul qilish uchun)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// ============================================================
//  agent.php — Texnikum Agenti backend
//  Reads all site info, answers user questions in Uzbek
//  NO content modification rights
// ============================================================
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { echo json_encode(['error'=>'Invalid']); exit; }

define('DEEPSEEK_API_KEY', 'YOUR_DEEPSEEK_API_KEY');
define('DEEPSEEK_MODEL',   'deepseek-chat');
define('NEWS_JSON',        __DIR__ . '/news.json');

set_time_limit(60);

$body     = json_decode(file_get_contents('php://input'), true);
$messages = $body['messages'] ?? [];     // [{role,content}] — up to 10 from client
$page     = trim($body['page'] ?? 'index');

if (empty($messages)) {
    echo json_encode(['error' => 'No messages']);
    exit;
}

// ── Read current news for context ──
$newsContext = '';
if (file_exists(NEWS_JSON)) {
    $news = json_decode(file_get_contents(NEWS_JSON), true);
    if (is_array($news) && count($news) > 0) {
        $newsContext = "\n\nJORIY YANGILIKLAR (" . count($news) . " ta):\n";
        foreach (array_slice($news, 0, 5) as $n) {
            $newsContext .= "- {$n['title']} ({$n['date']})\n";
        }
    }
}

// ── System prompt ──
$systemPrompt = <<<PROMPT
Sen "Texnikum Agenti" — Shahrixon 1-son texnikumining rasmiy va bilimdon AI yordamchisisan.

MUHIM QOIDA — SALOMLASHUV:
Agar foydalanuvchi faqat "salom", "hi", "assalomu alaykum" yoki shunga o'xshash umumiy salomlashish so'zini yozsa, pastdagi ma'lumotlarni o'qib o'tirma! Qisqacha javob ber: texnikum haqida savol bo'lsa yordam berishga tayyorligingni ayt. Lekin kimdir aniq savol bersa, pastdagi ma'lumotlarni o'qib, aniq javob ber.

SAYT VA INTERFEYS XUSUSIYATI:
- Chat interfeysi markdown havolalarini qo'llab-quvvatlaydi, ya'ni [Matn](havola) ko'rinishida yozsangiz, foydalanuvchiga bosiladigan havola bo'lib ko'rinadi. Shuning uchun foydalanuvchiga sahifalarni tavsiya qilganda doim markdown havolalardan foydalaning!
Masalan:
- [Bosh sahifa](index.html)
- [Talabalar Hayoti](life.html)
- [Yangiliklar](news.html)
- [An'ana va Texnologiyalar](article.html)
- [Ro'yxatdan o'tish](register.php)

MUHIM QOIDALAR:
1. Qisqa, aniq va lo'nda javob ber (2-4 gap). Faqat o'ta muhim bo'lsa batafsil ma'lumot ber.
2. FAQAT o'zbek tilida javob ber.
3. Saytning hech bir qismini o'zgartira olmaysan — faqat ma'lumot berasan.
4. Samimiy, do'stona va professional bo'l.
5. Emojilardan juda kam foydalan (har javobda ko'pi bilan 1-2 ta).
6. Raqamlarni HECH QACHON chalkashtirma — faqat quyidagi ma'lumotlarni asos qil.

────────────────────────────────────────────
TEXNIKUM PASPORT MA'LUMOTLARI (RASMIY)
────────────────────────────────────────────

ASOSIY RAQAMLAR:
- Tashkil etilgan yil: 2006
- Jami pedagog xodimlar: 56 nafar (35 o'qituvchi, 1 bosh usta, 21 ishlab chiqarish ta'limi ustasi)
- Jami o'quvchilar: 739 nafar (225 nafari ayollar)
- Ta'lim shakli: Kunduzgi — 665 nafar; Dual — 74 nafar
- Bosqichlar bo'yicha: 1-bosqich — 317 nafar, 2-bosqich — 332 nafar, 11-baza asosida — 90 nafar
- O'quv binosi: 1 ta (720 o'ringa mo'ljallangan)
- Yotoqxona: yo'q (0 ta o'rin)
- O'qish smenasi: 1 smena
- O'quv auditoriyalari: 32 ta, laboratoriya: 3 ta, ustaxona: 3 ta
- Kompyuter sinfi: 1 ta (8 ta kompyuter)
- Direktor: Xolmatov Shuhratjon Shermamatovich

DIREKTOR TO'LIQ MA'LUMOTLARI:
- To'liq ismi: Xolmatov Shuhratjon Shermamatovich
- Tajribasi: Umumiy mehnat staji - 24 yil, Pedagogik staji - 24 yil. Oxirgi attestatsiya yili - 2023 (Malaka toifasi: Bosh o'qituvchi).
- Texnikumdagi yuklamasi: Direktorlikdan tashqari "Iqtisodiyot nazariyasi" va "Iqtisodiyot" fanlaridan dars beradi. O'quv yuklamasi: 150 soat (120 soat nazariy dars, 30 soat mustaqil ishlar).

2026/2027 O'QUV YILI QABUL REJASI (TO'G'RI, RASMIY):
Jami: 390 ta o'rin (240 kunduzgi + 150 dual). Ta'lim tili: o'zbek
1. Moda va tikuv texnologiyasi (30720436): 90 ta (30 kunduzgi + 60 dual)
2. Avtomobillar servisi (30711605): 60 ta (kunduzgi)
3. Kompyuter tarmoqlari va IT-servis (30610403): 60 ta (kunduzgi)
4. Metallga qayta ishlov berish (30711307): 60 ta (kunduzgi)
5. Poyabzal ishlari (30720414): 60 ta (dual)
6. Turar-joy infratuzilmasi servisi (30730207): 30 ta (dual)
7. Elektrobuslar, elektromobillar va elektroskuterlar servisi (30711606): 30 ta (kunduzgi)
ESLATMA: Eski ma'lumotlardagi "Bank ishi", "Buxgalteriya" yo'nalishlari 2026/2027 uchun emas edi.

2025/2026 YANGI QABUL QILINGAN (jami 322 nafar):
Tikuvchi (dual): 30, Poyabzal ishlari (dual): 29, Avtomobil transporti: 30, Buxgalteriya hisobi: 15, Kompyuter injiniringi: 30, Yengil sanoat konstruksiyasi: 15

2024/2025 BITIRUVCHILAR (jami 331 nafar):
Avtomobil kuzovi ta'mirlash: 135, Avtomobil shassisi: 116, Kompyuter tarmoqlari: 55, Tikuvchilik: 25

TEXNIKUM TARIXI:
2006 (buyruq №90) → 2019 (PF-5812, kasb-hunar maktabi) → 2025-fevral (№35, politexnikum) → 2025-oktyabr (PF-190, hozirgi texnikum)

USTAXONA JIHOZLARI (holati): Chilangarlik va tikuvchilik (2012, yaxshi), Payvandlash (2007, yaxshi)

SEMANTIK NAVIGATION:
- "tikuvchilik", "ustaxona", "talabalar ish ustida" → [An'ana va Texnologiyalar](article.html)
- "talabalar hayoti", "festivallar", "sumalak", "madaniy tadbir" → [Talabalar Hayoti](life.html)
- "yangiliklar", "e'lonlar" → [Yangiliklar](news.html)
- "ro'yxatdan o'tish", "qabul", "o'qishga kirmoqchi" → [Ro'yxatdan o'tish](register.php)

HOZIRGI SAHIFA: ${page}
${newsContext}

Foydalanuvchining savoliga yuqoridagi rasmiy ma'lumotlar asosida aniq va ishonchli javob bering.
PROMPT;

// Prepend system message
$fullMessages = array_merge(
    [['role' => 'system', 'content' => $systemPrompt]],
    array_slice($messages, -10)   // max 10 messages history
);

// ── Call DeepSeek ──
$payload = [
    'model'       => DEEPSEEK_MODEL,
    'messages'    => $fullMessages,
    'max_tokens'  => 400,
    'temperature' => 0.6,
];

$ch = curl_init('https://api.deepseek.com/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . DEEPSEEK_API_KEY,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_TIMEOUT        => 45,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
]);

$raw  = curl_exec($ch);
$err  = curl_error($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($err || $code !== 200) {
    echo json_encode(['reply' => 'Uzr, hozirda javob bera olmayapman. Biroz kutib qayta urinib ko\'ring.']);
    exit;
}

$data  = json_decode($raw, true);
$reply = $data['choices'][0]['message']['content'] ?? 'Javob olishda xatolik.';

echo json_encode(['reply' => trim($reply)]);
