import { useState, useEffect} from "react";

function Planner(){
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work");


  // load tasks from localStorage

  useEffect(()=> {
    const savedTasks =
     JSON.parse(localStorage.getItem("tasks"));
    if(savedTasks)
      setTasks(savedTasks);
    
  },[]);

  // save tasks to localStorage
  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }, [tasks]);


  const addTask = () => {
    if (!text)return;

    const newTask = {
      text,
      category,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i)=>i !==index);
    
    setTasks(updated);
  };
  
  return(
    <div>
      <h1>📚Planner</h1>

      {/* form */}
      <div className="form">
        <input 
        placeholder="Enter a task..."
        value={text}
        onChange={(e)=> setText(e.target.value)}
         />

         <select 
         value={category}
         onChange={(e)=> setCategory(e.target.value)}
         >
          <option>Work</option>
          <option>School</option>
          <option>Personal</option>
         </select>

         <button onClick={addTask}>Add Task</button>
      </div>

      {/* task list */}
      <div style={{marginTop:"20px"}}>
        {tasks.map((task, index)=> (
          <div key={index} className="card">

            <div>
              <span
              onClick={()=>toggleTask(index)}
              style={{
                textDecoration: task.completed ? "line-through":"none",
                cursor: "pointer",
              }}
              >

                {task.text}
              </span>

              <br />
              <small style={{color:"blue"}}>
                ({task.category})
              </small>
            </div>

            <div>
              {task.completed && (
                <span style={{color:"green", marginRight:"10px"}}>
                  ✔️
                </span>
              )}

              <button onClick={()=>deleteTask(index)}>❌</button>
            </div>
          </div>
        ))}
        
      </div>
      
          
            </div>
  );
}

export default Planner;