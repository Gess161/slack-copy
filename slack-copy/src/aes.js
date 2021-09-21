 
const aes256 = require("aes256");
const secret_key = "uI2ooxtwHeI6q69PS98fx9SWVGbpQohO";

export const to_Encrypt = (text) => {
  const encrypted = aes256.encrypt(secret_key, text);
  return encrypted;
};
export const to_Decrypt = (cipher, username) => {
  if (cipher.startsWith("Welcome")) {
    return cipher;
  }

  if (cipher.startsWith(username)) {
    return cipher;
  }

  const decrypted = aes256.decrypt(secret_key, cipher);
  return decrypted;
};