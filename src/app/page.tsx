import { Story, StoryImage, StoryParagraph } from "@/components/ui/text/story";
import { Paragraph, ParagraphScope, ParagraphTitle, ParagraphPara } from "@/components/ui/text/paragraph";
import OptimisedImage from "@/components/ui/image/OptimisedImage";
import ImageFrame from "@/components/ui/util/imageFrame/imageFrame";
import Link from "next/link";
import Button from "@/components/ui/util/button";
import NoticeBoard from "@/components/noticeBoard";

export default function Home() {
  return (
    <div>
      <Story>
        <StoryImage>
          <ImageFrame>
            <OptimisedImage
              src="home_about.jpg"
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
              <Link href="/story/">
                <Button>Read Full Story</Button>
              </Link>
            </ParagraphPara>
          </Paragraph>
        </StoryParagraph>
      </Story>
      <NoticeBoard/>
    </div>
  );
}