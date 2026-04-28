import { useState, useEffect } from "react";

function Sales() {
  const [sales, setSales] = useState([]);

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // LOAD
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sales"));
    if (saved) setSales(saved);
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  // ADD SALE
  const addSale = () => {
    if (!item || !quantity || !price) return;

    const total = Number(quantity) * Number(price);

    const newSale = {
      item,
      quantity: Number(quantity),
      price: Number(price),
      total,
      date: new Date().toISOString(), // IMPORTANT
    };

    setSales([...sales, newSale]);

    setItem("");
    setQuantity("");
    setPrice("");
  };

  // GROUP BY DATE
  const groupedSales = sales.reduce((acc, sale) => {
    const date = new Date(sale.date).toLocaleDateString();

    if (!acc[date]) acc[date] = [];
    acc[date].push(sale);

    return acc;
  }, {});

  return (
    <div>
      <h1>💰 Sales</h1>

      {/* FORM */}
      <div className="form">
        <input
          placeholder="Item"
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
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addSale}>Add Sale</button>
      </div>

      {/* SALES DISPLAY */}
      <div style={{ marginTop: "20px" }}>
        {Object.keys(groupedSales).map((date) => {
          const dailyTotal = groupedSales[date].reduce(
            (sum, s) => sum + s.total,
            0
          );

          return (
            <div key={date} style={{ marginBottom: "20px" }}>
              <h3>{date}</h3>

              {groupedSales[date].map((sale, index) => (
                <div key={index} className="card">
                  <span>
                    {sale.item} ({sale.quantity} × {sale.price})
                  </span>
                  <strong>{sale.total} UGX</strong>
                </div>
              ))}

              <p>
                <strong>Total: {dailyTotal} UGX</strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sales;