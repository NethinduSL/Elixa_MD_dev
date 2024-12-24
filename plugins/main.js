const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');
const axios = require('axios');

cmd({
    pattern: "system",
    desc: "About Elixa",
    alias: ["status", "elixas", "botinfo", "info"],
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

        reply(status);
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

//╭──────────────────────fact──────────────────────╮//

cmd({
    pattern: "repo",
    desc: "About Elixa git",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let elixs = await axios.get('https://api.github.com/repos/Eboxsl/Elixa_MD');
        let elixa = "╭❰𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺❱❱\n";
        elixa += `┃👤 Owner: ${elixs.data.owner.login}\n┃\n`;
        elixa += `┃📦 Repository Name: ${elixs.data.name}`;
        elixa += `┃🔤 Full Name: ${elixs.data.full_name}`;
        elixa += `┃✨ Description: ${elixs.data.description}`;
        elixa += `┃💻 Language: ${elixs.data.language}`;
        elixa += `┃🍴 Fork Count: ${elixs.data.forks_count}`;
        elixa += `┃👀 Watchers Count: ${elixs.data.watchers_count}`;
        elixa += `┃⭐ Star Count: ${elixs.data.stargazers_count}`;
        elixa += `┃🛠️ Open Issues: ${elixs.data.open_issues_count}`;
        elixa += `┃🌐 Visibility: ${elixs.data.visibility}`;
        elixa += `┃📅 Created At: ${elixs.data.created_at}`;
        elixa += `┃⏰ Updated At: ${elixs.data.updated_at}`;
        elixa += `┃🚀 Pushed At: ${elixs.data.pushed_at}`;
        elixa += `┃🔍 Owner Profile URL: ${elixs.data.owner.html_url}`;
        elixa += `┃🖼️ Owner Avatar: ${elixs.data.owner.avatar_url}`;
        elixa += `┃🔗 URL: ${elixs.data.html_url}\n┃\n╰═══════════════`;

        await conn.sendMessage(m.chat, { text: elixa }, { quoted: m });
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

//╭──────────────────────fact──────────────────────╮//

cmd({
    pattern: "jid",
    desc: "Get the JID of the current chat",
    category: "main",
    react: "📘",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Get the JID (Jabber ID) of the chat
        const jid = m.chat;

        // Send the JID as a message
        await conn.sendMessage(m.chat, { text: '📍 *Chat JID: ' + jid + '*'\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺ });
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});



cmd({
    pattern: "config",
    react:"🕹️",
    category: "utility",
    filename: __filename,
    desc: "Sends the configuration file variables"
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Importing the config file
        

        // Formatting the config data for display
        const configData = Object.entries(config)
            .map(([key, value]) => `*${key}* : ${value}`)
            .join('\n');

        // Sending the formatted configuration
        await reply(`*Configuration Data:*\n\n${configData}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (error) {
        console.error(error);
        reply("An error occurred while fetching the configuration. Please try again.");
    }
});
