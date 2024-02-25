import {srcList} from './iyingdi.js';
import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';
await Actor.init();

// const crawler = new PlaywrightCrawler({
//     async requestHandler({ request, page, enqueueLinks }) {
//         // Extract HTML title of the page.
//         const title = await page.title();
//         console.log(`Title of ${request.url}: ${title}`);

//         // Add URLs that point to the same hostname.
//         await enqueueLinks();
//     },
// });
// await crawler.run(['https://movie.douban.com/']);

console.log(srcList.slice(0, 2));

const sources = srcList.slice(0, 2);
const crawler = new PlaywrightCrawler({
  async requestHandler({ request, page, enqueueLinks }) {
    const title = await page.title();
    // console.log(request, page, enqueueLinks)
    console.log(`Title of ${request.url}: ${title}`);
  },
});
await crawler.run(sources);

await Actor.exit();
