#!/usr/bin/env node
// console.log('hello Latrevion')

const fetch = require("node-fetch")
const fs    = require("fs")
const path  = require("path")
const { prompt } = require('enquirer');

// fetch("https://www.nowcoder.com/search?type=post&order=recall&query=%E8%85%BE%E8%AE%AF+%E5%89%8D%E7%AB%AF&subType=0&tagId=&page=2")
//   .then(res => res.text())
//     .then(text => {
//       console.log(text)
//     })


async function start() {
  let result = {}

  let response =await prompt({
    type: 'Select',
    name: 'job',
    message: '选择方向',
    choices: ['前端', '后端', '测试', '产品经理', '运维', 'UI', '运营'],
  });

  Object.assign(result,response)

  response = await prompt({
    type:'select',
    name: 'company',
    message: '选择公司',
    choices: ['阿里巴巴', '字节跳动', '腾讯', '拼多多', '百度','华为']
  });
  Object.assign(result,response)
  // console.log(response)

  let url = `https://www.nowcoder.com/search?type=post&order=recall&query=${result.company}+${result.job}&subType=0&tagId=&page=2`
  let res = await fetch(url)
  let body = await res.text()
  fs.writeFileSync( path.join(process.cwd(),`${result.job}_${result.company}_1.html`),body,'utf-8' )

}

start()