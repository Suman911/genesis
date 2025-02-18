import { CMdescription, CMIcon, CMtitle, Contact, Contactcard, ContactMethod } from "@/components/ui/contact/contactcard";
import { Heading, TopHeading, MainHeading } from "@/components/ui/text/heading";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import {Form, FormBody, FormBtn, Formtitle} from "@/components/ui/contact/form";
export default function Page() {
    return (
        <>
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
                            8697458798
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
                            info@genesislifesciences.org.in
                        </CMdescription>
                    </ContactMethod>
                </Contactcard>
                <Form>
                    <Formtitle>
                    Send us a message
                    </Formtitle>
                    <FormBody>
                        hibrew
                    </FormBody>
                    <FormBtn>
                        Submit
                    </FormBtn>
                </Form>
            </Contact>
        </>
    );
}