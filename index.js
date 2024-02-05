const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1203705328894607380/1204051274337620018/matching-profile-picture.gif?ex=65d35321&is=65c0de21&hm=237552f9545cbb5c16af03ded2fbd10c8e99326622bf8e40f3d12dabd66e4a29&='
    // Add more large image URLs as needed
];

const stateTexts = [
    '「 ขายของราคาถูก 」',
    '「 NOS SHOP 」',
    '「 ขาย FIVEM 」',
    '「 ขายของต่อย 」'
    // Add more state texts as needed
];

const nameTexts = [
  '꒦꒷ขายของราคาถูก',
  '꒦꒷NOS SHOP',
  '꒦꒷ขาย FIVEM',
  '꒦꒷ขายของต่อย'
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
          .setState(stateTexts[currentStateIndex])
          .setName(nameTexts[currentnameTextsIndex])
          .setDetails(` ﹝ ⌚${currentTime} | 🛒 ${client.user.username} ﹞ `)
          .setStartTimestamp(startedAt)
          .setAssetsLargeText(`﹝ 📅 ${currentDate}  | 🛸 0 m/s ﹞`)
          .setAssetsLargeImage(largeImages[currentLargeImageIndex])
          .setAssetsSmallText('🦊')
          .addButton('เข้าดิส', 'https://discord.gg/cQwwcMsXWz')

      client.user.setActivity(r);

      currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
      currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
      currentnameTextsIndex = (currentnameTextsIndex + 1) % nameTexts.length;
  }, 1000); // Change large image and state text every 1 second
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
