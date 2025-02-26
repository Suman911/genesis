import { CMdescription, CMIcon, CMtitle, Contact, Contactcard, ContactMethod } from "@/components/ui/contact/contactcard";
import { Heading, TopHeading, MainHeading } from "@/components/ui/text/heading";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import Contactform from "@/components/ui/contact/contactform";

export default function Page() {
    return (
        <div>
            <Heading>
                <TopHeading>
                    Contact Us
                </TopHeading>
                <MainHeading>
                    Contact For Any Query
                </MainHeading>
            </Heading>
            <Contact>
                <Contactcard>
                    <ContactMethod>
                        <CMIcon>
                            <FaMapLocationDot />
                        </CMIcon>
                        <CMdescription>
                            5/A/1, Shib Narayan Rd, Kotrung,
                            Uttarpara, West Bengal 712258
                        </CMdescription>
                    </ContactMethod>
                    <ContactMethod>
                        <CMIcon>
                            <IoMdCall />
                        </CMIcon>
                        <CMtitle>
                            Mobile
                        </CMtitle>
                        <CMdescription>
                            +91-86974-58798
                        </CMdescription>
                    </ContactMethod>
                    <ContactMethod>
                        <CMIcon>
                            <HiOutlineMail />
                        </CMIcon>
                        <CMtitle>
                            Email
                        </CMtitle>
                        <CMdescription>
                            mitragenesis@gmail.com
                        </CMdescription>
                    </ContactMethod>
                </Contactcard>
                <Contactform />
            </Contact>
        </div>
    );
}