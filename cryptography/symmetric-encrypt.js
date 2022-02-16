const { createCipheriv, randomBytes, createDecipheriv} = require('crypto');

const message = "I like turtles";
const key = randomBytes(32);
const iv = randomBytes(16);

const cipher = createCipheriv('aes256', key, iv);

// Encrypt
const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');

// Decrtypt
const decipher = createDecipheriv('aes256', key, iv);
const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8');

console.log(`Encrypted Message: ${encryptedMessage}`);
console.log(`Decrypted Message: ${decryptedMessage}`);