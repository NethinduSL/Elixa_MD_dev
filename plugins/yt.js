const config = require('../config');
const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const gifted = require('gifted-dls');

cmd({
    pattern: "song2",
    desc: "Download Songs By Elixa.",
    category: "download",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid song name or URL 🙃");

        // Search for the song
        const search = await yts(q);
        const data = search.videos[0];
        if (!data) return reply("No results found for your query 🙃");

        const url = data.url;
        let desc = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗦𝗼𝗻𝗴 🎵 ❱❱
│
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        // Send song details with thumbnail
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio using gifted-dls
        const downloadData = await gifted.giftedytmp3(url);

        if (!downloadData || !downloadData.result || !downloadData.result.audio_buffer) {
            return reply("Failed to download the song 🙃");
        }

        // Send audio as a playable file
        await conn.sendMessage(from, {
            audio: downloadData.result.audio_buffer,
            mimetype: "audio/mpeg"
        }, { quoted: mek });

        // Send audio as a downloadable file
        await conn.sendMessage(from, {
            document: downloadData.result.audio_buffer,
            mimetype: "audio/mp3",
            fileName: `${downloadData.result.title}.mp3`,
            caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || e}`);
    }
});
