<?php
require_once 'auth.php';
requireLogin();
session_destroy();
header('Location: index.php');
exit;
