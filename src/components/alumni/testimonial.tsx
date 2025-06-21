"use client";
import { useState } from "react";


export interface TestimonialType {
    id: number;
    message: string;
    image: string;
    name: string;
}

const TestimonialSlide = ({ testimonial }: { testimonial: TestimonialType }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const truncatedText = testimonial.message.slice(0, 200) + "...";

    return (
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg text-center">
            <div className="text-gray-700 p-4 lg:pb-12 pb-20 bg-gray-300 rounded-2xl rounded-b-4xl">
                <p>{isExpanded ? testimonial.message : truncatedText}</p>
                <button
                    className="font-semibold text-ash ml-1"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                <div className="border-4 border-dashed border-primary rounded-full relative -top-10">
                    <img
                        src={`/assets/images/testimonials/${testimonial.image}`}
                        alt={testimonial.name}
                        className="md:size-20 size-28 object-cover bg-ash rounded-full shadow-md m-1"
                        loading="lazy"
                    />
                </div>

                <h5 className="relative -top-5 px-5 pb-5 md:text-xl text-3xl">{testimonial.name}</h5>
            </div>
        </div>
    );
};

const TestimonialSlideSkeleton = () => {
    return (
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg text-center max-w-[300px]">
            <div className="p-4 lg:pb-12 pb-20 w-full rounded-2xl rounded-b-4xl bg-gray-200">
                <div className="h-4 w-3/4 bg-gray-300 rounded mb-2 mx-auto animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded mb-2 mx-auto animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded mx-auto animate-pulse"></div>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="border-4 border-dashed border-primary rounded-full relative -top-10">
                    <div className="md:size-20 size-28 rounded-full bg-gray-300 m-1 animate-pulse"></div>
                </div>
                <div className="relative -top-5 px-5 pb-5 w-32 h-6 bg-gray-300 rounded mx-auto animate-pulse"></div>
            </div>
        </div>
    );
}

export { TestimonialSlideSkeleton };
export default TestimonialSlide;