import { useState, useEffect, use } from "react";

function SalesTracker(){
  const[sales, setSales] = useState([]);

  const[product, setProduct] = useState("");
  const[price, setPrice] = useState("");
  const[cost, setCost] = useState("");
  const[quantity, setQuantity] = useState("");

  // daily sales state
  const [dailySales, setDailySales] = useState([]);
  const [dailyAmount, setDailyAmount] = useState("");
  const [note, setNote] = useState("")

  // load data
  useEffect(()=> {
    const savedSales = JSON.parse(localStorage.getItem("sales"));
    if (savedSales) setSales(savedSales);

    const savedDaily = JSON.parse(localStorage.getItem("dailySales"));
    if(savedDaily) setDailySales(savedDaily);
  },[]);

  // Save data
  useEffect(()=>{
    localStorage.setItem("sales",JSON.stringify(sales));
  },[sales]);

  useEffect(()=>{
    localStorage.setItem("dailySales",JSON.stringify(dailySales));
  },[dailySales]);

  // addd product sale

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

  // add daily sale
  const addDailySale =()=>{
    if(!dailyAmount)return;

    const newEntry ={
      amount: Number(dailyAmount),
      note: note,
      date: new Date().toLocaleDateString(),

    };

    setDailySales([...dailySales, newEntry]);

    setDailyAmount("");
    setNote("");
  };

  return(
    <div style={{maxWidth: "700px",margin:"auto"}}>
      <h1>Sales Tracker</h1>

      {/* product sales section */}
      <h2>Add Product Sale</h2>

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

      <hr />

      {/* daily sales section */}
      <h2>Daily Sales Log</h2>

      <div style={{display:"flex", flexDirection: "column", gap: "10px"}}>
        <input
        placeholder="Amount made today"
        type="number"
        value={dailyAmount}
        onChange={(e)=> setDailyAmount(e.target.value)}
        />

        <input 
        placeholder="Note (optional)"
        value={note}
        onChange={(e)=> setNote(e.target.value)}
        />

        <button onClick={addDailySale}>Add Daily Sale</button>
      </div>

      {/* daily sales list */}
      <ul style={{marginTop:"20px"}}>
        {dailySales.map((entry, index)=>(
          <li key={index}>
            {entry.date} - {entry.amount} UGX ({entry.note})
          </li>

        ))}
      </ul>
    </div>
  );
}
export default SalesTracker;