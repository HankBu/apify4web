import { Actor } from 'apify';
import { Dataset } from 'crawlee';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Papa from 'papaparse';

/**
 * JSON to CSV
 * 运行 index.js 保存到了外部的 storage/datasets/moon
 * 然后我把最终的数据拷贝到了作为备份，爬虫做到这里就OK了
 * iyingdi/storage/datasets/moon_240227 这个路径拿到 Dataset
 */
const allCards = [];
const moonDataset = await Dataset.open('moon_240227');
await moonDataset.forEach(async (item, index) => {
  allCards.push(item);
});
const csvData = Papa.unparse(allCards);
const utf8WithBom = '\ufeff' + csvData;
const currentDir = dirname(fileURLToPath(import.meta.url));
const outputPath = join(currentDir, 'iyingdi.csv');
try {
  fs.writeFileSync(outputPath, utf8WithBom, 'utf8');
  console.log('CSV file saved.');
} catch (error) {
  console.error('Error writing CSV file:', error);
}
