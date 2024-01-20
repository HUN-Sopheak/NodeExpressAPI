const crypto = require('crypto');

const generateSecretKey = () => {
  // Generate a random buffer using the crypto module
  const buffer = crypto.randomBytes(32);

  // Convert the buffer to a hexadecimal string
  const secretKey = buffer.toString('hex');

  console.log('\x1b[32m'+secretKey+'\x1b[0m');

  return secretKey;
};

module.exports = generateSecretKey();
