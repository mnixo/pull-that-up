const fs = require('fs');
const path = require('path');

async function run() {
  const subtitleFileNames = fs.readdirSync('data/subtitles').filter(name => path.extname(name) === '.json');
  for (let i = 0; i < subtitleFileNames.length; i++) {
    console.log(`${i + 1}/${subtitleFileNames.length}`);
    const subtitleFileName = subtitleFileNames[i];
    const subtitlePath = `data/subtitles/${subtitleFileName}`;
    const subtitleData = JSON.parse(fs.readFileSync(subtitlePath, 'utf8'));
    const subtitleText = subtitleData.map(subtitle => subtitle.text).join(' ');
    fs.writeFileSync(`data/chunks/${subtitleFileName}`, subtitleText);
  }
}

run();
