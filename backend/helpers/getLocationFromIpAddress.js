const axios = require('axios');
// Function to get location from the user's IP
exports.getLocationFromIP = async (ip) => {
    try {
        const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=1306910f5aac1908e5b67e7ed8c1021e`);
        return response
    } catch (error) {
        console.error('Error getting location data', error);
        return null;
    }
};
exports.checkVpnConnectionOrProxy = async (ip) => {
    try {
        const response = await axios.get(`https://ipqualityscore.com/api/json/ip/NgIiSYPLS8CB9uz88Odf45YuaSsqeTW8/${ip}`);
        return response.data
    } catch (error) {
        console.error('Error while checking vpn', error);
        return null;
    }
};
