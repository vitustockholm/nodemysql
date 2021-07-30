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
// -- get all cars
app.get('/api/cars', (req, res) => {
  let query = connection.query('SELECT * FROM cars', (err, data) => {
    res.json(data);
  });
});
// -- get single car based on ID
app.get('/api/cars/:id', (req, res) => {
  let carId = req.params.id;
  console.log('reqparamsid' + req.params.id);
  let query = connection.query(
    `SELECT * FROM cars WHERE ID = ${req.params.id}`,
    (error, data) => {
      res.json(data);
    }
  );
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
    res.send('Car added');
  });
});
// DELETE
// -- delete single car basid on ID
let deletecarId;
app.delete('/api/cars/:id', (req, res) => {
  let deletecarId = req.params.id;
  console.log('deletecarid:' + deletecarId);

  let query = connection.query(
    `DELETE FROM cars WHERE ID = ${carId}`,
    (error, data) => {
      res.json({ deleteStatus: 'success' });
    }
  );
});
app.listen(5000);
