import { useState, useEffect } from "react";

function Dashboard() {
  const [sales, setSales] = useState([]);
  const [debts, setDebts] = useState([]);
  const [stock, setStock] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setSales(JSON.parse(localStorage.getItem("sales")) || []);
    setDebts(JSON.parse(localStorage.getItem("debts")) || []);
    setStock(JSON.parse(localStorage.getItem("stock")) || []);
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, []);

  // sales calculation
  const totalSales = sales.reduce((sum, s) => sum + s.total, 0);

  const today = new Date().toLocaleDateString();

  const todaySales = sales
    .filter((s) => new Date(s.date).toLocaleDateString() === today)
    .reduce((sum, s) => sum + s.total, 0);

  const weekSales = sales
    .filter((s) => {
      const diff = (new Date() - new Date(s.date)) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    })
    .reduce((sum, s) => sum + s.total, 0);

  const monthSales = sales
    .filter((s) => {
      const diff = (new Date() - new Date(s.date)) / (1000 * 60 * 60 * 24);
      return diff <= 30;
    })
    .reduce((sum, s) => sum + s.total, 0);

  // debts
  const unpaidDebt = debts
    .filter((d) => d.status === "not paid")
    .reduce((sum, d) => sum + d.amount, 0);

  // stock
  const totalStock = stock.reduce((sum, s) => sum + s.quantity, 0);

  // TASKS
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div>
      <h1>🚀 Student Hustle Manager</h1>
      <p>Welcome back, CEO 👑</p>

      {/*sales card */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Sales</h3>
          <p>{totalSales} UGX</p>
        </div>

        <div className="dashboard-card">
          <h3>Today</h3>
          <p>{todaySales} UGX</p>
        </div>

        <div className="dashboard-card">
          <h3>This Week</h3>
          <p>{weekSales} UGX</p>
        </div>

        <div className="dashboard-card">
          <h3>This Month</h3>
          <p>{monthSales} UGX</p>
        </div>
      </div>

      {/* others */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>💳 Unpaid Debts</h3>
          <p>{unpaidDebt} UGX</p>
        </div>

        <div className="dashboard-card">
          <h3>📦 Stock Items</h3>
          <p>{totalStock}</p>
        </div>

        <div className="dashboard-card">
          <h3>📚 Tasks Done</h3>
          <p>{completedTasks}</p>
        </div>
      </div>

      {/*  motivation */}
      <div style={{ marginTop: "30px" }} className="dashboard-card">
        <h3>🔥 Daily Motivation</h3>
        <p>
          Small daily actions create big results. Stay consistent, track everything,
          and build your empire step by step.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;