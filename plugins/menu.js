const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "menu",
    desc: "Menu of Elixa",
    category: "main",
    react :"📃",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let menu = {
            main: '',
            download: '',
            group: '',
            games: '',
            ai: '',
            admin: '',
            search: '',
            converter: '',
            fun:''

        };

        for (let i = 0; i < commands.length; i++) {
            if (commands[i].pattern && !commands[i].dontAddCommandList) {
                menu[commands[i].category] += `.${commands[i].pattern}\n│`;
            }
        }

        let Elixamenu = `
╭𝗛𝗲𝗹𝗹𝗼 ${pushname} 𝗘ꟾ𝖎✘𝗮👋╮
│𝗶𝗻 𝗚𝗿𝗼𝘂𝗽 ${groupName}👥
│𝗬𝗼𝘂𝗿 𝗡𝘂𝗺𝗯𝗲𝗿 ${senderNumber}🙂
│🤗🇱🇰❤️
╰─────────────╯
╭𝗠𝗮𝗶𝗻 𝗠𝗘𝗡𝗨 ✅
│${menu.main}
╰─────────────╯
╭𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿 𝗠𝗘𝗡𝗨 ⬇️
│${menu.download}
╰─────────────╯
╭𝗚𝗿𝗼𝘂𝗽 𝗠𝗘𝗡𝗨 👥
│${menu.group}
╰──────────────╯
╭𝗔𝗶 𝗠𝗘𝗡𝗨 🦾
│${menu.ai}
╰──────────────╯
╭𝗔𝗱𝗺𝗶𝗻 𝗠𝗘𝗡𝗨 🧑‍💻
│${menu.admin}
╰──────────────╯
╭𝗦𝗲𝗮𝗿𝗰𝗵 𝗠𝗘𝗡𝗨 🔎
│${menu.search}
╰──────────────╯
╭𝗖𝗼𝗻𝘃𝗲𝗿𝘁𝗲𝗿 𝗠𝗘𝗡𝗨 🧪
│${menu.converter}
╰──────────────╯
╭𝗙𝘂𝗻 𝗠𝗘𝗡𝗨🙃
│${menu.fun}
╰──────────────╯

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
        `;


await conn.sendMessage(from, {image: { url: "https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/Elixa/menu.png" },caption: Elixamenu }, { quoted: mek });


    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
