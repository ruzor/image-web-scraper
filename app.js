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

  for (const [key, value] of Object.entries($('img', html))) {
    if (!!value.attribs) {
      let rValue = value.attribs.title? value.attribs.title : value.attribs['data-src'];
      if (rValue) {
        console.log(key, rValue);
      }
    }
  }
}

parser(process.argv[2]);
