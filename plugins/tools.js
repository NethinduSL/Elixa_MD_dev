const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson, getBuffer } = require('../lib/functions');

cmd({
    pattern: "qr",
    category: "converter",
    react : "📎",
    filename: __filename,
    desc: "Sends QR code of text"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return mek.reply("Please provide text to generate the QR code.");
        
        // Generate QR code URL
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(q)}`;
        
        // Send the image message
        await conn.sendMessage(mek.chat, {
            image: { url: qrUrl }, // Corrected image URL format
            caption: "> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺",
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        mek.reply("An error occurred while generating the QR code. Please try again.");
    }
});
