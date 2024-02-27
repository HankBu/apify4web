# 开发注意点
## 过程
``` bash
从旅法师营地页面 ->
iyingdi.html 写 jquery 拿到所有的链接页面 ->
导出 iyingdi.js 四百多个 url 的 json ->
index.js 开始编写爬虫，清洗数据整理好后，用 Dataset.open('moon') 导出到 storage/datasets/moon
每次爬虫都会存储一个单独的 json ->
json2csv.js 把 json 转成 csv，这个命令直接用 terminal， node json2csv.js
由于 storage 存的是外面的 storage/datasets/moon，为了读取文件方便，我把生成的 moon 拷贝到了 iyingdi/storage/datasets/moon_240227 方便读取 Dataset.open('moon_240227') ->
最终保存成 iyingdi.csv ->
这个 csv 排序不够好，这边重排序整理，另存为 iyingdi_final.csv，从此这个 csv 就可以进行编辑修改进行管理 ->
管理后再 csv2json.js 把他转成 json 这样我们的小程序代码就能开始利用这些数据进行过滤开发了
```

# 文档
## 爬虫链接
https://github.com/apify/apify-sdk-js/blob/master/packages/apify/README.md
官方文档
https://crawlee.dev/docs/next/quick-start
https://docs.apify.com/sdk/js/docs/next/guides/request-storage
https://docs.apify.com/sdk/js/docs/examples/add-data-to-dataset
基本用法
https://kejiweixun.com/blog/introduction-to-crawlee-and-how-to-deploy-it-to-serverless-function

## ip 资源池
https://github.com/jhao104/proxy_pool
站大爷免费ip (用普通匿名 80端口 好用免费)
https://www.zdaye.com/free/?checktime=2&sleep=3&dengji=2

## 卡牌链接
腾讯文档
https://doc.weixin.qq.com/sheet/e3_AH0AWgYyACkdVgZJ9XSQbK7QOqJsK?scode=AJEAIQdfAAoF87tQnoAH0AWgYyACk&tab=BB08J2
旅法师营地 月圆之夜单卡查询
https://www.iyingdi.com/tz/tool/general/nofm
taptap月圆攻略
https://www.taptap.cn/moment/440500248981276785
taptap月圆图集
https://www.taptap.cn/moment/490940259824042774
bilibili 攻略图集
https://wiki.biligame.com/yyzy/PVP%E9%9A%8F%E4%BB%8E%E5%9B%BE%E9%89%B4