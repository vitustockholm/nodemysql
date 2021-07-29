const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

//--Connecting DB
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_first_db',
});

connection.connect(() => console.log('Connected to MYSQL'));

//--Starting express app
let app = express();

//--Midllewares

app.use(cors());
app.use(express.json());

//Routes

//GET

//POST
app.post('/api/cars', (req, res) => {
  //   console.log(req.body);

  let car = req.body;

  let querry = connection.query('INSERT INTO cars SET ?', car, () => {
    console.log('car added');
    res.send('Car Added');
  });
});


//
app.post('/api/posts', (req, res) => {
    console.log(req.body);
    let post = { title: `${req.body.title}`, body: `${req.body.body}` };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Post from front-end added...');
    });
  });
//


app.listen(5000);
