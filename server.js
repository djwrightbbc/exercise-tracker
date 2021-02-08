const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const database = require('./database');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(bodyParser.urlencoded({extended: false}));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

app.post('/api/exercise/new-user', (req, res) => {
  database.saveNewUserToDatabase(req.body.username, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.json(response);      
    }
  });
});
