const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');



cmd 
({
    pattern: "qr",
    category: "owner",
    filename: __filename,
    desc: "Sends CitelsVoid QR code to scan and get your session ID."
},
async (Void, citel, text) => {
    if (!text) return citel.reply("Please provide text to generate the QR code.");
    let qrelixa = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${q}`);
    await Void.sendMessage(citel.chat, { image: qrelixa });
    
});




