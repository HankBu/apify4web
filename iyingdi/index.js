import { srcList } from './iyingdi.js';
import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';
await Actor.init();

const sources = srcList.slice(0, 2);
console.log(JSON.stringify(sources, null, 2));

const crawler = new PlaywrightCrawler({
  // 限制请求并发量最大值
  maxRequestsPerCrawl: 20,
  async requestHandler({ request, page }) {
    const { url } = request;
    console.log(`Processing ${url}...`);
    // 获取页面的HTML内容
    const content = await page.content();
    console.log(content);
  },
  failedRequestHandler: async (_, error) => {
    console.error("requestHandler 出错：", error);
  },
});
await crawler.run(sources);
await Actor.exit();
