const fs = require('fs');
const lzString = require('lz-string');

async function run() {
  const index = JSON.parse(lzString.decompressFromBase64(fs.readFileSync('data/indexes/0CcfmYnMlhM.json', 'utf8')));
  console.log('');
}

run();
