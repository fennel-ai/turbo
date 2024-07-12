import * as path from 'node:path';

function randomString(length: number, chars = 'aA!#') {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$_?./';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

export const createFennelToken = async (appName: string): Promise<string> => {
    if (!process.env.FENNEL_ENDPOINT) {
        throw new Error("No fennel endpoint provided.")
    }
    if (!process.env.FENNEL_TOKEN) {
        throw new Error("No fennel token provided.")
    }

    const res = await fetch(path.join(process.env.FENNEL_ENDPOINT, 'playground', 'init'), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.FENNEL_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name: "Playground",
            last_name: "User",
            email: `${appName.replace('fennel-', '')}@fennel.ai`,
            password: randomString(12)
        })
    });

    const { token } = await res.json();
    
    if (!token) {
        throw new Error("Token creation failed.")
    } 

    return token 
}