const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
        pattern: "yt",
        desc: "Sends a fact in chat.",
        category: "downloder",
        react :"🔮",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        const { data } = await axios.get(`https://temp.giftedapis.us.kg/api/download/ytdl?url=${q}?feature=shared&apikey=gifted`);
        return reply(`*Fact:* ${data.title}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    }
);

