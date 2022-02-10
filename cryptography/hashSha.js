const { createHash } = require('crypto');

function hash(input) {
    // return createHash('sha256').update(input).digest('base64')
    return createHash('sha256').update(input).digest('hex');
}

let password = "heleb-mub";
const hash1 = hash(password);

password = "heleb-mub";
const hash2 = hash(password)
const match = hash1 === hash2;

console.log("hash1-->", password);
console.log("hash1-->", hash1);

console.log(match ? "✅ good password" : '❌ password does not match');