const axios = require('axios');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "movie",
    category: "search",
    desc: "Sends image of asked Movie/Series.",
    use: '<movie_name>',
    react: "😎",
    filename: __filename,
},
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        
        try {
            // Ensure q captures the movie name
            q = args.join(" ").trim();

            // Check if movie name is provided
            if (!q) {
                return reply(`*Please provide a movie name* ❗`);
            }

            // Fetch movie data from Bit-X API
            let response = await axios.get(`https://bit-x-apis.vercel.app/movie?query=${q}`);

            // Handle if no data is found
            if (response.data.status !== "success" || response.data.data.length === 0) {
                return reply(`*Movie not found* ❗`);
            }

            // Formatting movie data
            let movieDetails = "╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗼𝘃𝗶𝗲 𝗶𝗻𝗳𝗼❱❱\n┃\n╰\n";
            const movie = response.data.data[0];

            movieDetails += `╰🎬 Title      : ${movie.movieName}\n\n`;
            movieDetails += `╰📅 Year       : ${movie.year}\n\n`;
            movieDetails += `╰⭐ imdbRating : ${movie.imdbRating}\n\n`;
            movieDetails += `╰📷 Thumbnail  : ${movie.thumbnail}\n\n`;
            movieDetails += `╰🔗 Link       : ${movie.link}\n\n`;

            // Send the movie details
            await reply(movieDetails);
        } catch (error) {
            console.error("An error occurred while fetching movie data:", error);
            return reply(`*An error occurred while fetching movie data* ❗`);
        }
    }
);

