const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID, || "UVIgQIyQ#hnBmpp1VptZRsDjKJD5qojbsbHPZAVXjRK4NH-lP1U4",
ALIVE_IMG: process.env.ALIVE_IMG || "",
ALIVE_MSG: process.env.ALIVE_MSG || "Elix Is Alivwme👍🇱🇰✅",
};