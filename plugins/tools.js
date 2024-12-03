const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson, getBuffer } = require('../lib/functions');


const { runtime } = require('../lib/functions');  
const moment = require('moment');
const os = require('os');



cmd({
    pattern: "qr",
    category: "converter",
    react: "📎",
    filename: __filename,
    desc: "Sends QR code of text"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (args.length === 0) {
            return reply("Please provide the text to generate the QR code.");
        }

        const text = args.join(" ");
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
        const buffer = await getBuffer(qrCodeUrl);

        await conn.sendMessage(from, { image: buffer, caption: `Here is your QR code for: ${text}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺` }, { quoted: mek });
    } catch (e) {
        console.error(e);
        mek.reply("An error occurred while generating the QR code. Please try again.");
    }
});




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

cmd({
    pattern: "time",
    desc: "To show current time, date, day of the week, time remaining to end of day, days remaining to end of year, and time zone",
    category: "main",
    filename: __filename,
}, 
async (Void, citel) => {
    var inital = new Date().getTime();
    const { key } = await Void.sendMessage(citel.chat, { text: '```𝗧𝗲𝘀𝘁𝗶𝗻𝗴 𝗧𝗶𝗺𝗲...```' });
    var final = new Date().getTime();
    
    await sleep(1000);

    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const currentTime = moment().format('HH:mm:ss');
    const dayOfWeek = moment().format('dddd');
    const daysToEndYear = moment().endOf('year').diff(moment(), 'days');
    const timeZone = moment().zoneName();

    const endOfDay = moment().endOf('day');
    const timeRemainingEndOfDay = moment.duration(endOfDay.diff(moment())).humanize();

    const responseMessage = `
📍 *Current Date and Time (Numbers):* ${currentDateTime}
🕰️ *Current Time:* ${currentTime}
📅 *Day of the Week:* ${dayOfWeek}
⏳ *Time Remaining to End of Day:* ${timeRemainingEndOfDay}
🗓️ *Days Remaining to End of Year:* ${daysToEndYear} days
🕰️ *Time Zone:* ${timeZone}
`;

    const pg = await Void.sendMessage(citel.chat, { text: responseMessage, edit: key });
    return await Void.sendMessage(citel.chat, { react: { text: '✔️', key: pg.key } });
});
