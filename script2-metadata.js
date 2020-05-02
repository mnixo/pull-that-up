const fetch = require('node-fetch');
const fs = require('fs');

async function run() {
  const videoIds = JSON.parse(fs.readFileSync('data/ids.json', 'utf8'));
  const videoInfo = [];
  for (let i = 0; i < videoIds.length; i++) {
    const videoId = videoIds[i];
    console.log(`${i + 1}/${videoIds.length}`);
    const url = `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(url);
    const info = await response.json();
    videoInfo.push({
      id: videoId,
      title: info.title,
    });
  }
  fs.writeFileSync('data/metadata.json', JSON.stringify(videoInfo, null, 2));
}

run();
