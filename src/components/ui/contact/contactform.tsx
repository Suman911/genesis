"use client"
import { Form, FormBody, FormBtn, Formtitle } from "@/components/ui/form/form";
import { Input, TextGrid2 } from "@/components/ui/form/input";
import { TextArea } from "@/components/ui/form/textarea";
import { useRef } from "react";
import { validate } from "../form/validation";
export default function Contactform({ }) {
    const name=useRef(null)
    const email=useRef(null)
    const subject=useRef(null)
    const message=useRef(null)
    return (
        <>
            <Form>
                <Formtitle>
                    Send us a message
                </Formtitle>
                <FormBody>
                    <TextGrid2>
                        <Input ref={name} name="name" placeholder="Your Name" type="text" validator={validate}/>
                        <Input ref={email} name="email" placeholder="Your Email" type="text" validator={validate}  />
                    </TextGrid2>
                    <Input ref={subject} placeholder="subject" type="text" name={""} validator={validate}/>
                    <TextArea ref={message} placeholder="message" textbox={message} validate={validate} />
                </FormBody>
                <FormBtn>
                    Submit
                </FormBtn>
            </Form>
        </>
    );
}