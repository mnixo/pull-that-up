const fs = require('fs');
const youtubeCaptionsScraper = require('youtube-captions-scraper');

async function run() {
  const videoIds = JSON.parse(fs.readFileSync('data/ids.json', 'utf8'));
  for (let i = 0; i < videoIds.length; i++) {
    const videoId = videoIds[i];
    console.log(`${i + 1}/${videoIds.length}`);
    const subtitlePath = `data/subtitles/${videoId}.json`;
    if (fs.existsSync(subtitlePath)) {
      continue;
    }
    let subtitles;
    try {
      subtitles = await youtubeCaptionsScraper.getSubtitles({ videoID: videoId });
    } catch(e) {
      continue;
    }
    fs.writeFileSync(subtitlePath, JSON.stringify(subtitles, null, 2));
  }
}

run();
