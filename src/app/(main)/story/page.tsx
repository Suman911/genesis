import { Story, StoryImage, StoryParagraph, ShortStory, ShortStoryParagraph } from "@/components/ui/text/story";
import { Paragraph, ParagraphScope, ParagraphTitle, ParagraphPara } from "@/components/ui/text/paragraph";
// import OptimisedImage from "@/components/ui/image/OptimisedImage";
import ImageFrame from "@/components/ui/util/imageFrame/imageFrame";

export default function Page() {
    return (
        <div>
            <Story>
                <StoryImage>
                    <ImageFrame>
                        <img
                            src="/assets/images/home_about.jpg"
                            alt="home about"
                            loading="lazy"
                        />
                    </ImageFrame>
                </StoryImage>
                <StoryParagraph>
                    <Paragraph>
                        <ParagraphScope>
                            OUR STORY
                        </ParagraphScope>
                        <ParagraphTitle>
                            Welcome to <span className="text-primary font-semibold">Genesis</span>
                        </ParagraphTitle>
                        <ParagraphPara>
                            In the year 1992, a young postgraduate student from the University of Calcutta began taking tuition of his immediate juniors and began tutoring them just for the fun of it and it wasn&apos;t before long that he discovered his passion that he had for teaching and mentoring. After his graduation, he was offered a Ph.D. position at Calcutta University which he soon switched from to a better-paying job at a biotech firm in Mumbai, as he was no stranger to financial and family struggles. But as fate would have it, he was constantly drawn towards his basal desires and passion, and soon leaving his secure job Kaushik Mitra embarked on a journey to become a full-time teacher and hence started this institute, ie, Genesis, now known as Genesis Lifesciences.
                            <br /><br />
                            Armed with his fierce passion and love for science he went down a path that has now made this institution what it is. Having notable alumni all over the country and in every major institute national and international, his success speaks for itself and is a blazing testimony to his true aims and goals, to make students academically strong and industry ready.
                        </ParagraphPara>
                    </Paragraph>
                </StoryParagraph>
            </Story>
            <Story>
                <StoryParagraph>
                    <Paragraph>
                        <ParagraphScope>
                            FOUNDED 1992
                        </ParagraphScope>
                        <ParagraphTitle>
                            What We Do
                        </ParagraphTitle>
                        <ParagraphPara>
                            Academic tutoring for all life science based courses as well as entrance exams is conducted in both online and offline manner. Industrial training provided in first class facility to get students industry ready. Students can also avail our professional grooming options and take advantage of our industry tie-ups to secure a dream job.
                        </ParagraphPara>
                    </Paragraph>
                </StoryParagraph>
                <StoryImage>
                    <ImageFrame>
                        <img
                            src="/assets/images/about_2.jpg"
                            alt="about 2"
                            loading="lazy"
                        />
                    </ImageFrame>
                </StoryImage>
            </Story>
            <ShortStory>
                <ShortStoryParagraph>
                    <Paragraph>
                        <ParagraphScope>
                            VISION
                        </ParagraphScope>
                        <ParagraphTitle>
                            Our Vision
                        </ParagraphTitle>
                        <ParagraphPara>
                            To introduce this beautiful world of organisms to the upcoming generations and hence induce love for this field of science among students. A massive mission and aim of Genesis is to get these students academically strong and Industry ready, hence bridging the ever existing gap between industry and academia by providing them state-of-the-art training in our facility and develop an urge in students to pursue this field further hence contributing to this expanding and developing world of life sciences.
                        </ParagraphPara>
                    </Paragraph>
                </ShortStoryParagraph>
                <ShortStoryParagraph>
                    <Paragraph>
                        <ParagraphScope>
                            MISSION
                        </ParagraphScope>
                        <ParagraphTitle>
                            Our Mission
                        </ParagraphTitle>
                        <ParagraphPara>
                            In this present day and age where the importance of life sciences is understood and weighed in with every passing moment, to contribute to society in any way possible is an achievement on its own. To be able to guide and get the future soldiers of life sciences ready to make immense and massive contributions is a dream that genesis strive towards.
                        </ParagraphPara>
                    </Paragraph>
                </ShortStoryParagraph>
            </ShortStory>
        </div>
    );
}