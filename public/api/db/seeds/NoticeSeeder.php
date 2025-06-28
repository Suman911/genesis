<?php

declare(strict_types=1);

use Db\Seeds\Base_Seed;

final class NoticeSeeder extends Base_Seed
{
    public function run(): void
    {
        if (!$this->isEmpty('notices')) {
            return;
        }

        $notices = [
            [
                'title' => 'Semester 6 Result 2024',
                'description' => "Results for Semester 6 (2024 batch) are now available.",
                'document_url' => "https://example.com/files/Sem6_Result_2024.pdf",
                'target_timestamp' => "2025-02-22 12:00:00",
                'expiry_date' => "2025-06-30 23:59:00",
                'type' => "Exam",
                'is_urgent' => true,
                'tag' => "Internal Release",
            ],
            [
                'title' => "5th Semester Revaluation Notice",
                'description' => "Students who applied for revaluation can check the revised marks.",
                'document_url' => "https://example.com/files/Sem5_Reval_Notice.pdf",
                'target_timestamp' => "2025-02-20 10:00:00",
                'expiry_date' => "2025-03-10 23:59:00",
                'type' => "Announcement",
                'is_urgent' => false,
                'tag' => "Academic",
            ],
            [
                'title' => "Upcoming Placement Drive 2025",
                'description' => "Top companies will be visiting the campus for placements.",
                'document_url' => "https://example.com/files/Placement_Drive_2025.pdf",
                'target_timestamp' => "2025-04-05 10:00:00",
                'expiry_date' => "2025-05-01 23:59:00",
                'type' => "Event",
                'is_urgent' => true,
                'tag' => "Career Opportunity",
            ],
            [
                'title' => "Library Maintenance Notice",
                'description' => "The university library will be closed for maintenance.",
                'document_url' => "https://example.com/files/Library_Closure.pdf",
                'target_timestamp' => "2025-02-21 09:00:00",
                'expiry_date' => "2025-02-22 20:00:00",
                'type' => "Announcement",
                'is_urgent' => false,
                'tag' => "Campus Update",
            ],
            [
                'title' => "Semester 1 Result 2024",
                'description' => "First-year students can now check their results online.",
                'document_url' => "https://example.com/files/Sem1_Result_2024.pdf",
                'target_timestamp' => "2025-01-15 09:00:00",
                'expiry_date' => "2025-02-10 23:59:00",
                'type' => "Exam",
                'is_urgent' => false,
                'tag' => "Expired Notice",
            ],
            [
                'title' => "Scholarship Application Deadline",
                'description' => "The deadline for scholarship applications has been extended.",
                'document_url' => "https://example.com/files/Scholarship_Extension.pdf",
                'target_timestamp' => "2025-02-25 17:00:00",
                'expiry_date' => "2025-02-26 23:59:00",
                'type' => "Circular",
                'is_urgent' => true,
                'tag' => "Financial Aid",
            ],
        ];

        $this->table('notices')->insert($notices)->saveData();
    }
}