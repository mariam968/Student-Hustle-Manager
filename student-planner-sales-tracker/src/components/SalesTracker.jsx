import { useState, useEffect } from "react";

function SalesTracker(){
  const[sales, setSales] = useState([]);

  const[product, setProduct] = useState("");
  const[price, setPrice] = useState("");
  const[cost, setCost] = useState("");
  const[quantity, setQuantity] = useState("");

  // load sales
  useEffect(()=> {
    const saved = JSON.parse(localStorage.getItem("sales"));
    if (saved) setSales(saved);
  },[]);

  // Save sales
  useEffect(()=>{
    localStorage.setItem("sales",JSON.stringify(sales));
  },[sales]);

  const addSale = () => {
    if(!product || !price || !cost || !quantity)return;

    const newSale = {
      product,
      price: Number(price),
      cost: Number(cost),
      quantity: Number(quantity),
      date: new Date().toISOString(),
    };

    setSales([...sales, newSale]);

    // clear inputs
    setProduct("");
    setPrice("");
    setCost("");
    setQuantity("");
  };

  return(
    <div style={{maxWidth: "600px",margin:"auto"}}>
      <h1>Sales Tracker</h1>

      {/* form */}
      <div style={{display:"flex", flexDirection: "column", gap:"10px"}}>
        <input 
        placeholder="Product name"
        value={product}
        onChange={(e)=>setProduct(e.target.value)}
        />

        <input 
        placeholder="Selling price"
        type="number"
        value={price}
        onChange={(e)=> setPrice(e.target.value)}
        />

      <input 
      placeholder="Cost price"
      type="number"
      value={cost}
      onChange={(e)=> setCost(e.target.value)}
       />

       <input
       placeholder="Quantity"
       type="number"
       value={quantity}
       onChange={(e)=> setQuantity(e.target.value)}
        />

        <button onClick={addSale}>Add Sale</button>
      </div>

      {/* sales list */}
      <ul style={{marginTop:"20px"}}>
        {sales.map((sale, index)=>(
          <li key={index}>
            {sale.product} - {sale.quantity} pcs - {sale.price} UGX 
           
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SalesTracker;