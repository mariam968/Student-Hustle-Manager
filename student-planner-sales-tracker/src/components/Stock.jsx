import  {UseState, UseEffect, useState, useEffect} from "react";

function Stock(){
  const[stock, setStock] = useState([]);

  const[item, setItem] = useState("");
  const[quantity, setQuantity] = useState("");

  // load
  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("stock"));
    if(saved)setStock(saved);
  },[]);

  // save
  useEffect(()=>{
    localStorage.setItem("stock", JSON.stringify(stock));

  },[stock]);

  // add stock
  const addStock = ()=>{
    if(!item || !quantity)return;

    const newItem ={
      item,
      quantity: Number(quantity),
      date: new Date().toLocaleDateString(),
    };

    setStock([...stock, newItem]);

    setItem("");
    setQuantity("");

  };

  // delete item
  const deleteItem = (index)=>{
    const updated = stock.filter((_, i)=> i==index);
    setStock(updated);
  };

  // total items count
  const totalItems = stock.reduce((sum, s)=>sum + s.quantity, 0);

  return(
    <div>
      <h1>📦Stock</h1>

      {/* form */}
      <div className="form">
        <input 
        placeholder="form"
        value={item}
        onChange={(e)=>setItem(e.target.value)}
         />

         <input 
         placeholder="Quantity"
         type="number"
         value={quantity}
         onChange={(e)=>setQuantity(e.target.value)}
         />

         <button onClick={addStock}>Add Stock</button>
      </div>

      {/* summary */}
      <div style={{marginTop:"20px"}}>
        <div className="card">
          <h3>Total Items in Stock</h3>
          <p>{totalItems}</p>
        </div>
      </div>

      {/* stock list */}
      <div style={{marginTop:"20px"}}>
        {stock.map((item, index)=>(
          <div key={index} className="card">
            <div>
              <strong>{item.item}</strong> - {item.quantity} pcs
              <br />
              <small>Updated:{item.date}</small>
            </div>

            <button onClick={()=> deleteItem(index)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stock;