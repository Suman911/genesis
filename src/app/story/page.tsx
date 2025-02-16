import Paragraph from "@/components/paragraph";

export default function Page() {
    return (
        < div className="text-[1.2rem]">
            <div className="grid grid-cols-1 md:grid-cols-6 p-2 md:p-8">
                <div className="left my-auto h-96  md:col-span-2 bg-red-400 text-center p-20 rounded-3xl">
                    Image
                </div>
                <div className="right md:col-span-4">
                    <Paragraph>
                        <div>
                            Our Story
                        </div>
                        <div>
                            Welcome to <span className="text-primary font-semibold">About Us</span>
                        </div>
                        <div>
                            In the year 1992, a young postgraduate student from the University of Calcutta began taking tuition of his immediate juniors and began tutoring them just for the fun of it and it wasn’t before long that he discovered his passion that he had for teaching and mentoring. After his graduation, he was offered a Ph.D. position at Calcutta University which he soon switched from to a better-paying job at a biotech firm in Mumbai, as he was no stranger to financial and family struggles. But as fate would have it, he was constantly drawn towards his basal desires and passion, and soon leaving his secure job Kaushik Mitra embarked on a journey to become a full-time teacher and hence started this institute, ie, Genesis, now known as Genesis Lifesciences.
                            Armed with his fierce passion and love for science he went down a path that has now made this institution what it is. Having notable alumni all over the country and in every major institute national and international, his success speaks for itself and is a blazing testimony to his true aims and goals, to make students academically strong and industry ready.
                        </div>
                    </Paragraph>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 p-2 md:p-8 mt-6">
                <div className="md:col-span-4 p-2 my-auto">
                    <Paragraph>
                        <div>
                            Founded 1992
                        </div>
                        <div>
                            What We Do
                        </div>
                        <div>
                            Academic tutoring for all life science based courses as well as entrance exams is conducted in both online and offline manner. Industrial training provided in first class facility to get students industry ready. Students can also avail our professional grooming options and take advantage of our industry tie-ups to secure a dream job.
                        </div>
                    </Paragraph>
                </div>
                <div className="img my-32 h-96  md:col-span-2 bg-red-400 text-center p-20 rounded-3xl"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 p-2 md:p-8 mt-6">
                <div className="my-16 md:col-span-3">
                    <Paragraph>
                        <div>
                            Vision
                        </div>
                        <div>
                            Our Vision
                        </div>
                        <div>
                            To introduce this beautiful world of organisms to the upcoming generations and hence induce love for this field of science among students. A massive mission and aim of Genesis is to get these students academically strong and Industry ready, hence bridging the ever existing gap between industry and academia by providing them state-of-the-art training in our facility and develop an urge in students to pursue this field further hence contributing to this expanding and developing world of life sciences.
                        </div>
                    </Paragraph>
                </div>
                <div className="my-auto  md:col-span-3">
                    <Paragraph>
                        <div>
                            Mission
                        </div>
                        <div>
                            Our Mission
                        </div>
                        <div>
                            In this present day and age where the importance of life sciences is understood and weighed in with every passing moment, to contribute to society in any way possible is an achievement on its own. To be able to guide and get the future soldiers of life sciences ready to make immense and massive contributions is a dream that genesis strive towards.
                        </div>
                    </Paragraph>
                </div>
            </div>
        </div>
    );
}