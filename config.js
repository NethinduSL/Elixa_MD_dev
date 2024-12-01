const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

module.exports = {

//╭──────────────────────Main──────────────────────╮//   
    SESSION_ID: process.env.SESSION_ID || "BB4RXLxJ#KBWbuk1Ex9p8JdVRtgGc2D-K_VUSQB2rNHcdtL-z3cY",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/261c717e5e4f165712ec4.png",
    ALIVE_MSG: process.env.ALIVE_MSG || "Elixs Is Alive Nox👍🇱🇰✅ ",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    OWNER: process.env.OWNER || "Your Name",
    MODE: process.env.MODE || "public",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94763936166",
//╰────────────────────────────────────────────────╯//

//╭──────────────────────Auto──────────────────────╮//
    AUTO_REPLY: process.env.AUTO_REPLY || "true",
    AUTO_STICKER: process.env.AUTO_STICKER || "true",
    AUTO_VOICE: process.env.AUTO_VOICE || "true",
//╰────────────────────────────────────────────────╯//

    
};
