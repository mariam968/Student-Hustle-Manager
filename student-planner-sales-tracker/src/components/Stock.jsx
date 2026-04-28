import { useState, useEffect } from "react";

function Stock() {
  const [stock, setStock] = useState([]);

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // Load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("stock"));
    if (saved) setStock(saved);
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("stock", JSON.stringify(stock));
  }, [stock]);

  // Add stock
  const addStock = () => {
    if (!item || !quantity || !price) return;

    const total = Number(quantity) * Number(price);

    const newItem = {
      item,
      quantity: Number(quantity),
      price: Number(price),
      total,
      date: new Date().toLocaleDateString(),
    };

    setStock([...stock, newItem]);

    setItem("");
    setQuantity("");
    setPrice("");
  };

  // Delete
  const deleteItem = (index) => {
    const updated = stock.filter((_, i) => i !== index);
    setStock(updated);
  };

  // Total stock value
  const totalValue = stock.reduce((sum, s) => sum + s.total, 0);

  return (
    <div>
      <h1>📦 Stock</h1>
      <p>So what are we adding today? 👀</p>

      {/* FORM */}
      <div className="form">
        <input
          placeholder="Item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />

        <input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          placeholder="Price (per item)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addStock}>Add Stock</button>
      </div>

      {/* Total value */}
      <div style={{ marginTop: "20px" }}>
        <div className="card">
          <h3>Total Stock Value</h3>
          <p>{totalValue} UGX</p>
        </div>
      </div>

      {/* Stock list*/}
      <div style={{ marginTop: "20px" }}>
        {stock.map((item, index) => (
          <div key={index} className="card">
            <div>
              <strong>{item.item}</strong>
              <p>{item.quantity} pcs * {item.price}</p>
              <small>Total: {item.total} UGX</small>
              <br />
              <small>{item.date}</small>
            </div>

            <button onClick={() => deleteItem(index)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stock;