const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');  // Fixed the typo 'requir' to 'require'

cmd({
    pattern: "system",
    desc: "About Elixa",
    alias: ["status", "elixas", "botinfo"],  // Fixed 'alial' to 'alias' and added a missing double quote
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        let status = `
𝗥𝘂𝗻𝘁𝗶𝗺𝗲 :  ${runtime(process.uptime())}
𝗥𝗮𝗺 : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB  
𝗛𝗼𝘀𝘁 : ${os.hostname()}
𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : Nethindu Thaminda 
𝗢𝘄𝗻𝗲𝗿 : ${config.OWNER}  
> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        reply(status);  // Removed the single quotes around the status variable

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
