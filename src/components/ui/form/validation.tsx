import { regexs } from "@/lib/regexs";

export type ValidationResult = { valid: boolean; message?: string };

export function validateValue(value: string, field?: string): ValidationResult {
    const v = (value ?? "").toString().trim();
    if (v === "") return { valid: false, message: "Please enter something" };

    const key = (field || "").toString();
    if (key && Object.prototype.hasOwnProperty.call(regexs, key)) {
        const ok = regexs[key].test(v);
        return { valid: ok, message: ok ? undefined : `Please enter a valid ${key}` };
    }

    return { valid: true };
}

export default validateValue;

export function validateMessage(value: string, min = 50, max = 500): ValidationResult {
    const v = (value ?? "").toString().trim();
    if (v === "") return { valid: false, message: "Please enter a message" };

    if (v.length < min) return { valid: false, message: `Message must be at least ${min} characters` };
    if (v.length > max) return { valid: false, message: `Message must be at most ${max} characters` };

    // Allow letters, numbers, common punctuation and whitespace/newlines.
    // Uses Unicode property escapes to allow letters from any language.
    const messageRegex = /^[\p{L}\p{N}\s.,!?;:'"()\-–—\/\\@#%&*+=<>\[\]{}:\n\r]+$/u;
    const ok = messageRegex.test(v);
    return { valid: ok, message: ok ? undefined : "Message contains invalid characters" };
}
