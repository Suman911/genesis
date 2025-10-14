import { regexs } from "@/lib/regexs";
import { RefObject } from "react";
export type ValidatorFunction = (
    inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>,
    messageRef: RefObject<HTMLParagraphElement | HTMLDivElement | null>
) => void;

export const validate = (txtbox: RefObject<HTMLInputElement | HTMLTextAreaElement | null>, msgbox: RefObject<HTMLParagraphElement | HTMLDivElement | null>) => {
    const curr = txtbox.current
    const isEmpty = curr?.value === '';
    curr?.classList.toggle('!border-red-600', isEmpty);
    if (msgbox?.current) {
        msgbox.current.textContent = 'Please enter something';
        msgbox.current.classList.toggle('hidden', !isEmpty);
    }
    const id = curr?.id || '';
    if (Object.keys(regexs).includes(id)) {
        // check regex
        const regex = regexs[id];
        const isValid = curr?.value.match(regex) !== null;
        // Toggle the border color based on validation
        curr?.classList.toggle('!border-red-600', !isValid);
        curr?.classList.toggle('!border-green-400', isValid);

        // Toggle the visibility of the error message
        if (msgbox?.current) {
            msgbox.current.textContent = `Please enter your correct ${curr?.id}`;
            msgbox.current.classList.toggle('hidden', isValid);
        }
    }
}