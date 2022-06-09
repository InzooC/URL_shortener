const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const shortenURLdata = require('./models/shortenURLdata')

require('./config/mongoose') // 呼叫mongoose並執行一次

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' })) //設定模板引擎
app.set('view engine', 'handlebars') //啟動模板引擎

app.use(bodyParser.urlencoded({ extend: true }))

//設定路由器
// get首頁
app.get('/', (req, res) => {
  res.render('index')
})
//post首頁
app.post('/', (req, res) => {
  const originalURL = req.body.originalURL
  // 製造一個序號，把originalURL和序號一起create進database裡
  const generateURL = generateSerial()
  shortenURLdata.create({ originalURL, generateURL })     // 存入資料庫
    .catch(error => console.log(error))
  res.render('showURL', { generateURL: generateURL })

  // 還無法做出判originalURL已存在於資料庫的function---之後優化
  // const filerURL = isURLexist(originalURL)
  // console.log(filerURL)
  // if (filerURL.length === 0) {
  //   console.log('沒有')
  // } else {
  //   console.log('修改generateURL,id是:' + filerURL.id)
  //   shortenURLdata.findById(filerURL.id)
  //     .then(url => {
  //       url.generateURL = 'www.12345'
  //       return url.save()
  //     })
  // }

})

//比對是否有相同的URL function 未成功 return的東西出不去
// function isURLexist(originalURL) {
//   shortenURLdata.find()
//     .lean()
//     .then(urls => {
//       let filterURL = urls.filter(url => url.originalURL === originalURL)
//       return filterURL
//     })
// }

// 製作新序號的function
function generateSerial() {
  const number = '0123456789'
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const element = number.concat(alphabet).split('')
  let serial = ''
  for (let i = 0; i < 5; i++) {
    serial += element[Math.floor(Math.random() * 36)]
  }
  return serial
}




app.get('/:shortenURL', (req, res) => {
  res.render('showURL')
})



app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})