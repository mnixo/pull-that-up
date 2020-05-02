const fs = require('fs');
const lzString = require('lz-string');
const path = require('path');

async function run() {
  const subtitleFileNames = fs.readdirSync('data/subtitles').filter(name => path.extname(name) === '.json');
  for (let i = 0; i < subtitleFileNames.length; i++) {
    console.log(`${i + 1}/${subtitleFileNames.length}`);
    const subtitleFileName = subtitleFileNames[i];
    const indexPath = `data/indexes/${subtitleFileName}`;
    if (fs.existsSync(indexPath)) {
      continue;
    }
    const subtitleData = JSON.parse(fs.readFileSync(`data/subtitles/${subtitleFileName}`, 'utf8'));
    const index = [];
    subtitleData.forEach(subtitle => {
      let subtitleText = subtitle.text;
      if (subtitleData.indexOf(subtitle) !== subtitleData.length - 1) {
        subtitleText += ' ';
      }
      let totalLength = 0;
      if (index.length > 0) {
        const lastShard = index[index.length - 1];
        totalLength = lastShard.s + lastShard.l;
      }
      index.push({
        // time
        t: parseFloat(subtitle.start),
        // shard length
        s: subtitleText.length,
        // total length
        l: totalLength,
      });
    });
    fs.writeFileSync(indexPath, lzString.compressToBase64(JSON.stringify(index)));
  }
}

run();
