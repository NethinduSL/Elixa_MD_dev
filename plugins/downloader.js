const config = require('../config');
const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const axios = require('axios');
const { fetchJson } = require('../lib/functions');

const { Buffer } = require('buffer');





cmd({
    pattern: "song",
    desc: "Download Songs By Elixa.",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid song name or URL 🙃");

        // First Attempt: Search and download using yt-search
        try {
            const search = await yts(q);
            if (!search.videos.length) throw new Error("No results found");

            const data = search.videos[0];
            const url = data.url;

            const desc = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗦𝗼𝗻𝗴 🎵 ❱❱
│
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
┃ ɪꜰ ɴᴏᴛ ᴡᴏʀᴋꜱ ᴜꜱᴇ ꜱᴏɴɢ2
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

            await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

            const down = await fg.yta(url);
            const downloadUrl = down.dl_url;

            // Send audio
            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
            return conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mp3", fileName: `${data.title}.mp3` }, { quoted: mek });
        } catch (err) {
            console.warn("Primary method failed:", err.message);
            throw new Error("Primary method failed, trying alternative API...");
        }

    } catch (primaryError) {
        // Fallback: Alternative API only if the first fails
        try {
            const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=gifted&url=${q}`;
            const response = await axios.get(apiUrl);
            const { result } = response.data;

            if (!result || !result.download_url) throw new Error("No results from API");

            const { download_url, title } = result;

            // Send audio as a playable file
            await conn.sendMessage(from, {
                audio: { url: download_url },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`
            }, { quoted: mek });

            // Send audio as a downloadable document
            return conn.sendMessage(from, {
                document: { url: download_url },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`,
                caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
            }, { quoted: mek });

        } catch (fallbackError) {
            console.error("Fallback method failed:", fallbackError.message);
            return reply(`Error: Both methods failed. Please try again later 🙃`);
        }
    }
});

//---------------------------video--------------------------

cmd({
    pattern: "video",
    desc: "Download videos By Elixa.",
    category: "download",
    react :"🎬",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid URL 🙃");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `        
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗩𝗶𝗱𝗲𝗼 🎬❱❱
┃
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // download video
        let down = await fg.ytv(url); // Use the video's URL for downloading
        let downloadUrl = down.dl_url;

        // send video
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: data.title + ".mp4", caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`If this is not work use video2\nමේක වැඩ නැත්නම් video2 වැඩ ${e}`);
    }
});











cmd({
    pattern: "apk",
    desc: "Convert text to speech.",
    category: "download",
    filename: __filename,
    use: '<Enter your text here>',
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        const text = args.join(" ").trim();

        if (!text) {
            return reply("Please provide text to convert to speech.");
        }

        // Fetch the APK details
        const data = await axios.get(`https://bk9.fun/download/apk?id=${q}`);

        // Construct the message using the fetched data
        const message = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗔𝗣𝗞❱❱
┃
╰📌 App: ${data.data.BK9.name}
╰📅 Last Updated: ${data.data.BK9.lastup}
╰🛠️ Package: ${data.data.BK9.package}
╰═══════════════
> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        // Send the download link first
        
        // Sending the image and message
        await conn.sendMessage(from, {
            image: { url: data.data.BK9.icon },
            caption: message
        }, { quoted: mek });


const downloadMessage = `ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴘᴇᴇᴅ ɪꜱ ᴅᴇᴘᴇɴᴅ ᴏɴ ꜱᴇʀᴠᴇʀ ʀᴀᴍ ꜱᴏᴍᴇᴛɪᴍᴇꜱ ɪᴛ ᴍᴀʏ ʙᴇ ɴᴏᴛ ᴅᴏᴡɴʟᴏᴀᴅᴅᴇᴅ ᴛʜᴇɴ ᴜꜱᴇ ʟɪɴᴋ\n\n📥 Click the link to download the APK: ${data.data.BK9.dllink}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`;
        await conn.sendMessage(from, {
            text: downloadMessage
        }, { quoted: mek });



        
        // Sending the APK file
        await conn.sendMessage(
            from,
            {
                audio: { url: data.data.BK9.dllink },
                mimetype: "application/vnd.android.package-archive",
                fileName: `${q}.apk`,
            }
        );

    } catch (error) {
        console.error("TTS Error:", error);
        return conn.reply(`An error occurred while generating the TTS audio: ${error.message}`);
    }
});





const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID

cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    category: "media",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a search query for the image !!");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;

        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
👨‍💻 *Image ${i + 1} /n > 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`
}, { quoted: mek });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
