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
                menu[commands[i].category] += `.${commands[i].pattern}\n┃`;
            }
        }

        let Elixamenu = `
╭ ❰  𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗘𝗡𝗨  ❱❱
┃    
╭𝗛𝗲𝗹𝗹𝗼 ${pushname} 𝗘ꟾ𝖎✘𝗮👋
┃⦁𝗶𝗻 𝗚𝗿𝗼𝘂𝗽 ${groupName}👥
┃⦁𝗬𝗼𝘂𝗿 𝗡𝘂𝗺𝗯𝗲𝗿 ${senderNumber}🙂
│🤗🇱🇰❤️
╰═══════════════
╭𝗠𝗮𝗶𝗻 𝗠𝗘𝗡𝗨 ✅
┃${menu.main}
╰═══════════════
╭𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿 𝗠𝗘𝗡𝗨 ⬇️
┃${menu.download}
╰═══════════════
╭𝗚𝗿𝗼𝘂𝗽 𝗠𝗘𝗡𝗨 👥
┃${menu.group}
╰═══════════════
╭𝗔𝗶 𝗠𝗘𝗡𝗨 🦾
┃${menu.ai}
╰═══════════════
╭𝗔𝗱𝗺𝗶𝗻 𝗠𝗘𝗡𝗨 🧑‍💻
┃${menu.admin}
╰═══════════════
╭𝗦𝗲𝗮𝗿𝗰𝗵 𝗠𝗘𝗡𝗨 🔎
┃${menu.search}
╰═══════════════
╭𝗖𝗼𝗻𝘃𝗲𝗿𝘁𝗲𝗿 𝗠𝗘𝗡𝗨 🧪
┃${menu.converter}
╰═══════════════
╭𝗙𝘂𝗻 𝗠𝗘𝗡𝗨🙃
┃${menu.fun}
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
        `;

if (config.ALIVE_MODE === "elixa") {
            await conn.sendMessage(from, {image: { url: "https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/Elixa/menu.png" },caption: Elixamenu }, { quoted: mek });


} else if (config.ALIVE_MODE === "hack") {
            await conn.sendMessage(from, {image: { url: "https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/hack.png" },caption: Elixamenu }, { quoted: mek });

} else {
            reply("Invalid ALIVE_MODE in config.js. Please set it to 'elixa' or 'hack'.");
}


        


    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }


});






const categories = {
    main: "✅",
    download: "⬇️",
    group: "👥",
    games: "🎮",
    ai: "🦾",
    admin: "🧑‍💻",
    search: "🔎",
    converter: "🧪",
    fun: "🙃",
    owner: "❤️"
};

Object.keys(categories).forEach(category => {
    cmd({
        pattern: `${category}menu`,
        desc: `Menu of Elixa: ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        category: "menu",
        react: categories[category],
        filename: __filename
    }, async (conn, mek, m, { from, pushname, groupName, senderNumber, reply }) => {
        try {

            let menu = {
             [category]: '',
            }
            for (let i = 0; i < commands.length; i++) {
                if (commands[i].category === category && commands[i].pattern && !commands[i].dontAddCommandList) {
                    menu[category] += `╭❰ .${commands[i].pattern} ❱ \n┃ ${commands[i].desc || "No description provided"}\n╰═══════════════\n`;
                }
            }

            let menuContent = `
╭ ❰  𝗘ꟾ𝖎✘𝗮 ${category.charAt(0).toUpperCase() + category.slice(1)} 𝝡𝗲𝗻𝘂  ❱❱
┃    
╭𝗛𝗲𝗹𝗹𝗼 ${pushname} 𝗘ꟾ𝖎✘𝗮👋
┃⦁𝗶𝗻 𝗚𝗿𝗼𝘂𝗽 ${groupName}👥
┃⦁𝗬𝗼𝘂𝗿 𝗡𝘂𝗺𝗯𝗲𝗿 ${senderNumber}🙂
│🤗🇱🇰❤️
╰═════════════

${menu[category] || "No commands available for this category."}

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
            `;

            if (config.ALIVE_MODE === "elixa") {
            await conn.sendMessage(from, {image: { url: "https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/Elixa/menu.png" },caption: menuContent }, { quoted: mek });


} else if (config.ALIVE_MODE === "hack") {
            await conn.sendMessage(from, {image: { url: "https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/Elixa/menu.png" },caption: menuContent }, { quoted: mek });

} else {
            reply("Invalid ALIVE_MODE in config.js. Please set it to 'elixa' or 'hack'.");
}
        } catch (e) {
            console.error(e);
            reply(`${e}`);
        }
    });
});

























