<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// =============================================================
//  TEXNIKUM ADMIN — Auth helper
//  Include this in every protected page
// =============================================================
session_start();

define('ADMIN_USER', 'Admin1');
define('ADMIN_PASS', 'Admin009');
define('NEWS_JSON',  __DIR__ . '/../news.json');
define('NEWS_IMGS',  __DIR__ . '/../news-images/');
define('DEEPSEEK_API_KEY', 'sk-c1d358356cdb42ec88e39a0fc62bc3d5');
define('DEEPSEEK_MODEL',   'deepseek-chat');

function requireLogin() {
    if (empty($_SESSION['admin_logged_in'])) {
        header('Location: index.php');
        exit;
    }
}

function deepseekChat(array $messages, int $maxTokens = 2048, &$errorOut = null): ?string {
    $payload = [
        'model'       => DEEPSEEK_MODEL,
        'messages'    => $messages,
        'max_tokens'  => $maxTokens,
        'temperature' => 0.7,
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
        CURLOPT_TIMEOUT        => 60,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
    ]);

    $raw  = curl_exec($ch);
    $err  = curl_error($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($err) {
        $errorOut = "cURL Xatolik: " . $err;
        return null;
    }

    if ($code !== 200) {
        $errorOut = "HTTP Status: " . $code . " | Server javobi: " . $raw;
        return null;
    }

    $data = json_decode($raw, true);
    if (!isset($data['choices'][0]['message']['content'])) {
        $errorOut = "API Javob formati noto'g'ri. Raw: " . $raw;
        return null;
    }

    return $data['choices'][0]['message']['content'];
}

function readNews(): array {
    if (!file_exists(NEWS_JSON)) return [];
    $data = json_decode(file_get_contents(NEWS_JSON), true);
    return is_array($data) ? $data : [];
}

function saveNews(array $news): bool {
    return file_put_contents(NEWS_JSON, json_encode($news, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)) !== false;
}
