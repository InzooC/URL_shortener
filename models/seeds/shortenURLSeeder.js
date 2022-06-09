const shortenURL = require('../shortenURLdata') //載入shortenURL模組
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected')
  for (let i = 1; i < 4; i++) {
    shortenURL.create({
      originalURL: `seedOriginalURL-${i}`,
      generateURL: `seedGenerateURL-${i * 10}`
    })
  }
  console.log('done!')
})