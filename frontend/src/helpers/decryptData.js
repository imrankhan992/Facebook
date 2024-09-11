import CryptoJS from 'crypto-js';

// Use the same secret key derivation method as on the backend
const secretKey = CryptoJS.SHA256("your-fixed-secret-key-in-hex").toString(CryptoJS.enc.Base64).substr(0, 32);

export const decryptData = (encryptedData) => {
  try {
    // Split the encrypted data into IV and ciphertext parts
    const [ivHex, encryptedText] = encryptedData.split(':');

    // Convert IV and encrypted text to appropriate formats
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedText);

    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedBytes },
      CryptoJS.enc.Utf8.parse(secretKey), // parse secretKey to UTF-8
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    // Convert decrypted result into a UTF-8 string
    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
    // Parse the decrypted data as JSON
    return JSON.parse(decryptedStr);
  } catch (error) {
    return null;
  }
};
