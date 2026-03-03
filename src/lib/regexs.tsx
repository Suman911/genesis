export const regexs: { [key: string]: RegExp } = {
    name: /^[A-Za-z]{2,30}(?:\s[A-Za-z]{2,30}){0,2}$/, // up to 3 name parts
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
    phone: /^\+?[0-9]{7,15}$/, // international-friendly numeric phone
};