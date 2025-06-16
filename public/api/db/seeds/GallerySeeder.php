<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

final class GallerySeeder extends AbstractSeed
{
    public function run(): void
    {
        $count = $this->fetchRow('SELECT COUNT(*) AS count FROM gallery')['count'];
        if ($count > 0) {
            return;
        }

        $images = [
            ['src' => 'gallery_img_1.jpeg'],
            ['src' => 'gallery_img_2.jpg'],
            ['src' => 'gallery_img_5.jpg'],
            ['src' => 'gallery_img_20.jpg'],
            ['src' => 'gallery_img_6.jpg'],
            ['src' => 'gallery_img_39.jpg'],
            ['src' => 'gallery_img_8.jpg'],
            ['src' => 'gallery_img_9.jpg'],
            ['src' => 'gallery_img_10.jpg'],
            ['src' => 'gallery_img_31.jpg'],
            ['src' => 'gallery_img_12.jpg'],
            ['src' => 'gallery_img_13.jpg'],
            ['src' => 'gallery_img_37.jpg'],
            ['src' => 'gallery_img_41.jpg'],
            ['src' => 'gallery_img_15.jpg'],
            ['src' => 'gallery_img_16.jpg'],
            ['src' => 'gallery_img_17.jpg'],
            ['src' => 'gallery_img_18.jpg'],
            ['src' => 'gallery_img_7.jpg'],
            ['src' => 'gallery_img_21.jpg'],
            ['src' => 'gallery_img_22.jpeg'],
            ['src' => 'gallery_img_3.jpg'],
            ['src' => 'gallery_img_25.jpg'],
            ['src' => 'gallery_img_23.jpeg'],
            ['src' => 'gallery_img_26.jpg'],
            ['src' => 'gallery_img_27.jpg'],
            ['src' => 'gallery_img_28.jpg'],
            ['src' => 'gallery_img_11.jpg'],
            ['src' => 'gallery_img_29.jpg'],
            ['src' => 'gallery_img_4.jpg'],
            ['src' => 'gallery_img_30.jpg'],
            ['src' => 'gallery_img_24.jpeg'],
            ['src' => 'gallery_img_32.jpg'],
            ['src' => 'gallery_img_33.jpg'],
            ['src' => 'gallery_img_14.jpg'],
            ['src' => 'gallery_img_34.jpg'],
            ['src' => 'gallery_img_35.jpg'],
            ['src' => 'gallery_img_36.jpg'],
            ['src' => 'gallery_img_38.jpg'],
            ['src' => 'gallery_img_40.jpg'],
            ['src' => 'gallery_img_42.jpg'],
            ['src' => 'gallery_img_19.jpg'],
        ];

        $this->table('gallery')->insert($images)->saveData();
    }
}