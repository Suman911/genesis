"use client"

import React, { useState, useEffect } from "react";
import { Input, TextGrid2 } from "@/components/ui/form/input";
import { TextArea } from "@/components/ui/form/textarea";
import { validateValue, validateMessage } from "../form/validation";
import Turnstile, {TurnstileAPI} from "../form/turnstile";
import Button from "@/components/ui/util/button";
import Axios from "@/utils/Axios";
import ErrorAlert from "@/components/ui/util/errorAlert";
import SuccessAlert from "@/components/ui/util/successAlert";

declare global {
	interface Window {
		turnstile?: TurnstileAPI;
	}
}

export default function ContactForm({ className = "", ...props }) {
    const [name, setName] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    

    useEffect(() => {
        setIsMounted(true);
    }, []);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [turnstileToken, setTurnstileToken] = useState("");
    const [turnstileError, setTurnstileError] = useState<string | null>(null);

    const [nameError, setNameError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [subjectError, setSubjectError] = useState<string | null>(null);
    const [messageError, setMessageError] = useState<string | null>(null);

    const [submitting, setSubmitting] = useState(false);
    const MinMessageLength = 50;
    const MaxMessageLength = 500;

    const makeOnChange = (field: string, setter: (v: string) => void, setErr: (m: string | null) => void) => (val: string) => {
        setter(val);
        const trimmed = val.trim();
        if (trimmed === "") {
            setErr(null);
            return;
        }
        const res = field === "message"
            ? validateMessage(trimmed, MinMessageLength, MaxMessageLength)
            : validateValue(trimmed, field);

        setErr(res.valid ? null : res.message ?? "Invalid");
    };

    const submitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        const checks: [string, string, (m: string | null) => void][] = [
            [name, "name", setNameError],
            [phone, "phone", setPhoneError],
            [email, "email", setEmailError],
            [subject, "subject", setSubjectError],
            [message, "message", setMessageError],
        ];

        const results = checks.map(([val, field, setErr]) => {
            const trimmed = val.trim();
            if (trimmed === "") {
                setErr("Please enter something");
                return false;
            }
            const res = field === "message"
                ? validateMessage(trimmed, MinMessageLength, MaxMessageLength)
                : validateValue(trimmed, field);

            setErr(res.valid ? null : res.message ?? "Invalid");
            return res.valid;
        });
        let ok = results.every(Boolean);
        if (!turnstileToken) {
            setTurnstileError("Please complete the captcha");
            ok = false;
        } else {
            setTurnstileError(null);
        }
        if (ok) {
            try {
                await Axios.post("/contact", { name, phone, email, subject, message, token: turnstileToken });
                // success: clear form, reset turnstile and show success alert
                setName("");
                setPhone("");
                setEmail("");
                setSubject("");
                setMessage("");
                setTurnstileToken("");
                // reset cloudflare widget if available
                try { window.turnstile?.reset?.(); } catch {}
                setSuccessMessage("Message sent — we'll contact you soon.");
                setSuccessOpen(true);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to submit contact form");
            }
        } else {
            console.log("Form validation failed");
        }
        setSubmitting(false);
    };

    if (!isMounted) {
        // skeleton mimicking the form fields to reduce layout shift
        return (
            <div className={`col-span-7 ${className}`} {...props}>
                <div className="p-2 md:p-4 lg:p-6 h-full animate-pulse">
                    <div className="text-center text-3xl pt-6">Send us a message</div>
                    <div className="w-full px-2 sm:px-12 py-6 space-y-4">
                        <div className="md:grid grid-cols-2 gap-1">
                            <div className="h-12 bg-gray-300 rounded" />
                            <div className="h-12 bg-gray-300 rounded" />
                        </div>
                        <div className="h-12 bg-gray-300 rounded" />
                        <div className="h-12 bg-gray-300 rounded" />
                        <div className="h-32 bg-gray-300 rounded" />
                    </div>
                    <div className="flex w-full px-2 sm:px-12">
                        <Button className="w-full sm:w-1/2 m-auto px-5 py-3"
                            disabled={submitting}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
        <ErrorAlert message={error} onClose={()=> setError("")}/>
        <SuccessAlert open={successOpen} message={successMessage} onClose={() => setSuccessOpen(false)} />
            <div className={`col-span-7 ${className}`} {...props}>
                <form className="p-2 md:p-4 lg:p-6 h-full" onSubmit={submitForm}>
                    <div className="text-center text-3xl pt-6">Send us a message</div>
                    <div className="w-full px-2 sm:px-12 py-6">
                        <TextGrid2>
                            <Input name="name" placeholder="Your Name" type="text" value={name} onChange={makeOnChange("name", setName, setNameError)} error={nameError} />
                            <Input name="phone" placeholder="Your Number" type="text" value={phone} onChange={makeOnChange("phone", setPhone, setPhoneError)} error={phoneError} />
                        </TextGrid2>
                        <Input name="email" placeholder="Your Email" type="email" value={email} onChange={makeOnChange("email", setEmail, setEmailError)} error={emailError} />
                        <Input name="subject" placeholder="Subject" type="text" value={subject} onChange={makeOnChange("subject", setSubject, setSubjectError)} error={subjectError} />
                        <div className="relative">
                            <TextArea className="pb-5 scrollbar-none" name="message" placeholder="Message" value={message} onChange={makeOnChange("message", setMessage, setMessageError)} error={messageError} />
                            <div className={`text-sm absolute bottom-8 right-5
                            ${messageError && message.length > MaxMessageLength
                                    ? 'text-red-500' : 'text-gray-500'}`}
                            >
                                {message.length}/{MaxMessageLength}
                            </div>
                        </div>
                        <div className="pt-4">
                            <Turnstile
                                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY ?? ""}
                                onVerify={(t: string) => { setTurnstileToken(t); setTurnstileError(null); }}
                                onExpire={() => { setTurnstileToken(""); setTurnstileError("Turnstile expired, please retry"); }}
                                theme="light"
                            />
                            {turnstileError && <div className="text-sm text-red-600 mt-2">{turnstileError}</div>}
                        </div>
                    </div>
                    <div className="flex w-full px-2 sm:px-12">
                        <Button className="w-full sm:w-1/2 m-auto px-5 py-3"
                            disabled={submitting}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}