#!/usr/bin/env node


const axios = require('axios');
const colors = require('colors')

const list = [
  'SH601136',
  'SH600072',
  'SH512880'
]
const nameArr = ['S','E','中']

const errorList = ['Maximum call stack size exceeded', '"god" is not defined', 'Invalid or unexpected token', 'Cannot read property "node" of undefined']

const query = process.argv[2] ? process.argv[2] : list.toString()
const url = `https://stock.xueqiu.com/v5/stock/realtime/quotec.json?symbol=${query}`


axios.get(url)
  .then(res => {
    const data = res.data.data
    data.forEach((item, i) => {
      const { low, high } = item
      let current = ''
      let percent = ''
      let name = nameArr[i]
      if (String(item.percent).indexOf('-') === -1) {
        current = colors.red.bold(item.current)
        percent = colors.red(item.percent)
      } else {
        current = colors.green.bold(item.current)
        const i = Math.floor(Math.random() * errorList.length)
        console.trace(errorList[i])
        percent = colors.green(item.percent)
      }
      if (name == '*') {
        name = colors.magenta(name)
      }
      console.log(name, current, percent, low);
    });

  })
  .catch(err => {
    console.log(err, 'sss');
  });

const XNY = [
  'SZ002594',
  'SZ300750',
  'SZ300274',
  'SH601012'
]

const url2 = `https://stock.xueqiu.com/v5/stock/realtime/quotec.json?symbol=${XNY.toString()}`

axios.get(url2)
  .then(res => {
    const data = res.data.data
    const arr = data.map((item, i) => {
      const { current, percent } = item
      return [current, percent]
    });
    console.trace(arr);


  })
  .catch(err => {
    console.log(err, 'sss');
  });

  const AI = [
    'SH603019',
    'SH603083',
    'SH603888'
  ]

  const urlAI = `https://stock.xueqiu.com/v5/stock/realtime/quotec.json?symbol=${AI.toString()}`

axios.get(urlAI)
  .then(res => {
    const data = res.data.data
    const arr = data.map((item, i) => {
      const { current, percent, low } = item
      return [current, percent, low]
    });
    console.trace(arr);


  })
  .catch(err => {
    console.log(err, 'sss');
  });