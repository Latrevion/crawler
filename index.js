#!/usr/bin/env node
// console.log('hello Latrevion')

const fetch = require("node-fetch")
const fs    = require("fs")
const path  = require("path")

// fetch("https://www.nowcoder.com/search?type=post&order=recall&query=%E8%85%BE%E8%AE%AF+%E5%89%8D%E7%AB%AF&subType=0&tagId=&page=2")
//   .then(res => res.text())
//     .then(text => {
//       console.log(text)
//     })

let job = "前端"
let company = "腾讯"


async function start() {
  let url = `https://www.nowcoder.com/search?type=post&order=recall&query=${company}+${job}&subType=0&tagId=&page=2`
  let res = await fetch(url)
  let body = await res.text()
  fs.writeFileSync( path.join(process.cwd(),`${job}_${company}_1.html`),body,'utf-8' )
  // console.log(body)
}

start()