const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
// Connecting DB
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_first_db',
});
connection.connect(() => console.log('Connected MySQL...'));
// Starting express app
let app = express();
// -- middlewares
app.use(cors());
app.use(express.json());
// Routes
// GET

app.get('/api/cars', (req, res) => {
  let query = connection.query('SELECT * FROM cars', (err, data) => {
    res.json(data);
  });
});
// POST
// -- create table
app.post('/api/admin/createtable', (req, res) => {
  const tableName = req.body.tableName;
  connection.query(
    `CREATE TABLE ${tableName}(ID int AUTO_INCREMENT, make VARCHAR(255), model VARCHAR(255), PRIMARY KEY (ID))`,
    () => {
      console.log(`${tableName} table created...`);
    }
  );
});
// -- add car to cars table
app.post('/api/cars', (req, res) => {
  let car = req.body;

  let query = connection.query('INSERT INTO cars SET ?', car, () => {
    console.log('Car added');
    res.send('Car added');
  });
});
app.listen(5000);
