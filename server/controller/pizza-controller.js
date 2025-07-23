const pizzamodel = require("../model/pizza-model") ; 


/// get list of pizza controller :
exports.getPizzaController = (req, res) => {
  pizzamodel.getPizzaModel().then((list) => {
    res.send(list);
  });
};



///// add pizza controller :: 

exports.addPizzaController = async (req, res) => {
  try {
    const pizzaData = req.body;
    const result = await pizzamodel.addPizzaModel(pizzaData);
    res.status(201).send({ message: "Pizza added successfully", id: result.insertId });
  } catch (err) {
    res.status(500).send({ error: "Failed to add pizza" });
  }
};
