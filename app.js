const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes/index')

const shortenURLdata = require('./models/shortenURLdata')
require('./config/mongoose') // 呼叫mongoose並執行一次

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' })) //設定模板引擎
app.set('view engine', 'handlebars') //啟動模板引擎
app.use(bodyParser.urlencoded({ extended: true }))

//設定路由器
app.use(routes)

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})
