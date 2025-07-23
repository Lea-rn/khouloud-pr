const db = require("../database.js");




//// get list of pizza model :

exports.getPizzaModel = async () => {
  try {
    const [pizza] = await db.query("SELECT * FROM menu");
    return pizza;
  } catch (err) {
    console.error(err);
    return [];
  }
};



//// add pizza model :: 

exports.addPizzaModel = async (pizzaData) => {
  const { name, ingredients, price, image } = pizzaData;
  try {
    const [result] = await db.query(
      'INSERT INTO menu (name, ingredients, price, image) VALUES (?, ?, ?, ?)',
      [name, ingredients, price, image]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
