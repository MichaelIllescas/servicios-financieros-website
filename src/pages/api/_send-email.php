<?php

// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

/**
 * Endpoint API para envío de emails
 * Portal de Negocios
 */

// Configuración de errores (comentar en producción)
if (getenv('NODE_ENV') !== 'production') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

// Cargar dependencias
require_once __DIR__ . '/../../services/php/utils/helpers.php';
require_once __DIR__ . '/../../services/email/EmailService.php';

// Cargar configuración
$config = require __DIR__ . '/../../services/php/config/mail.php';


// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Método no permitido. Use POST.', null, 405);
}

try {
    logMessage('📧 API: Recibiendo solicitud de consulta...', 'INFO');
    
    // Extraer datos del formulario
    $consultationData = [
        'firstName' => $_POST['firstName'] ?? '',
        'lastName' => $_POST['lastName'] ?? '',
        'email' => $_POST['email'] ?? '',
        'phone' => $_POST['phone'] ?? '',
        'message' => $_POST['message'] ?? '',
        'additionalData' => $_POST['additionalData'] ?? '',
        'hasAdditionalFields' => $_POST['hasAdditionalFields'] ?? 'false'
    ];
    
    logMessage("📧 API: Datos recibidos - Nombre: {$consultationData['firstName']}, Email: {$consultationData['email']}", 'INFO');
    
    // Validar campos obligatorios
    $validation = validateFormData($consultationData, $config['validation']);
    
    $requiredFields = $config['validation']['required_fields'];
    $missingFields = [];
    
    foreach ($requiredFields as $field) {
        if (empty($consultationData[$field])) {
            $missingFields[] = $field;
        }
    }
    
    if (!empty($missingFields)) {
        logMessage('❌ API: Campos obligatorios faltantes: ' . implode(', ', $missingFields), 'WARNING');
        jsonResponse(
            false,
            $config['messages']['error_validation'],
            ['missing_fields' => $missingFields],
            400
        );
    }
    
    // Validar formato de email
    if (!validateEmail($consultationData['email'])) {
        logMessage('❌ API: Formato de email inválido: ' . $consultationData['email'], 'WARNING');
        jsonResponse(false, $config['messages']['error_email_invalid'], null, 400);
    }
    
    // Procesar archivo adjunto si existe
    $processedDocument = null;
    
    if (isset($_FILES['document']) && $_FILES['document']['error'] === UPLOAD_ERR_OK) {
        logMessage('📎 API: Procesando archivo adjunto...', 'INFO');
        
        $file = $_FILES['document'];
        
        // Validar tipo de archivo
        if (!isAllowedFileType($file['type'], $config['upload']['allowed_types'])) {
            logMessage('❌ API: Tipo de archivo no permitido: ' . $file['type'], 'WARNING');
            jsonResponse(
                false,
                $config['messages']['error_file_type'],
                ['file_type' => $file['type']],
                400
            );
        }
        
        // Validar tamaño
        if ($file['size'] > $config['upload']['max_size']) {
            $maxSizeMB = round($config['upload']['max_size'] / 1024 / 1024);
            logMessage("❌ API: Archivo muy grande: " . formatFileSize($file['size']), 'WARNING');
            jsonResponse(
                false,
                $config['messages']['error_file_size'],
                [
                    'file_size' => formatFileSize($file['size']),
                    'max_size' => "{$maxSizeMB}MB"
                ],
                400
            );
        }
        
        $processedDocument = $file;
        logMessage("📎 API: Archivo adjunto validado: {$file['name']} (" . formatFileSize($file['size']) . ")", 'INFO');
    } else {
        logMessage('ℹ️ API: No se detectó archivo adjunto', 'INFO');
    }
    
    // Crear instancia del servicio de email
    $emailService = new EmailService();
    
    // Enviar email principal (consulta)
    logMessage('📤 API: Enviando email de consulta...', 'INFO');
    $emailResult = $emailService->sendConsultationEmail($consultationData, $processedDocument);
    
    if (!$emailResult['success']) {
        logMessage('❌ API: Error al enviar email principal: ' . $emailResult['error'], 'ERROR');
        jsonResponse(
            false,
            $config['messages']['error_send'],
            ['error' => $emailResult['error']],
            500
        );
    }
    
    // Enviar email de confirmación al cliente (no bloquear si falla)
    try {
        logMessage('📧 API: Enviando email de confirmación al cliente...', 'INFO');
        $confirmationResult = $emailService->sendConfirmationEmail(
            $consultationData['email'],
            "{$consultationData['firstName']} {$consultationData['lastName']}"
        );
        
        if ($confirmationResult['success']) {
            logMessage('✅ API: Email de confirmación enviado', 'INFO');
        } else {
            logMessage('⚠️ API: No se pudo enviar confirmación (no crítico): ' . $confirmationResult['error'], 'WARNING');
        }
    } catch (Exception $e) {
        logMessage('⚠️ API: Excepción al enviar confirmación: ' . $e->getMessage(), 'WARNING');
    }
    
    logMessage('✅ API: Consulta procesada exitosamente', 'INFO');
    
    // Respuesta exitosa
    jsonResponse(
        true,
        [
            'messageId' => $emailResult['messageId'],
            'timestamp' => date('c')
        ],
        $config['messages']['success'],
        200
    );
    
} catch (Exception $e) {
    logMessage('❌ API: Error inesperado: ' . $e->getMessage(), 'ERROR');
    logMessage('Stack trace: ' . $e->getTraceAsString(), 'ERROR');
    
    jsonResponse(
        false,
        $config['messages']['error_server'],
        [
            'error' => getenv('NODE_ENV') === 'production' ? 'Internal server error' : $e->getMessage()
        ],
        500
    );
}
?>