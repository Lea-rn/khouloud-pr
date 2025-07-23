import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const App = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les pizzas au démarrage
  useEffect(() => {
    fetch("http://localhost:5500/home")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          name: item.name,
          ingredients: item.ingredients,
          price: item.price,
          photoName: item.image,
          soldOut: false,
        }));
        setPizzas(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pizzas:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
      <Add pizzas={pizzas} setPizzas={setPizzas} />
      <Menu pizzas={pizzas} loading={loading} />
      <Footer />
    </div>
  );
};

export default App;

function Header() {
  return (
    <header>
      <h1 className="title">Fast React Pizza Co.</h1>
    </header>
  );
}

function Add({ pizzas, setPizzas }) {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5500/add", formData);
      alert("Pizza ajoutée avec succès !");
      // Met à jour la liste sans refetch
      setPizzas([
        ...pizzas,
        {
          name: formData.name,
          ingredients: formData.ingredients,
          price: formData.price,
          photoName: formData.image,
          soldOut: false,
        },
      ]);
      setFormData({ name: "", ingredients: "", price: "", image: "" });
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      alert("Erreur lors de l'ajout de la pizza.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="ingredients">Ingrédients</label>
      <textarea
        id="ingredients"
        name="ingredients"
        value={formData.ingredients}
        onChange={handleChange}
        rows="3"
        required
      ></textarea>

      <label htmlFor="price">Price (€)</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
        required
      />

      <label htmlFor="image">Image (URL)</label>
      <input
        type="text"
        id="image"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit">Add pizza</button>
    </form>
  );
}

function Menu({ pizzas, loading }) {
  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div>
      <h2 className="menu-title">Our Menu</h2>
      {pizzas.length > 0 ? (
        <>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "20px",
              borderBottom: "solid",
              borderBottomWidth: "1px",
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="menu-subtitle"
          >
            Authentic Italian cuisine. {pizzas.length} creative dishes to choose
            from. All from our stone oven. All organic, all delicious.
          </p>
          <div className="card-container">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </div>
        </>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginTop: "20px",
            marginBottom: "20px",
            borderBottom: "solid",
            borderBottomWidth: "1px",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className="loading"
        >
          No pizza for the moment , please come back later
        </p>
      )}
    </div>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <div className={`card ${pizzaObj.soldOut ? "soldout" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div className="info">
        <h2>{pizzaObj.name}</h2>
        <p>{pizzaObj.ingredients}</p>
        <strong>{pizzaObj.soldOut ? "Sold Out" : `${pizzaObj.price} €`}</strong>
      </div>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;

  return (
    <footer>
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p className="footer-msg">
          We're happy to welcome you between {openHour}:00 and {closeHour}:00 😊
        </p>
      )}
    </footer>
  );
}

function Order({ closeHour }) {
  return (
    <div>
      <p>We're open until {closeHour}:00. Come visit us or order online</p>
      <button>Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
