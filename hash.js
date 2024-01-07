const fs = require('fs');
const { Worker, isMainThread, workerData } = require('worker_threads');

const numThreads = 10;
const passwordsPerThread = 5000;
const passwordLength = 8;
const filename = 'password_dataset.txt';

function generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/';
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    return password;
}
function runWorker() {
    const passwords = new Set();

    for (let i = 0; i < passwordsPerThread; i++) {
        let password;
        do {
            password = generateRandomPassword(passwordLength);
        } while (passwords.has(password)); 

        passwords.add(password);
    }

    return Array.from(passwords);
}

function runEverySecond() {
    setInterval(() => {
        const promises = [];

        for (let i = 0; i < numThreads; i++) {
            const workerPromise = new Promise((resolve) => {
                const worker = new Worker(__filename, { workerData: {} });
                worker.on('message', (result) => {
                    resolve(result);
                });
            });

            promises.push(workerPromise);
        }

        Promise.all(promises).then((results) => {
            const allPasswords = results.flat();
            const data = allPasswords.map((password) => `${new Date().toISOString()}: ${password}`).join('\n');
            fs.appendFile(filename, data + '\n', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log(`Passwords have been written to ${filename}`);
                }
            });
        });
    }, 1000);
}
if (isMainThread) {
    runEverySecond();
} else {
    const passwords = runWorker();
    parentPort.postMessage(passwords);
}
