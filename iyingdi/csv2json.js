import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Papa from 'papaparse';

const currentDir = dirname(fileURLToPath(import.meta.url));
const readPath = join(currentDir, 'iyingdi_final.csv');
const outputPath = join(currentDir, 'iyingdi_final.json');
fs.readFile(readPath, 'utf8', (error, csvData) => {
  if (error) {
    throw error;
  }
  Papa.parse(csvData, {
    header: true,
    complete: (results) => {
      console.log('CSV data as JSON:', results.data);
      // 将 JSON 对象转换为字符串
      const jsonString = JSON.stringify(results.data, null, 2);
      // 异步保存 JSON 字符串到文件
      fs.writeFile(outputPath, jsonString, (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('File written successfully');
        }
      });
    },
  });
});
