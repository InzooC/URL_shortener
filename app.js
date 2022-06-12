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

  // 判斷originalURL是否有文字
  // if 沒有 跳提示
  if (originalURL.length === 0) {
    const alert = 'Please enter URL'
    res.render('index', { alert: alert })
  } else {

    // if 有 進入判斷循環

    // 找出是否已經有一樣的originalURL
    shortenURLdata.find({ originalURL: originalURL })
      .then(url => {
        if (url.length === 0) {
          //如果沒有，就製造新的generateURL，存進database，然候render
          const generateURL = generateSerial()
          shortenURLdata.create({ originalURL, generateURL })     // 存入資料庫
            .catch(error => console.log(error))
          res.render('showURL', { generateURL: generateURL })
        } else if (url.length > 0) {
          //如果有就render已經有的generateURL
          res.render('showURL', { generateURL: url[0].generateURL })
        }
      })
  }

})

// 製作新序號的function
function generateSerial() {
  const number = '0123456789'
  const lowerCaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseAlphabet = lowerCaseAlphabet.toUpperCase()
  const element = number.concat(lowerCaseAlphabet).concat(upperCaseAlphabet).split('')
  let serial = ''
  for (let i = 0; i < 5; i++) {
    serial += element[Math.floor(Math.random() * 62)]
  }
  return serial
}

// 收到點選copy的動作post
app.post('/showURL', (req, res) => {
  // const copyURL = 
  console.log(req.body)
})


// 收到shortenURL, 導向originalURL
app.get('/:shortenURL', (req, res) => {
  const shortenURL = req.params.shortenURL
  shortenURLdata.find({ generateURL: shortenURL })
    .then(url => {
      if (typeof (url[0]) === 'undefined') {
        res.redirect('/')
      } else {
        res.redirect(`${url[0].originalURL}`)
      }
      // if (url !== []) {
      // }
    })
})


app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})

// 挑戰功能
// 使用者可以按 Copy 來複製縮短後的網址