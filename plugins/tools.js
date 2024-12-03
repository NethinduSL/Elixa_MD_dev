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
async (Void, citel, text) => {
    try {
        if (!text) return citel.reply("Please provide text to generate the QR code.");
        let qrelixa = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${q}`);
        
        await Void.sendMessage(citel.chat, {
            image: qrelixa,
            caption: "> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺",
        }, { quoted: citel });
    } catch (e) {
        console.error(e);
        citel.reply("An error occurred while generating the QR code. Please try again.");
    }
});
