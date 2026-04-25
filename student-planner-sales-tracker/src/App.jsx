import { useState } from 'react'
import Dashboard from './components/Dashboard';
import SalesTracker from './components/SalesTracker';
import StudentPlanner from './components/StudentPlanner';
import './App.css'

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch(activePage) {
      case "sales":
        return <SalesTracker/>;
        case "planner":
          return <StudentPlanner/>;
          default:
            return <Dashboard/>;

    }
  };

  return (
    <>
   <div className='app'>
    <aside className='sidebar'>
      <h2>My App</h2>
      <button onClick={()=>setActivePage("dashboard")}>Dashboard</button>
      <button onClick={()=>setActivePage("sales")}>SalesTracker</button>
      <button onClick={()=>setActivePage("planner")}>StudentPlanner</button>
    </aside>

    <main className='main-content'>{renderPage()}</main>

   </div>
    </>
  );
}

export default App
