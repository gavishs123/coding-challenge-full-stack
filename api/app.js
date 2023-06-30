const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./src/routes"); 

const allowedOrigins = ["http://localhost:3000"];


app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins); 
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors());

app.use("/", mainRouter);
app.use(express.static(__dirname + "/"));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    // Handle other errors
    console.error(err.stack);
    res.status(500).send("Internal Server Error!!!");
  }
});

module.exports = app;
