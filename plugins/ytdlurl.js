const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
        pattern: "yt",
        desc: "Download YouTube video or information.",
        category: "downloader",
        react :"🔮",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        if (!q) return reply("Please provide a valid YouTube URL.");

        try {
            // Fetching data from the API
            const { data } = await axios.get(`https://temp.giftedapis.us.kg/api/download/ytdl?url=${q}&apikey=gifted`);
            
            // Sending the fact
            await reply(`*Title:* ${data.title}\n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘅𝗮 ‐𝝡𝗗༺`);
            
            // Reacting to the message
            await conn.sendMessage(from, {
                react: { text: '🎞️', key: mek.key } // Reacting to the command message
            });

        } catch (error) {
            console.log(error);
            return reply("Sorry, there was an error fetching the data.");
        }
    }
);
