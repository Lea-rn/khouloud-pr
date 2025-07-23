const express = require("express"); 
const pizzaroutes = express.Router() ; 

const pizzaController = require ("../controller/pizza-controller.js") ; 

pizzaroutes.get('/home' , pizzaController.getPizzaController) ; 
pizzaroutes.post('/add', pizzaController.addPizzaController);


module.exports = pizzaroutes ; 







