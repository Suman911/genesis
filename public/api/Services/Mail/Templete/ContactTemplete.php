<?php

namespace Services\Mail\Templete;

class ContactTemplete
{
    public static function generate(
        string $senderName,
        string $senderEmail,
        string $senderPhone,
        string $msgSubject,
        string $msgBody,
        string $time,
        string $ip
    ): string
    {
        return '<!DOCTYPE html>
                <html>

                <head>
                    <meta charset="UTF-8">
                    <title>Contact Submission</title>
                </head>

                <body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 0;">
                        <tr>
                            <td align="center">

                                <table width="600" cellpadding="0" cellspacing="0"
                                    style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08);">

                                    <tr>
                                        <td
                                            style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:30px;text-align:center;color:#ffffff;">
                                            <h1 style="margin:0;font-size:24px;font-weight:bold;">New Contact Form Submission</h1>
                                            <p style="margin:8px 0 0 0;font-size:14px;opacity:0.9;">Received on ' . htmlspecialchars($time) . '</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:30px;">

                                            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#333333;">

                                                <tr>
                                                    <td style="padding:12px 0;border-bottom:1px solid #eeeeee;">
                                                        <strong style="color:#555;">Name:</strong><br>
                                                        <span style="font-size:15px;">' . htmlspecialchars($senderName) . '</span>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:12px 0;border-bottom:1px solid #eeeeee;">
                                                        <strong style="color:#555;">Email:</strong><br>
                                                        <span style="font-size:15px;color:#4f46e5;">' . htmlspecialchars($senderEmail) . '</span>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:12px 0;border-bottom:1px solid #eeeeee;">
                                                        <strong style="color:#555;">Phone:</strong><br>
                                                        <span style="font-size:15px;">' . htmlspecialchars($senderPhone) . '</span>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:12px 0;border-bottom:1px solid #eeeeee;">
                                                        <strong style="color:#555;">Subject:</strong><br>
                                                        <span style="font-size:15px;font-weight:bold;">' . htmlspecialchars($msgSubject) . '</span>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:20px 0;">
                                                        <strong style="color:#555;">Message:</strong>
                                                        <div
                                                            style="margin-top:10px;padding:18px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;line-height:1.6;">
                                                            ' . nl2br(htmlspecialchars($msgBody)) . '
                                                        </div>
                                                    </td>
                                                </tr>

                                            </table>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td
                                            style="background:#f9fafb;padding:18px;text-align:center;font-size:12px;color:#888;border-top:1px solid #eeeeee;">
                                            IP Address: ' . htmlspecialchars($ip) . '<br>
                                            This message was sent from your website contact form.
                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>
                    </table>

                </body>

                </html>';
    }
}