const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1205060627010297866/1220355083762536478/imagex1.gif?ex=660ea33d&is=65fc2e3d&hm=13cd2e42a42626bb4d1c27b719f411512f10886c03e20c3178c85d6a2f525558&=',
    'https://media.discordapp.net/attachments/1205060627010297866/1220355084433621143/imagex2.gif?ex=660ea33d&is=65fc2e3d&hm=0ccb9d1340b1694083702fa96d359100e5c605adfabf6dad0ecbdc1a6cf49fc7&=',
    'https://media.discordapp.net/attachments/1205060627010297866/1220355084840472707/imagex.gif?ex=660ea33d&is=65fc2e3d&hm=61b58dce9230e2f6f18e698af237f7d761fa3d1d8a4dddf12c5f1182ae12b6f6&='
    // Add more large image URLs as needed
];

const stateTexts = [
    '「 𝚍𝚊𝚢𝚍𝚛𝚎𝚊𝚖𝚜 」'
    // Add more state texts as needed
];

const nameTexts = [
  '꒦꒷ 𝚍𝚊𝚢𝚍𝚛𝚎𝚊𝚖𝚜',
  // Add more state texts as needed
];


let currentStateIndex = 0; // Index to track the current state text

let currentLargeImageIndex = 0;

let currentnameTextsIndex = 0;

app.get('/', (req, res) => res.send('ทำงานเรียบร้อยแล้ว'))
app.listen(port, () =>
  console.log(`Your app is listening at http://localhost:${port}`)
);

client.on("ready", async () => {
  var startedAt = Date.now();
  console.log(`${client.user.username} เม็ดม่วงทำงานเรียบร้อยแล้ว !`);

  setInterval(() => {
      const currentTime = getCurrentTime();
      const currentDate = getCurrentDate();

      const r = new Discord.RichPresence()
          .setApplicationId('1121867777867788309')
          .setType('STREAMING')
          .setURL('https://www.youtube.com/watch?v=FvOpPeKSf_4')
          .setState(stateTexts[currentStateIndex])
          .setName(nameTexts[currentnameTextsIndex])
          .setDetails(` ﹝ ⌚ ${currentTime} | 💬 ${client.user.username} ﹞ `)
          .setStartTimestamp(startedAt)
          .setAssetsLargeText(`﹝ 📅 ${currentDate}  | 🛸 0 m/s ﹞`)
          .setAssetsLargeImage(largeImages[currentLargeImageIndex])
          .setAssetsSmallText('🦊')
          .addButton('DISCORD796', 'https://discord.com/invite/xhqcSC5K4Y') 
          .addButton('🎧', 'https://open.spotify.com/track/6uINnfTwHKIpzXV4NBVsoA?si=CZoVQiGxS6ChX8zBAs5XAw')

      client.user.setActivity(r);

      currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
      currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
      currentnameTextsIndex = (currentnameTextsIndex + 1) % nameTexts.length;
  }, 3000); // Change large image and state text every 1 second
});

function getCurrentDate() {
  const a = new Date(Date.now());
  const c = { timeZone: "Asia/Bangkok", day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = a.toLocaleDateString("en-US", c);
  const [month, day, year] = formattedDate.split('/');
  return `${day}/${month}/${year}`;
}

function getCurrentTime() {
  const a = new Date(Date.now());
  const c = { timeZone: "Asia/Bangkok", hour: "numeric", minute: "numeric", hour12: false };
  return a.toLocaleTimeString("th-TH", c);
}

client.login(process.env.token);
