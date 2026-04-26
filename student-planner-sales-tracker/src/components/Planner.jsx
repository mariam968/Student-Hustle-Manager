import { useState, useEffect} from "react";

function StudentPlanner(){
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("School");


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
    if (input.trim() === "")return;

    const newTask = {
      text: input,
      completed: false,
      category: category,
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
    
    setTasks(tasks.filter((_, i)=> i !== index));
  };
  
  return(
    <div style={{maxWidth: "500px",margin: "auto"}}>
      <h1>Student Planner</h1>

       {/* input section */}
      <div style={{display: "flex", gap: "10px", marginBottom: "20px"}}>
        <input 
        type="text"
        placeholder="Enter a task..."
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        style={{ flex: 1, padding: "10px"}}
         />

         <select 
         value={category}
         onChange={(e)=> setCategory(e.target.value)}
         style={{ padding: "10px"}}
         >
          <option >School</option>
          <option >Personal</option>
          <option >Work</option>
         </select>

         <button onClick={addTask}>Add</button>
      </div>

      {/* task list */}
      <ul style={{lifeStyle: "none", padding: 0}}>
        {tasks.map((task, index) => (
          <li
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            padding: "10px",
            background: "lightgray",

          }}
          >
            <div>
              <span
              onClick={()=> toggleTask(index)}
              style={{
                textDecoration: task.completed ? 
                "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
              >
                {task.text}
              </span>
              <small style={{color: "blue"}}>
                ({task.category})
              </small>
            
            </div>

            <div>
              {task.completed &&(
                <span style={{color: "green", marginRight: "10px"}}>
                  
                  ✔️
                </span>
              )}

              <button onClick={()=> deleteTask(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    
    </div>
  );
 
}
export default StudentPlanner;