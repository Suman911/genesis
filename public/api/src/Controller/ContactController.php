<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\ContactRepository;
use Services\Turnstile\Turnstile;
use Services\Mail\MailService;
use Services\Mail\Templete\ContactTemplete;
use Api\Utils\VisitorIP;

final class ContactController extends Controller
{
    public function __construct()
    {
        $this->repository = new ContactRepository();
    }

    public function index(Request $request, Response $response): void
    {
        $body = $request->getBody();

        // Accept token under 'token' or 'turnstileToken'
        $token = $body['token'] ?? $body['turnstileToken'] ?? null;
        $result = Turnstile::verify($token);

        if(isset($result['error'])){
            $response->error($result['code'], $result['error']);
        }

        $senderName = trim($body['name'] ?? '');
        $senderPhone = trim($body['phone'] ?? '');
        $senderEmail = trim($body['email'] ?? '');
        $msgSubject = trim($body['subject'] ?? 'Contact form submission');
        $msgBody = trim($body['message'] ?? '');

        $to = $_ENV['Contact_mail'] ?? null;
        if (empty($to)) {
            $response->error(500, 'Internal error');
        }

        $cc_raw = $_ENV['Contact_CCmail'] ?? null;
        $cc = [];
        if (!empty($cc_raw)) {
            // allow comma separated
            $parts = array_filter(array_map('trim', explode(',', $cc_raw)));
            if (!empty($parts)) $cc = $parts;
        }

        // Build a clean HTML body for the mail
        $time = date('Y-m-d H:i:s');
        $ip = VisitorIP::get();
        
        $html = ContactTemplete::generate($senderName, $senderEmail, $senderPhone, $msgSubject, $msgBody, $time, $ip);

        $mailService = new MailService();
        $sent = $mailService->send($to, 'Genesis Website contact: ' . $msgSubject, $html, $cc);

        if (! $sent) {
            // keep response message user-friendly; log details server side
            error_log('ContactController: mail send failed for ' . ($to ?? 'n/a'));
            $response->error(502, 'Failed to send message');
        }

        $response->send(['message' => 'Submitted']);
    }
}