const express = require("express");
const pizzaroutes = require ("./routes/pizzaroutes.js")

const app = express () ;

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/", pizzaroutes);



app.listen(5500, () => {
  console.log("Server is running on port 5500");
});