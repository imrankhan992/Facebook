const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; 
const secretKey = crypto.createHash('sha256').update(process.env.ENCRYPTION_SECRET_KEY).digest('base64').substr(0, 32);
const iv = crypto.randomBytes(16); 

// Function to encrypt data
exports.encrypt = (data) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  // Return encrypted data along with the IV (used for decryption)
  return iv.toString('hex') + ':' + encrypted;
}
