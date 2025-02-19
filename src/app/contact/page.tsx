import { CMdescription, CMIcon, CMtitle, Contact, Contactcard, ContactMethod } from "@/components/ui/contact/contactcard";
import { Heading, TopHeading, MainHeading } from "@/components/ui/text/heading";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { Form, FormBody, FormBtn, Formtitle } from "@/components/ui/form/form";
import { TextBox, TextGrid2 } from "@/components/ui/form/textbox";

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
                <Form>
                    <Formtitle>
                        Send us a message
                    </Formtitle>
                    <FormBody>
                        <TextGrid2>
                            <TextBox id="name" placeholder="Your Name" />
                            <TextBox id="email" placeholder="Your Email" />
                        </TextGrid2>
                        <TextBox placeholder="subject" />
                        <TextBox placeholder="message" />
                    </FormBody>
                    <FormBtn>
                        Submit
                    </FormBtn>
                </Form>
            </Contact>
        </div>
    );
}