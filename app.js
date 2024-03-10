// Task1: initiate app and run server at 3000
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const { error } = require("console");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.static(path.join(__dirname + "/dist/FrontEnd")));

// Task2: create mongoDB connection

const URI = process.env.MONGODB_URL;
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Step 3: Define a Mongoose schema for your employees
const employeeSchema = new mongoose.Schema({
  name: String,
  location: String,
  position: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

app.use(express.json());

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get("/api/employeelist/:id", (req, res) => {
  res.send(res.employee);
});

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put("/api/employeelist", async (req, res) => {
  try {
    const employees = await Employee.findOneAndUpdate();
    res.send(employees);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

//! dont delete this code. it connects the front end file.
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/Frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
