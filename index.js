const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1204374463651774505/1204382384821112842/b49f97c788e4a665d04bb9c42ed605ab.gif?ex=65d48780&is=65c21280&hm=60b214f70bb8b7430858511d455b208d4785811a1169abbb30cfa1725412bfbf&=',
    'https://media.discordapp.net/attachments/1204374463651774505/1204382385412636712/acc40089e0d25ea64759458de84a991f.gif?ex=65d48781&is=65c21281&hm=7f1b6e289ea03692619c940abcbf8384f45a609bb2f34d7ea726dd91270bb0a3&=',
    'https://media.discordapp.net/attachments/1204374463651774505/1204382386226208838/39bf4328d684c393fdf0d3ffc693f2a2.gif?ex=65d48781&is=65c21281&hm=ddfdd949959349321344ce4410214024668fd19492779418ad32f9e1191a48d7&=',
    'https://media.discordapp.net/attachments/1204374463651774505/1204382387426033665/c53704bd9faa4912736316e09de4b514.gif?ex=65d48781&is=65c21281&hm=f9d7af5cc00da1d55e88e026ee72b4d02eb8c513a9e20cdcb151a6baf401e099&=',
    'https://media.discordapp.net/attachments/1204374463651774505/1204382388684329011/de9a5eaf9f130a2099efcaca88a9e6e0.gif?ex=65d48781&is=65c21281&hm=44cffa8dcb82f7f550b25d33bcec9ced8faffb538f4be1ba7f4857c750840228&=',
    'https://media.discordapp.net/attachments/1204374463651774505/1204382389539835914/509d8813769fae32f19d93b176529e60.gif?ex=65d48782&is=65c21282&hm=28dafb88df9998c7b2056af0b303453cdda6034059cc93cd38ac71d8bb9fe396&='
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
