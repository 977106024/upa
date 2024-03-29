import axios from 'axios'

const cc = [
    'SZ000017',
    'SZ000938',
    'SH603220',
    'SZ002439',
    'SZ300033'
]

const urlcc = `https://stock.xueqiu.com/v5/stock/realtime/quotec.json?symbol=${cc.toString()}`


export const getCC = () => {
    axios.get(urlcc)
        .then(res => {
            const data = res.data.data
            const arr = data.map((item, i) => {
                return item.percent
            });
            console.trace(arr.join(','));
        })
        .catch(err => {
            console.log(err, 'sss');
        });

}   
