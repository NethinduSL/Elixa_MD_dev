const axios = require('axios');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

let premiumActive = false;

cmd({
    pattern: "activepro",
    category: "premium",
    desc: "Activates premium feature for all users.",
    send: "✅ Premium activated successfully!",
    filename: __filename,
},
    async (conn, mek, m, {
        senderNumber, reply
    }) => {
        const authorizedNumbers = [
            "94766428832",
            "94763936166",
            "94770463141",
            "94786874741",
            "94774534093"
        ];

        if (!authorizedNumbers.includes(senderNumber)) {
            return reply(`*This command is restricted to authorized numbers* ❗`);
        }

        // Activate premium feature
        premiumActive = true;
        console.log("Premium feature activated:", premiumActive); // Optional logging
        return reply(`*Premium feature activated for all users* ✅`);
    }
);



cmd({
    pattern: "movie",
    category: "search",
    desc: "Sends image of asked Movie/Series.",
    use: '<movie_name>',
    react: "😎",
    send: "🎥 Fetching movie details...",
    filename: __filename,
},
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        
        if (!premiumActive) {
            return reply(`*This is a premium feature* ❗`);
        }

        try {
            q = args.join(" ").trim();

            if (!q) {
                return reply(`*Please provide a movie name* ❗`);
            }

            let response = await axios.get(`https://bit-x-apis.vercel.app/movie?query=${q}`);

            if (response.data.status !== "success" || response.data.data.length === 0) {
                return reply(`*Movie not found* ❗`);
            }

            let movieDetails = "╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗼𝘃𝗶𝗲 𝗶𝗻𝗳𝗼❱❱\n┃\n╰\n";

            response.data.data.forEach(movie => {
                movieDetails += `🎬 Title: ${movie.movieName}\n`;
                movieDetails += `📅 Year: ${movie.year}\n`;
                movieDetails += `⭐ imdbRating: ${movie.imdbRating}\n`;
                movieDetails += `🔗 Link:${movie.link}\n╰═══════════════\n`;
            });

            await reply(movieDetails);
        } catch (error) {
            console.error("An error occurred while fetching movie data:", error);
            return reply(`*An error occurred while fetching movie data* ❗`);
        }
    }
);
