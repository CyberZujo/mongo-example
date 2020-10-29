const mongodb = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser());
app.listen(3000,() => {
    console.log('Listening on port 3000');
})


const CONNECTION_STRING = "mongodb://localhost:27018/tododb";
mongoose.connect(CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });

  const Schema = mongoose.Schema;

  let employee = new Schema(
    {
      name: {
        type: String,
        unique: true
      },
      age: {
        type: Number,
        validate: function(value) {
            console.log('Validating: ' + value);
        }
      },
      location: {
        type: String
      }
    },
    { collection: "Employees" }
  );
  
 const model = mongoose.model('Employees', employee);


app.post('/create', async (req, res) => {

    const data = req.body;
    console.log(data);
    const emp = new model(data);
    await emp.save();

    res.sendStatus(200);
});

app.get('/', async (req, res) => {

    const employees = await model.findById();
    console.log(employees);
 
    res.send(employees);
});



