import * as path from 'node:path';

function generateRandomString() {
    const length = 8; // Minimum length of 8 characters
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "@$!%*?&_";
    const allChars = lowerCase + upperCase + numbers + symbols;

    let randomString = '';

    // Ensuring at least one lowercase character
    randomString += lowerCase[Math.floor(Math.random() * lowerCase.length)];

    // Ensuring at least one uppercase character
    randomString += upperCase[Math.floor(Math.random() * upperCase.length)];

    // Ensuring at least one number
    randomString += numbers[Math.floor(Math.random() * numbers.length)];

    // Ensuring at least one symbol
    randomString += symbols[Math.floor(Math.random() * symbols.length)];

    // Filling the rest of the string
    while (randomString.length < length) {
        randomString += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the string to ensure random distribution
    randomString = randomString.split('').sort(() => 0.5 - Math.random()).join('');

    return randomString;
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
            password: generateRandomString()
        })
    });

    const { token, detail } = await res.json();

    if (!token) {
        throw new Error(`Token creation failed: ${detail}`)
    }

    return token 
}