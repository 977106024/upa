#!/usr/bin/env node

import colors from 'colors'
import axios from 'axios'
import { bigNumberTransform } from './bigNumberTransform.js'
import { getCC } from './cc.js'
// SZ SH 添加
const addLastName = (val) => {
  if (val[0] === '6') {
    return 'SH' + val
  } else {
    return 'SZ' + val
  }
}

if (process.argv[2]?.startsWith('c')) {
  getCC()
} else {


  const list = [
    'SH603019',
    'SH601138',
    'SZ000977',
    'SH603220',
    'SZ000938'
  ]
  const nameArr = ['✨',' 💜',  ' 💻', '👨‍🔧', '🧭']

  const errorList = ['Maximum call stack size exceeded', '"god" is not defined', 'Invalid or unexpected token', 'Cannot read property "node" of undefined']

  const query = process.argv[2] ? addLastName(process.argv[2]) : list.toString()
  const url = `https://stock.xueqiu.com/v5/stock/realtime/quotec.json?symbol=${query}`

  const getDetail = (item) => {
    const { current, percent, high, low, amount, amplitude, turnover_rate, open } = item
    console.log(current, percent, high, low, amplitude, bigNumberTransform(amount), '🤲' + turnover_rate, '🔓' + open)
  }

  axios.get(url)
    .then(res => {
      const data = res.data.data
      data.forEach((item, i) => {
        if (process.argv[2]) {
          getDetail(item)
          return
        }
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

  if (!process.argv[2]) {

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
        console.trace('XNY', arr);
      })
      .catch(err => {
        console.log(err, 'sss');
      });

    const qs = [
      'SH601136',
      'SH512880',
      'SZ300033',
      'SZ300059'
    ]

    const urlAI = `https://stock.xueqiu.com/v5/stock/realtime/quotec.json?symbol=${qs.toString()}`

    axios.get(urlAI)
      .then(res => {
        const data = res.data.data
        const arr = data.map((item, i) => {
          const { current, percent, low } = item
          return [current, percent, low]
        });
        setTimeout(() => {
          console.trace(arr);
        }, 800)
      })
      .catch(err => {
        console.log(err, 'sss');
      });

    setTimeout(() => {
      console.log('npm ' + colors.bgYellow.black('WARN') + colors.green(' npm') + ' npm does not support Node.js v16.13.1')
      console.log('npm ' + colors.bgYellow.black('WARN') + colors.green(' npm') + ' You should probably upgrade to a newer version of node as we')
      console.log('npm ' + colors.bgYellow.black('WARN') + colors.green(' npm') + ' Supported releases of Node.js are the latest release of 6, 8, 9, 10, 11.')
      console.log('npm ' + colors.bgYellow.black('WARN') + colors.green(' npm') + ' You can find the latest version at ' + colors.blue.underline('https://nodejs.org/'))
      console.log('   ')
      console.log('npm ' + colors.red('ERR!') + ' A complete log of this run can be found in:')
      console.log('npm ' + colors.red('ERR!') + ' c:\/users gsdrt AppData Roaming npm-cache _ ogs 2023-05-24T08_56_39_412Z-debug.log')
    }, 900)

  }


}
