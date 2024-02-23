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


const sources = [
  { url: 'https://movie.douban.com/subject/36081094' },
  { url: 'https://movie.douban.com/subject/36208094/' },
];
// const requestList = await RequestList.open('target-list', sources);
const crawler = new PlaywrightCrawler({
  async requestHandler({ request, page, enqueueLinks }) {
    const title = await page.title();
    // console.log(request, page, enqueueLinks)
    console.log(`Title of ${request.url}: ${title}`);
  },
});
await crawler.run(sources);

await Actor.exit();
