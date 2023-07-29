const { WebClient } = require("@slack/web-api");

//keep alive the connection
async function sendKeepAlivePing() {
    try {
        const res = await WebClient.apiCall('auth.test');
        console.log('Keep-alive ping successful:', res);
    } catch (error) {
        console.error('Keep-alive ping error:', error);
    }
}

module.exports = sendKeepAlivePing;