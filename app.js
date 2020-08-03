const puppeteer = require('puppeteer');
const $ = require('cheerio');

const parser = async query => {
  const url = `https://google.com/search?q=${query}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.click('.hdtb-mitem.hdtb-imb > a[data-sc="I"]');
  await page.waitForNavigation();
  const html = await page.content();
  console.log('Loading...');
  for (const [key, value] of Object.entries($('div.isv-r.PNCib.BUooTd a:nth-child(2)', html))) {
    if (!!value.attribs) {
      if (value.attribs.href !== undefined) {
        let rValue = value.attribs.href;
        console.log(rValue);
      }
    } else {
      return;
    }
  }
}

parser(process.argv[2]);
