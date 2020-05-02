const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = (await browser.pages())[0];
  await page.goto('https://www.youtube.com/user/PowerfulJRE/videos?view=0&sort=dd&shelf_id=0');
  await scrollToBottom(page);
  const videoIds = await getVideoIds(page);
  fs.writeFileSync('data/ids.json', JSON.stringify(videoIds, null, 2));
  browser.close();
}

async function scrollToBottom(page) {
  const baseHeight = await getAppHeight(page);
  const heightHistory = [ baseHeight ];
  while (await canKeepScrolling(heightHistory)) {
    await scrollBy(page, baseHeight);
    heightHistory.push(await getAppHeight(page));
    await sleep(1000);
  }
}

async function canKeepScrolling(heightHistory) {
  const length = heightHistory.length;
  if (length < 10) {
    // history has less than 10 entries, can keep scrolling
    return true;
  }
  const lastHeight = heightHistory[length - 1];
  const referenceHeight = heightHistory[length - 10];
  // if the last height is the same as the reference height, can stop scrolling
  return lastHeight !== referenceHeight;
}

async function scrollBy(page, amount) {
  await page.evaluate(scrollAmount => window.scrollBy(0, scrollAmount), amount);
}

async function getAppHeight(page) {
  return page.evaluate(() => document.querySelector('ytd-app').offsetHeight);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getVideoIds(page) {
  return page.evaluate(() => {
    const videos = Array.from(document.querySelectorAll('ytd-grid-video-renderer'));
    const videoHrefs = videos.map(video => video.querySelector('#thumbnail').href);
    return videoHrefs.map(videoHref => (new URL(videoHref)).searchParams.get('v'));
  });
}

run();
