const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/src'))
app.set('view engine', 'pug')
app.get('/zulit', (req, res) => res.render('zulit'))

app.listen(PORT, () => console.log('App listening on port ' + PORT))