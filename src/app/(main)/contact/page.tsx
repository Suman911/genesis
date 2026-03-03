import { CMdescription, CMIcon, CMtitle, Contact, Contactcard, ContactMethod } from "@/components/ui/contact/contactcard";
import { Heading, TopHeading, MainHeading } from "@/components/ui/text/heading";
import Map from "@/components/ui/util/imageFrame/map";
import { IoMdCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import ContactForm from "@/components/ui/contact/contactform";

export default function Page() {
    return (
        <section >
            <Heading>
                <TopHeading pageTitle="Contact Us"/>
                <MainHeading>
                    Contact For Any Query
                </MainHeading>
            </Heading>
            <Contact>
                <ContactForm className="lg:order-2" />
                <Contactcard className="lg:order-1 mt-10 lg:mt-0">
                    <ContactMethod>
                        <Map src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.91926173092!2d88.3466691!3d22.656798700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d1fd4952e8b%3A0x8e3cda34365aa24!2sGenesis!5e0!3m2!1sen!2sin!4v1772359516637!5m2!1sen!2sin" />
                        <CMdescription>
                            5/A/1, Shib Narayan Rd, Kotrung,
                            Uttarpara, West Bengal 712258
                        </CMdescription>
                    </ContactMethod>
                    <ContactMethod>
                        <CMtitle>
                            <CMIcon>
                                <IoMdCall />
                            </CMIcon>
                            Mobile
                        </CMtitle>
                        <CMdescription>
                            +91-86974-58798
                        </CMdescription>
                    </ContactMethod>
                    <ContactMethod>
                        <CMtitle>
                            <CMIcon>
                                <HiOutlineMail />
                            </CMIcon>
                            Email
                        </CMtitle>
                        <CMdescription>
                            mitragenesis@gmail.com
                        </CMdescription>
                    </ContactMethod>
                </Contactcard>
            </Contact>
        </section>
    );
}