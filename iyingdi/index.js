import { srcList } from './iyingdi.js';
import * as cheerio from 'cheerio';
import { Actor } from 'apify';
import { PlaywrightCrawler, ProxyConfiguration, Dataset } from 'crawlee';
await Actor.init();

const sources = srcList.slice(33, 36);
const proxyConfiguration = new ProxyConfiguration({
  proxyUrls: ['http://49.7.11.187:80', 'http://49.7.11.187:80'],
});

const crawler = new PlaywrightCrawler({
  // proxyConfiguration,
  maxConcurrency: 5, // 最大并发
  // maxRequestsPerMinute: 1, // 每分钟应运行的最大请求数
  // maxRequestsPerCrawl: 20, // 爬网程序将打开的最大页面数。当达到此限制时，爬网将停止。
  // requestHandlerTimeoutSecs: 60, // 最多执行 60 秒
  async requestHandler({ request, page }) {
    const { url } = request;
    console.log(`Processing ${url}...`);
    // 获取页面的HTML内容
    const content = await page.content();
    const $ = cheerio.load(content);
    const cardImgSrc = $('.marvel-card-detail-page .card-img').eq(0).attr('src')
    const $targetDivs = $('.relative.w-60 div');
    const cardName = $targetDivs.eq(0).text();
    const $infoItems = $targetDivs.find('.info-item');
    // 卡牌结果
    const resultCard = {
      cardName,
      cardImgSrc,
    };
    $infoItems.each((index, domEle) => {
      let infoText = $(domEle).text();
      infoText = infoText.replace(/\s+/g, '');
      // 返回eg 描述：附着，遗言：造成3点伤害
      let [keyPart, ...valPart] = infoText.split('：');
      valPart = valPart.join('：');
      switch (keyPart) {
        case '类型':
          resultCard['type'] = valPart;
          break;
        case '种族':
          resultCard['race'] = valPart;
          break;
        case '星级':
          resultCard['rarity'] = valPart;
          break;
        case '描述':
          resultCard['desc'] = valPart;
          break;
        default:
          break;
      }
    });
    const moonDataset = await Dataset.open('moon');
    await moonDataset.pushData(resultCard);
  },
  failedRequestHandler: async (_, error) => {
    console.error('requestHandler 出错：', error);
  },
});
await crawler.run(sources);
// 遍历结果集
const allCards = [];
const moonDataset = await Dataset.open('moon');
await moonDataset.forEach(async (item, index) => {
  allCards.push(item);
});
console.log(allCards);
await Actor.exit();

