"use client";

import { useState, useEffect } from "react";
import { Heading, TopHeading, MainHeading } from "@/components/ui/text/heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./alumni.css";
import TestimonialSlide, { TestimonialSlideSkeleton, TestimonialType } from "@/components/alumni/testimonial";

export default function Alumni() {
    const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                // await new Promise((resolve) => setTimeout(resolve, 5000));
                const res = await fetch("/testimonials.json");
                const data = await res.json();
                setTestimonials(data);
            } catch (err) {
                console.error("Error fetching testimonials:", err);
                setError("Failed to load alumni testimonials. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <div className="p-2 py-10 xl:px-8 text-ash">
            <Heading>
                <TopHeading>Alumni</TopHeading>
                <MainHeading>Whats Student&apos;s Say About us</MainHeading>
            </Heading>

            {error && <p className="text-center text-red-500">{error}</p>}

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                slideToClickedSlide={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={{ nextEl: "#alumni-next", prevEl: "#alumni-prev" }}
                pagination={{
                    clickable: true,
                    el: "#alumni-pagination",
                }}
                centeredSlides={true}
                spaceBetween={32}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    500: { slidesPerView: 1.8 },
                    820: { slidesPerView: 2.2 },
                    1200: { slidesPerView: 3 },
                }}
                className="!p-10 !max-w-[1000px] !mx-auto"
            >
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <SwiperSlide key={i}>
                            <TestimonialSlideSkeleton />
                        </SwiperSlide>
                    ))
                    : testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <TestimonialSlide testimonial={testimonial} />
                        </SwiperSlide>
                    ))}
            </Swiper>

            <div className="flex justify-center text-primary select-none">
                <div id="alumni-prev" className="sm:block hidden cursor-pointer">◀</div>
                <div id="alumni-pagination" className="xs:flex hidden justify-center items-center gap-3 !max-w-96 !min-w-80"></div>
                <div id="alumni-next" className="sm:block hidden cursor-pointer">▶</div>
            </div>
        </div>
    );
}
