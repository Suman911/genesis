<?php

namespace Services\Mail;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MailService
{
    private PHPMailer $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer(true);

        $this->mail->isSMTP();
        $this->mail->Host       = 'smtp.gmail.com';
        $this->mail->SMTPAuth   = true;
        $this->mail->Username   = $_ENV['MAIL_USERNAME'];
        $this->mail->Password   = $_ENV['MAIL_PASSWORD'];
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mail->Port       = 587;

        $this->mail->isHTML(true);
        $this->mail->setFrom($_ENV['MAIL_USERNAME'], 'Genesis Life Sciences');
    }

    public function send(
        string $to,
        string $subject,
        string $body,
        ?array $cc = null,
        ?array $bcc = null
    ): bool {

        try {
            $this->mail->clearAddresses();
            $this->mail->clearCCs();
            $this->mail->clearBCCs();

            $this->mail->addAddress($to);

            if ($cc) {
                foreach ($cc as $email) {
                    $this->mail->addCC($email);
                }
            }

            if ($bcc) {
                foreach ($bcc as $email) {
                    $this->mail->addBCC($email);
                }
            }

            $this->mail->Subject = $subject;
            $this->mail->Body    = $body;
            $this->mail->AltBody = strip_tags($body);

            return $this->mail->send();

        } catch (Exception $e) {
            return false;
        }
    }
}