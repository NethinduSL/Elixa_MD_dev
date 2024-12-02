const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');  // Fixed the typo 'requir' to 'require'

cmd({
    pattern: "system",
    desc: "About Elixa",
    alias: ["status", "elixas", "botinfo","info"],  // Fixed 'alial' to 'alias' and added a missing double quote
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


cmd({
    pattern: "repo",
    desc: "About Elixa git",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {


let elixs = await axios.get(`https://api.github.com/repos/Eboxsl/Elixa_MD`);


let elixa = "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺\n";
elixa += `👤 Owner: ${elixa.data.login}\n\n`;
elixa += `📦 Repository Name: ${elixa.data.name}\n`;
elixa += `🔤 Full Name: ${elixa.data.full_name}\n`;
elixa += `✨ Description: ${elixa.data.description}\n`;
elixa += `💻 Language: ${elixa.data.language}\n`;
elixa += `🍴 Fork Count: ${elixa.data.forks_count}\n`;
elixa += `👀 Watchers Count: ${elixa.data.watchers_count}\n`;
elixa += `⭐ Star Count: ${elixa.data.stargazers_count}\n`;
elixa += `🛠️ Open Issues: ${elixa.data.open_issues_count}\n`;
elixa += `🌐 Visibility: ${elixa.data.visibility}\n`;
elixa += `📅 Created At: ${elixa.data.created_at}\n`;
elixa += `⏰ Updated At: ${elixa.data.updated_at}\n`;
elixa += `🚀 Pushed At: ${elixa.data.pushed_at}\n`;
elixa += `🔍 Owner Profile URL: ${elixa.data.owner.html_url}\n`;
elixa += `🖼️ Owner Avatar: ${elixa.data.owner.avatar_url}\n`;
elixa += `🔗 URL: ${elixa.data.html_url}\n`;




let cap="\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺"

await conn.sendMessage(m.chat, { text: elixa }, { quoted: m });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
