const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/src'))
app.set('view engine', 'pug')
app.get('/', (req, res) => res.render('index'))

app.listen(port, () => console.log('App listening on port ' + port))