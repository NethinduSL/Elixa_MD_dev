const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
        pattern: "Nt",
        desc: "Download YouTube video or information.",
        category: "downloader",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {

        try {
            const { data } = await axios.get(`https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/publicconfig.js`);
            await reply(`*Title:* ${data.NT}\n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘅𝗮 ‐𝝡𝗗༺`);
            await conn.sendMessage(from, {
                react: { text: '🎞️', key: mek.key }
            });
        } catch (error) {
            await reply("An error occurred while processing the request.");
        }
    }
);
