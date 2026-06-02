<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// ============================================================
//  process.php — DeepSeek API + save news article
// ============================================================
require_once 'auth.php';
requireLogin();

header('Content-Type: application/json; charset=utf-8');
set_time_limit(120);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid method']);
    exit;
}

// ── 1. Save uploaded images ──────────────────────────────────
$savedImages = [];
$imageCount  = (int)($_POST['image_count'] ?? 0);

if (!is_dir(NEWS_IMGS)) {
    mkdir(NEWS_IMGS, 0755, true);
}

$allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

for ($i = 0; $i < $imageCount; $i++) {
    $key = "image_{$i}";
    if (!isset($_FILES[$key]) || $_FILES[$key]['error'] !== UPLOAD_ERR_OK) continue;

    $file    = $_FILES[$key];
    $mime    = mime_content_type($file['tmp_name']);
    if (!in_array($mime, $allowedMime)) continue;

    $ext      = pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'jpg';
    $safeName = 'news_' . time() . '_' . $i . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $dest     = NEWS_IMGS . $safeName;

    if (move_uploaded_file($file['tmp_name'], $dest)) {
        $savedImages[] = $safeName;
    }
}

// ── 2. Build messages for DeepSeek ──────────────────────────
$userText = trim($_POST['text'] ?? '');

$systemPrompt = <<<PROMPT
Sen Shahrixon 1-Son Texnikum veb-saytining kontent boshqaruv AI-assistantisan.
Admin senga matn va/yoki rasm(lar) yuboradi. Sen quyidagi vazifani bajarasan:

1. Matni tahlil qil va professional o'zbek tilida yangilik maqolasini tuz.
2. FAQAT JSON formatda javob qil. Boshqa hech narsa yozma.
3. JSON strukturasi:
{
  "title": "Katta, qalin sarlavha — asosiy mavzuni 8-12 so'zda ifodalash",
  "subtitle": "Kichikroq qo'shimcha sarlavha yoki kichik izoh — ixtiyoriy",
  "body": "To'liq yangilik matni. 2-4 paragraf. O'zbek tilida. Rasmiy, ammo samimiy uslub.",
  "layout": "1col",
  "date": "2026-05-22",
  "tags": ["ta'lim", "texnikum"]
}
4. Agar admin "o'chir", "delete", "oxirgi yangilikni o'chir" desa:
{"action": "delete_last"}
5. Agar admin statistika so'rasa:
{"action": "stats"}
6. title har doim KATTA va QALIN bo'lishi uchun tepa harfda yozing.
Faqat JSON. Boshqa hech narsa yozma.
PROMPT;

$messages = [
    ['role' => 'system', 'content' => $systemPrompt],
];

// Build user message content
$contentText = $userText ?: 'Admin faqat rasmlar yubordi, matn yozilmagan. Rasmlar asosida yangilik tuz.';
if (!empty($savedImages)) {
    $contentText .= "\n\n[Admin " . count($savedImages) . " ta rasm yukladi: " . implode(', ', $savedImages) . "]";
}

$messages[] = ['role' => 'user', 'content' => $contentText];

// ── 3. Call DeepSeek ─────────────────────────────────────────
$apiError = '';
$rawResponse = deepseekChat($messages, 1200, $apiError);

if ($rawResponse === null) {
    echo json_encode(['success' => false, 'error' => 'DeepSeek API bilan aloqa o\'rnatilmadi. Tafsilot: ' . $apiError]);
    exit;
}

// ── 4. Parse JSON from response ──────────────────────────────
// Strip markdown code blocks if any
$clean = preg_replace('/^```(?:json)?\s*/i', '', trim($rawResponse));
$clean = preg_replace('/\s*```$/', '', $clean);
$clean = trim($clean);

$article = json_decode($clean, true);

if (!$article || !is_array($article)) {
    // Try to extract JSON substring
    if (preg_match('/\{[\s\S]*\}/m', $clean, $m)) {
        $article = json_decode($m[0], true);
    }
}

if (!$article || !is_array($article)) {
    echo json_encode([
        'success' => false,
        'error'   => 'AI javobini tahlil qilib bo\'lmadi. Qayta urinib ko\'ring.',
        'raw'     => substr($rawResponse, 0, 400),
    ]);
    exit;
}

// ── 5. Handle special actions ─────────────────────────────────
if (isset($article['action'])) {
    if ($article['action'] === 'delete_last') {
        $news = readNews();
        if (!empty($news)) {
            $deleted = array_shift($news);
            // delete its images
            if (!empty($deleted['images'])) {
                foreach ($deleted['images'] as $img) {
                    $path = NEWS_IMGS . $img;
                    if (file_exists($path)) unlink($path);
                }
            }
            saveNews($news);
            echo json_encode(['success' => true, 'article' => ['title' => 'Oxirgi yangilik o\'chirildi', 'body' => 'Muvaffaqiyatli o\'chirildi.'], 'images' => []]);
        } else {
            echo json_encode(['success' => false, 'error' => 'O\'chirish uchun yangilik yo\'q.']);
        }
        exit;
    }
    if ($article['action'] === 'stats') {
        $news = readNews();
        $count = count($news);
        echo json_encode(['success' => true, 'article' => ['title' => "Jami {$count} ta yangilik", 'body' => "Hozirda news.json da {$count} ta yangilik mavjud."], 'images' => []]);
        exit;
    }
}

// ── 6. Build final news entry ────────────────────────────────
$newsEntry = [
    'id'        => uniqid('news_', true),
    'title'     => $article['title']    ?? 'Yangilik',
    'subtitle'  => $article['subtitle'] ?? '',
    'body'      => $article['body']     ?? '',
    'layout'    => $article['layout']   ?? '1col',
    'tags'      => $article['tags']     ?? [],
    'images'    => $savedImages,
    'date'      => date('Y-m-d'),
    'timestamp' => time(),
];

// ── 7. Prepend to news.json (newest first) ───────────────────
$news = readNews();
array_unshift($news, $newsEntry);
saveNews($news);

echo json_encode([
    'success' => true,
    'article' => $newsEntry,
    'images'  => $savedImages,
]);
