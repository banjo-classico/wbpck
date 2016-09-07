var express = require('express')
var http = require('http')
var path = require('path')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

server.listen(port, () => {
  console.log('Running on port ' + port)
})