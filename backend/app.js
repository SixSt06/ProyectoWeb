
const path = require('path');
const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const postRoutes = require("./routes/posts");

const app = express();

mongoose.connect("mongodb+srv://Admin:Ln321654@cluster1.bddlv9r.mongodb.net/node-angulars?retryWrites=true&w=majority")
.then(()=>{
  console.log('Base de datos conectada');
})
.catch(()=>{
  console.log('Conexion Fallida: (');
})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Request, Content-Type, Accept");
  res.setHeader("Allow","GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api.posts", postRoutes);


module.exports = app;

