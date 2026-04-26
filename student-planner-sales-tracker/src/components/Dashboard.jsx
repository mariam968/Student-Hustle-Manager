import { useState, useEffect } from "react";

function Dashboard(){
  const [sales, setSales] = useState([]);

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("sales"));
    if (saved) setSales(saved);
  },[]);

  // total sales
  const totalSales = sales.reduce((sum, sale)=>sum + sale.total, 0);

  // today's date
  const today = new Date().toLocaleDateString();

  const todaySales = sales
  .filter((sale)=>sale.date === today)
  .reduce((sum, sale)=>sum + sale.total, 0);

  // weekly sales
  const weekSales = sales
  .filter((sale)=>{
    const saleDate = new Date(sale.date);
    const now = new Date();
    const diff = (now - saleDate) / (1000*60*60*24);
    return diff <= 7;
  })
  .reduce((sum, sale)=>sum + sale.total, 0);


  // monthly sales
  const monthSales = sales
  .filter((sale)=>{
    const saleDate = new Date(sale.date);
    const now = new Date();
    const diff = (now - saleDate) / (1000*60*60*24);
    return diff <= 30;
  })
  .reduce((sum,sale)=>sum + sale.total, 0);

  return(
    <div>
      <h1>🚀Student Hustle Manager</h1>
      <p>Welcome back, CEO 👑</p>
      
      <div style={{display:"flex", gap:"20px", marginTop:"20px", flexWrap:"wrap"}}>

        {/* today */}
        <div className="card">
          <h3>Total Sales</h3>
          <p>{totalSales} UGX</p>
        </div>

        {/* Week */}
        <div className="card">
          <h3>This Week</h3>
          <p>{weekSales}</p>
        </div>

        {/* month */}
        <div className="card">
          <h3>This Month</h3>
          <p>{monthSales} UGX</p>
        </div>


      </div>
    </div>
  );
}

export default Dashboard;