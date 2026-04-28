import { useState } from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import Sales from "./components/Sales";
import Debts from "./components/Debts";
import Stock from "./components/Stock";
import Planner from "./components/Planner";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  //shared stock
  const [stock, setStock] = useState([]);

  // Page render function
  const renderPage = () => {
    switch (activePage) {
      case "sales":
        return <Sales stock={stock} setStock={setStock} />;
      case "debts":
        return <Debts />;
      case "stock":
        return <Stock stock={stock} setStock={setStock} />;
      case "planner":
        return <Planner />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      
      {/* sidebar*/}
      <div className="sidebar">
        <h2>💼 Student Hustle Manager</h2>

        <button onClick={() => setActivePage("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setActivePage("sales")}>
          Sales
        </button>

        <button onClick={() => setActivePage("debts")}>
          Debts
        </button>

        <button onClick={() => setActivePage("stock")}>
          Stock
        </button>

        <button onClick={() => setActivePage("planner")}>
          Planner
        </button>
      </div>

      {/* main content*/}
      <div className="main-content">
        {renderPage()}
      </div>

    </div>
  );
}

export default App;