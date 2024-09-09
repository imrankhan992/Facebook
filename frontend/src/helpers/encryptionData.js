// Encryption helper functions
export const encryptData = (data) => {
  if(!data) return null;
  const encodedData = btoa(JSON.stringify(data));
  return encodedData;
};

export const decryptData = (encodedData) => {
  if (!encodedData) return null;
  const decodedData = atob(encodedData);
  return JSON.parse(decodedData);
};