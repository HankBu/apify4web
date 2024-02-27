import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Papa from 'papaparse';

const allCards = [];
// const moonDataset = await Dataset.open('moon_240227');
// await moonDataset.forEach(async (item, index) => {
//   allCards.push(item);
// });
// const csvData = Papa.unparse(allCards);
// const utf8WithBom = '\ufeff' + csvData;
// const currentDir = dirname(fileURLToPath(import.meta.url));
// const outputPath = join(currentDir, 'iyingdi_final.csv');
// try {
//   fs.writeFileSync(outputPath, utf8WithBom, 'utf8');
//   console.log('CSV file saved.');
// } catch (error) {
//   console.error('Error writing CSV file:', error);
// }
const currentDir = dirname(fileURLToPath(import.meta.url));
const outputPath = join(currentDir, 'iyingdi_final.csv');
fs.readFile(outputPath, 'utf8', (error, csvData) => {
  if (error) {
    throw error;
  }
  Papa.parse(csvData, {
    header: true,
    complete: (results) => {
      console.log('CSV data as JSON:', results.data);
    }
  });
});