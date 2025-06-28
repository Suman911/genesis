<?php

use Db\Seeds\Base_Seed;

final class TestimonialsSeeder extends Base_Seed
{
    public function run(): void
    {
        if (!$this->isEmpty('testimonials')) {
            return;
        }

        $data = [
            [
                'message' => "We all know that the meaning of 'Genesis' is the origin or mode of formation of something. In this institution I am reformed and the origin of my career built here. The immense effort of our beloved sir is not really expeessibale in any words.I must say I am very lucky that I had the oppertunity to study here. I also get very good seniors from here & they are very cooperative. At every step of my graduation I got very much support. The infrastructure and smart learning process of genesis groom every student as per their own needs. Thank you Sir, thank you genesis.\n\nWith regards,\n\nZoological Survey of India\nJunior Research Fellow(JRF)\nDiptera Section",
                'image' => "2401ff3c5022.jpeg",
                'name' => "Arka Mukherjee",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'message' => "Junior research fellow , Parasitology Lab , IISER Tirupati. \n\nHeartful Congratulation to genesis on completing 30 year! I have been there from 2016-2021 . Genesis taught me how to think beyond boundaries and achieve higher goals . I feel so blessed to have a teacher like KM Sir  to guide me through my academic journey. Also good wishes for  future sir! \n\nThanks",
                'image' => "c2b3750c00a3.jpeg",
                'name' => "Anirban Mukherjee",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'message' => "Hi,\nI am Supratim, pursuing my PhD in Ecology in University of Calcutta under the supervision of Prof. Parthiba Basu and at present, I am at the end of my thesis writing. First of all, I would like to convey my heartfelt regards and respect to K.M. Sir. He is the person who increased my interests and knowledge in Zoology through his excellent teaching techniques. He had mastered the art of teaching well enough to make a student feel attracted towards the subject. All of us were amazed by his patience, dedication and affection towards the subject. Another respectful quality I observed is that he always keeps his outstanding knowledge base updated. He also helped me to qualify NET examination. Without his support it would not be possible for me to achieve my goal. I shall ever remain grateful to him for mentoring us through the course of my graduation and post-graduation.",
                'image' => "1740027613.jpeg",
                'name' => "Supratim Laha",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'message' => "I am currently working as Scientist in academic integrity as well as Research Ethics and Integrity Officer at DBT-inStem, Bangalore. I have received training in field ecology during my doctoral degree tenure at Wildlife Institute of India, Dehradun, and the University of Colorado, Boulder (through Nehru Fulbright Doctoral Fellowship) as well as during postdoctoral tenure at Indian Institute of Science, Bangalore, and the University of Sheffield, UK (through British Commonwealth Fellowship). \n\nI was a student at “Genesis” during my undergraduate degree in Zoology (Hons.) and till date very fondly remember the time spent there. The excellent teaching in various areas of Zoology not only helped me to understand nuances of the subject but also helped to understand it more holistically. One of the unique features of genesis was availability of excellent quality recent books which were unavailable in my college library. I truly believe that my knowledge about biological sciences has significantly shaped the guidance received at Genesis during my undergraduate.",
                'image' => "1740027679.png",
                'name' => "Sabuj Bhattacharyya, Ph.D.",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'message' => "It feels great pleasure to hear that Genesis has completed 30 years of teaching. I have been there from 2010 to 2015 during my undergraduate and postgraduate days. I learnt a lot of skills from Kaushik Sir about almost everything that helps me throughout my academics and even still it is helping. The quality and ability of teaching, how to write a good answer which distinctively differs from other student like all these I learnt thoroughly from my Genesis days. It was absolutely amicable and fun-filled. So a mere Thanks for Genesis or Kaushik sir is not at all enough rather it is inexplicable in words. All my best wishes for Genesis and of course Kaushik sir, without him this glorifying 30 long years could not be possible. It is known that “Winners don’t do different things, they do things differently”. Miles to go. Good wishes Genesis.",
                'image' => "b7723bf4908da9f.jpeg",
                'name' => "Saurav Dutta",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'message' => "A unique and exceptional study centre for B.Sc., M.Sc., and research-oriented exams in the life sciences. A well-equipped classroom to fulfil our dreams. We were always given adequate and appropriate study materials. Its library contains a wide collection of books on every aspect of life science. Each and every mock test included very high-quality questions that helped us improve a lot. I am very glad to say that our mentor Kaushik Mitra sir is a wonderful person who is constantly there to inspire us with his vast expertise and enthusiasm for work. He is always there to help us and groom us in a proper way for our bright future. \nThank you Genesis. Being a part of the enormous Genesis family is a blessing to me.",
                'image' => "6e6d2d50f81df2c5.png",
                'name' => "Pinku Halder",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'message' => "I started loving Zoology because of K.M Sir only. Infact, it was impossible for me to get a chance in M.Sc in Science College, if sir wasn't there to inspire me. He also helped me to qualify NET. I am forever grateful to him for where I'm today.\nCongratulatuons Sir.\n- Mandakranta.\nPresently I'm working as State Aided College Teacher (Category- I) in Vidyasagar College, Department of Zoology (UG+PG).",
                'image' => "a0ae8cc94420488.jpg",
                'name' => "Mandakranta",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->table('testimonials')->insert($data)->saveData();
    }
}