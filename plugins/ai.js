const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "gemini",
    desc: "Chat GPT 4.",
    category: "ai",
    react :"💫",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/gemini?q=${q}`);
        return reply(`${data.BK9}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


cmd({
    pattern: "llama",
    desc: "Chat GPT 4.",
    category: "ai",
    react :"💫",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/llama?q=${q}`);
        return reply(`${data.BK9}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


cmd({
    pattern: "jeeves",
    desc: "Chat GPT 4.",
    category: "ai",
    react :"💫",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/blackbox?q=${q}`);
        return reply(`${data.BK9}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


cmd({
    pattern: "blackbox",
    desc: "Chat GPT 4.",
    category: "ai",
    react :"💫",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/jeeves-chat?q=${q}`);
        return reply(`${data.BK9}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
