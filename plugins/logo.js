const maker = require('mumaker')
const config = require('../config');
const { cmd, commands } = require('../command');

let cap = `> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`
     //---------------------------------------------------------------------------
 cmd({ pattern: "deepsea", category: "textpro", desc: "Some text to image feature with various styles." }, async(Void, citel, args) => {
        const text = args.join(" ").trim();
      if (!text) return citel.reply('_Need text._')
      
         let anu = await maker.textpro('https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html', text)
         Void.sendMessage(citel.chat, { image: { url: anu.image }, caption: cap }, { quoted: citel })
     })
