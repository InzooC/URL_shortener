const express = require('express')
const router = express.Router()
const shortenURLdata = require('../../models/shortenURLdata')
const generateSerial = require('../../models/generatesSerial')

// get首頁
router.get('/', (req, res) => {
  res.render('index')
})

//post首頁(input 原始網址)
router.post('/', (req, res) => {
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

// 收到shortenURL, 導向originalURL
router.get('/:shortenURL', (req, res) => {
  const shortenURL = req.params.shortenURL
  shortenURLdata.find({ generateURL: shortenURL })
    .then(url => {
      if (typeof (url[0]) === 'undefined') {
        res.redirect('/')
      } else {
        res.redirect(`${url[0].originalURL}`)
      }
    })
})

// 匯出路由器
module.exports = router