import { srcList } from './iyingdi.js';
import { Actor } from 'apify';
import { PlaywrightCrawler, ProxyConfiguration } from 'crawlee';
await Actor.init();

const sources = srcList.slice(0, 2);
console.log(JSON.stringify(sources, null, 2));


const proxyConfiguration = new ProxyConfiguration({
  proxyUrls: [
      'http://123.126.158.50:80',
  ],
});

const crawler = new PlaywrightCrawler({
  proxyConfiguration,
  maxConcurrency: 2, // 最大并发
  maxRequestsPerMinute: 2, // 每分钟应运行的最大请求数
  // maxRequestsPerCrawl: 20, // 爬网程序将打开的最大页面数。当达到此限制时，爬网将停止。
  // requestHandlerTimeoutSecs: 60, // 最多执行 60 秒
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
