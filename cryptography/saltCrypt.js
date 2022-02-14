const { timingSafeEqual } = require("crypto");

const {scryptSync, randomByte}

function signup(email, password) {
    const salt = randomByte(16).toString('hex');
     // 64 is the key length
    const hashedPassword = scryptSync(password, salt, 64);

    const user = {email, password: `${salt}:${hashedPassword}`}

    users.push(user)
    return user
}

function login(email, password) {
    const [salt, key] = user.password.split(':');
    // 64 is the key length
    const hashedBuffer = scryptSync(password, salt, 64);

    // Prevents timing attacks
    // Is when a hacker measures the time it takes to perform an operation
    // in order to obtain information about the value
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual();
}

// A salt is a random value that is added to the password before it is hashed
// Making it harder to guess