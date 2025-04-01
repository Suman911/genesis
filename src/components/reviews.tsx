"use client"
import { useState } from "react";
import { Heading, TopHeading, MainHeading } from "@/components/ui/text/heading";
import { motion } from "motion/react"
import { FaQuoteRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

const reviewsData = [
    {
        id: 1,
        name: "Srishti Ghosh",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjV-Gemgg5bZ47tulemcR_abF6CWy9ya8aaO383EnpT3Hm6f840=s128-c0x00000000-cc-rp-mo",
        text: 'I have been studying here since 2021, journied through BSc in Calcutta University and now currently in MSc in Pune University and it has been an amazing journey. Our teacher, Mr. Kaushik Mitra, has been an outstanding guide and mentor through and more. I have participated in multiple workshops and Hands-on training programs arranged by Genesis. One such hands-on programme has been arranged on "SDS PAGE and Western Blotting" in association with SHRM biotechnologie. It was a 2 day program of both theory and hands on technique learnings. It has been an overwhelming adventure to participate in this. I got to handel the apparatus and perform all steps with individual attention. It has been a great experience over all as always',
    },
    {
        id: 2,
        name: "Shreya Ray",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjVUDjsaiiStvEzX02HzLegChMyQ68NvtFkGFAkZ3oxQhAirAlOB=s128-c0x00000000-cc-rp-mo",
        text: "I've been studying at Genesis for about a year and a half now, what can I say better about this institute, as I fall short of words every time. Workshops that I've attended during my grads are all conducted by this institute and each one of them has been very good. I got to learn about a lot of stuff that i didn't know personally. All the more, i enjoyed being a part of these endeavours and am looking forward to attending such interesting workshops in the future. I would highly recommend everyone to make themselves enrolled in such workshops. Happy learning!",
    },
    {
        id: 3,
        name: "Asha Basu Mallick",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjUp04X-pJOLJaZ3Zu7BdhNI5YRCqO6BMycSSZKin8yz958WkiAdQQ=s128-c0x00000000-cc-rp-mo",
        text: 'A hands on training programme on SDS- PAGE & Western blotting technique was organised by Genesison 21-22nd December,2024. It was quite a great learning experience for us. Looking forward to attend more such fruitful workshops.',
    },
    {
        id: 4,
        name: "Debapriya Sharma",
        image: "https://lh3.googleusercontent.com/a/ACg8ocJDFSAiC6jsDKI4yviDKcHFwcX1HEvHMI2svWFFd2DRDcLYWYE=s128-c0x00000000-cc-rp-mo",
        text: "The Western Blotting workshop was highly informative and hands-on. The instructors explained the concepts and techniques clearly, making it easy to follow even for beginners. Practical sessions on protein transfer, antibody staining, and detection were invaluable. A great experience for anyone looking to master this essential molecular biology technique.",
    },
    {
        id: 5,
        name: "Triasa Guha",
        image: "https://lh3.googleusercontent.com/a/ACg8ocKepthg-gzP10tOyiURR9HS9VUuGgUosYIU_E9epRNFp1my=s128-c0x00000000-cc-rp-mo",
        text: "Genesis is different from every other coaching classes and our coach, Kaushik Mitra Sir's ability to explain extremely complicated topics in the easiest manner and the patience he carries to solve our queries is unimaginable. Apart from that, the environment here is for acing the subject with a magnanimous collection of books on each topic that all the students can avail. Sir is extremely approachable, friendly and guides and gives individual attention to each student.",
    }
];

export default function Reviews() {
    const [visibleReviews, setVisibleReviews] = useState(2);

    const handleShowMore = () => {
        setVisibleReviews(prev => Math.min(prev + 2, reviewsData.length));
    };

    const handleHideAll = () => {
        setVisibleReviews(2);
    };

    return (
        <div className="relative container py-12 flex flex-col items-center">
            <div className="absolute top-0 h-full w-screen bg-gray-50 z-0"></div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center mb-10 max-w-xl z-10"
            >
                <Heading>
                    <TopHeading>Reviews</TopHeading>
                    <MainHeading>Google Reviews</MainHeading>
                    <p className="text-gray-600 mt-2">Discover experiences from our community</p>
                </Heading>
            </motion.div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                {reviewsData.slice(0, visibleReviews).map((review) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative bg-white max-w-md rounded-xl shadow-lg p-6 transition-all duration-300 
                                   hover:bg-primary hover:shadow-2xl group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={review.image}
                                alt={review.name}
                                // loading="lazy"
                                className="w-14 h-14 rounded-full border-2 border-primary transition-all duration-300 group-hover:border-white"
                            />
                            <div>
                                <h5 className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors">
                                    {review.name}
                                </h5>
                                <p className="text-yellow-500 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.i
                                            key={i}
                                            className="fa fa-star text-sm text-yellow-400 group-hover:text-white transition-colors"
                                            whileHover={{ scale: 1.2 }}
                                        ></motion.i>
                                    ))}
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 mt-3 group-hover:text-white transition-colors">
                            {review.text}
                        </p>

                        <motion.a
                            href="https://www.google.com/maps/place/?q=place_id:ChIJiy6V1B-d-DkRJKplQ6PN4wg"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="block mt-4 text-primary font-medium group-hover:text-white transition-all duration-300"
                        >
                            Read Full Review
                        </motion.a>

                        {/* Decorative Element */}
                        <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-50 transition-opacity">
                            <FaQuoteRight className="size-6 text-primary group-hover:text-white" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Buttons */}
            <motion.div className="flex justify-center gap-4 mt-8 z-10">
                <motion.button
                    onClick={handleShowMore}
                    whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                    disabled={visibleReviews >= reviewsData.length}
                >
                    <FaChevronDown />
                    Show More
                </motion.button>

                <motion.button
                    onClick={handleHideAll}
                    whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                    disabled={visibleReviews <= 2}
                >
                    <FaChevronUp />
                    Show Less
                </motion.button>
            </motion.div>
        </div>
    );
}


