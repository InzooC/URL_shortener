const mongoose = require('mongoose')

//連線設定
mongoose.connect('mongodb+srv://Inzoo:aaa1234@cluster0.uxzco.mongodb.net/URL-shortener?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })


// 取得資料庫連線狀態
const db = mongoose.connection
//顯示連線狀態
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db