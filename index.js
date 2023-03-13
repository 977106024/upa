#!/usr/bin/env node


const axios = require('axios');
const colors = require('colors')

const list = {
  '首':'SH601136',
  '-': 'SZ002594',
  '比': 'SZ300750',
  '*': 'SZ002049'
}

const query = process.argv[2] ? process.argv[2] : Object.values(list).toString()
const url = `https://stock.xueqiu.com/v5/stock/realtime/quotec.json?symbol=${query}`


axios.get(url)
  .then(res => {
    const data = res.data.data
    data.forEach((item,i) => {
      const {low,high} = item
      let current = ''
      let percent = ''
      let name = Object.keys(list)[i]
      if(String(item.percent).indexOf('-') === -1){
        current = colors.red.bold(item.current)
        percent = colors.red(item.percent+'%')
      }else{
        current = colors.green.bold(item.current)
        percent = colors.green(item.percent+ '%')
      }
      if(name == '*'){
        name = colors.magenta(name)
      }
        console.log(name,current,percent,    low);
    });
    
  })
  .catch(err => {
    console.log(err,'sss');
  });



