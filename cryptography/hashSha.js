const { createHash } = require('crypto');

// HAshes are not very secure
function hash(input) {
    // return createHash('sha256').update(input).digest('base64') // not so secure
    return createHash('sha256').update(input).digest('hex');
}

let password = "heleb-mub";
const hash1 = hash(password);

password = "heleb-mub";
const hash2 = hash(password)
const match = hash1 === hash2;

console.log("hash1-->", password);
console.log("hash1-->", hash1);
console.log("HAsh does not work becuase it returns the same hashed value the hole time so there is a database will salt values for commmon passwords");

console.log(match ? "✅ good password" : '❌ password does not match');