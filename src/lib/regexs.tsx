export const regexs: { [key: string]: RegExp }  =
{
    name: /^[a-zA-Z]{2,30}(?:\s[a-zA-z]{2,30})?(?:\s[a-zA-Z]{2,30})?$/,
    email: /^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9]).[a-z0-9]{2,10}(?:.[a-z]{2,10})?$/
}