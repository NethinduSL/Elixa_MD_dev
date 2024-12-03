const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson, getBuffer } = require('../lib/functions');

cmd({
    pattern: "qr",
    category: "converter",
    react: "📎",
    filename: __filename,
    desc: "Sends QR code of text"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (args.length === 0) {
            return reply("Please provide the text to generate the QR code.");
        }

        const text = args.join(" ");
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
        const buffer = await getBuffer(qrCodeUrl);

        await conn.sendMessage(from, { image: buffer, caption: `Here is your QR code for: ${text}` }, { quoted: mek });
    } catch (e) {
        console.error(e);
        mek.reply("An error occurred while generating the QR code. Please try again.");
    }
});
