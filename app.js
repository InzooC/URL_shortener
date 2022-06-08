const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' })) //設定模板引擎
app.set('view engine', 'handlebars') //啟動模板引擎

app.use(bodyParser.urlencoded({ extend: true }))



app.get('/', (req, res) => {
  res.render('index')
})


app.listen(port, () => {
  console.log(`app is listening on http://locaolhost:${port}`)
})