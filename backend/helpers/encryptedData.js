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


exports.decrypt = (encryptedData) => {
  // Extract the IV and encrypted data from the input
  const parts = encryptedData.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];

  // Create a decipher instance
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  // Parse the decrypted text from JSON
  return JSON.parse(decrypted);
}
