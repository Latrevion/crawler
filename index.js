#!/usr/bin/env node
// console.log('hello Latrevion')

const fetch = require("node-fetch")
const fs = require("fs")
const path = require("path")
const {prompt} = require("enquirer")
const http = require("http")
const handler = require("serve-handler")
const open = require('open')

// fetch("https://www.nowcoder.com/search?type=post&order=recall&query=%E8%85%BE%E8%AE%AF+%E5%89%8D%E7%AB%AF&subType=0&tagId=&page=2")
//   .then(res => res.text())
//     .then(text => {
//       console.log(text)
//     })


async function start() {
  let result = {}


  let response = await prompt({
    type: "input",
    name: "count",
    message: "下载数量",
    initial: 30
  })
  result.count = parseInt(response.count)


  response = await prompt({
    type: "Select",
    name: "job",
    message: "选择方向",
    choices: ["前端", "后端", "测试", "产品经理", "运维", "UI", "运营"],
  })

  Object.assign(result, response)

  response = await prompt({
    type: "select",
    name: "company",
    message: "选择公司",
    choices: ["阿里巴巴", "字节跳动", "腾讯", "拼多多", "百度", "华为"]
  })
  Object.assign(result, response)
  // console.log(response)

  let page = 1
  let count = 0 //已经下载的数量
  let urls = []
  do {
    let url = `https://www.nowcoder.com/search?type=post&order=recall&query=${result.company}+${result.job}&subType=0&tagId=&page=${page}`
    let res = await fetch(url)
    let body = await res.text()

    urls = body.match(/\/discuss\/\d+\?.+?"/g) || []

    urls = urls.map(text => `https://www.nowcoder.com${text.replace("\"", "")}`)

    for (let i = 0; i < urls.length; i++) {
      console.log(`下载第${i}个`)
      fs.writeFileSync(path.join(process.cwd(), `${result.job}_${result.company}_${count}.html`), body, "utf-8")
      count++

      if(count >=result.count)break
      //降低请求频率，做个延时
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    page++
    // console.log(count, result.count, urls.length, page)
    // console.log(count < result.count && urls.length > 0)
  } while (count < result.count && urls.length > 0)
  console.log("下载完成")

  http.createServer(async (req, res)=>{
    await handler(req, res)
  }).listen(3000,async ()=>{
    await open('http://localhost:3000')
  })
  // console.log('打开 http://localhost:8080')
}

start()