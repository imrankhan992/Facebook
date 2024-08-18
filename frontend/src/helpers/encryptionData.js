// Encryption helper functions
export const encryptData = (data) => {
  const encodedData = btoa(JSON.stringify(data));

  return encodedData;
};

export const decryptData = (encodedData) => {
  if (!encodedData) return null;
  const decodedData = atob(encodedData);
  return JSON.parse(decodedData);
};