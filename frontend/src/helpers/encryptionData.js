// Encryption helper functions
export const encryptData = (data) => {
    const encodedData = btoa(JSON.stringify(data));
    
    return encodedData;
  };
  
  export const decryptData = (encodedData) => {
    const decodedData = atob(encodedData);
   
    return JSON.parse(decodedData);
  };