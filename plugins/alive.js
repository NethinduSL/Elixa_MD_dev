const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');

cmd({
    pattern: "alive",
    desc: "Check if the bot is online.",
    category: "main",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, pushname, reply
}) => {
    try {
        const Alive = `
╭ ❰ *ɪᴍ*  𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗 ❱❱
┃
┃ *ʜɪ*  ${pushname} *ɪ'ᴍ ᴀʟɪᴠᴇ* 
┃
┃⦁✅ *ʀᴜɴᴛɪᴍᴇ*: ${runtime(process.uptime())}
┃⦁🖥️ *ʀᴀᴍ* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem() / 1024 / 1024)} MB
┃ *⦁👩‍💻ᴄʀᴇᴀᴛᴏʀ* : Nethindu Thaminda
┃⦁🤝 *ᴏᴡɴᴇʀ* : ${config.OWNER}
┃
╰═══════════════

> 𝙰𝙻𝙻 𝙼𝙴𝙽𝚄

┃ *.𝚖𝚎𝚗𝚞* 📃
┃ *.𝚖𝚊𝚒𝚗𝚖𝚎𝚗𝚞* ✅  
┃ *.𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚖𝚎𝚗𝚞* ⬇️  
┃ *.𝚐𝚛𝚘𝚞𝚙𝚖𝚎𝚗𝚞*  👥  
┃ *.𝚐𝚊𝚖𝚎𝚜𝚖𝚎𝚗𝚞* 🎮  
┃ *.𝚊𝚒𝚖𝚎𝚗𝚞*  🦾  
┃ *.𝚊𝚍𝚖𝚒𝚗𝚖𝚎𝚗𝚞* 🧑‍💻  
┃ *.𝚜𝚎𝚛𝚌𝚑𝚖𝚎𝚗𝚞* 🔎  
┃ *.𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚎𝚛𝚖𝚎𝚗𝚞* 🧪  
┃ *.𝚏𝚞𝚗𝚖𝚎𝚗𝚞* 🤗  
┃ *.𝚘𝚠𝚗𝚎𝚛𝚖𝚎𝚗𝚞* ❤️
╰═══════════════
> 𝗯𝘆 𝗕𝗜𝗧 𝘅 ᵀᴹ

> *ꜰʀᴏᴍ 🇱🇰 ʙʏ ᴇʙᴏx❤️*

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`;

        const Alive2 = `

╭ ❰ *ɪᴍ*  𝗘ꟾ𝖎✘𝗮 ‐𝙳𝙰𝚁𝙺 ❱❱
┃
┃ *ʜɪ*  ${pushname} *𝙸'𝙼 𝚁𝙴𝙳𝚈 𝚃𝙾 𝙷𝚄𝙽𝚃* 
┃
┃⦁🖥️ *ʀᴀᴍ* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem() / 1024 / 1024)} MB
┃ *⦁👩‍💻ᴄʀᴇᴀᴛᴏʀ* : Nethindu Thaminda
┃⦁🤝 *ᴏᴡɴᴇʀ* : ${config.OWNER}
┃
╰═══════════════

> 𝙰𝙻𝙻 𝙼𝙴𝙽𝚄𝚂

┃ *.𝚖𝚎𝚗𝚞* 📃
┃ *.𝚖𝚊𝚒𝚗𝚖𝚎𝚗𝚞* ✅  
┃ *.𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚖𝚎𝚗𝚞* ⬇️  
┃ *.𝚐𝚛𝚘𝚞𝚙𝚖𝚎𝚗𝚞*  👥  
┃ *.𝚐𝚊𝚖𝚎𝚜𝚖𝚎𝚗𝚞* 🎮  
┃ *.𝚊𝚒𝚖𝚎𝚗𝚞*  🦾  
┃ *.𝚊𝚍𝚖𝚒𝚗𝚖𝚎𝚗𝚞* 🧑‍💻  
┃ *.𝚜𝚎𝚛𝚌𝚑𝚖𝚎𝚗𝚞* 🔎  
┃ *.𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚎𝚛𝚖𝚎𝚗𝚞* 🧪  
┃ *.𝚏𝚞𝚗𝚖𝚎𝚗𝚞*   
┃ *.𝚘𝚠𝚗𝚎𝚛𝚖𝚎𝚗𝚞* 
╰═══════════════
> 𝗯𝘆 𝗕𝗜𝗧 𝘅 ᵀᴹ

> *ꜰʀᴏᴍ 🇱🇰 ʙʏ ᴇʙᴏx❤️*

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺

`;

        if (config.ALIVE_MODE === "elixa") {
            await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: Alive }, { quoted: mek });
        } else if (config.ALIVE_MODE === "hack") {
            await conn.sendMessage(from, { image: { url: "https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/hack.png" }, caption: Alive2 }, { quoted: mek });
        } else {
            reply("Invalid ALIVE_MODE in config.js. Please set it to 'elixa' or 'hack'.");
        }

        await conn.sendMessage(from, { react: { text: '❤️', key: mek.key } });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
