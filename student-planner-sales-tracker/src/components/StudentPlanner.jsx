import { useState, useEffect} from "react";

function StudentPlanner(){
  const [tasks, setTasks] = useState([]);
  // load tasks from localStorage

  useEffect(()=> {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(savedTasks){
      setTasks(savedTasks);
    }
  },[]);

  // save tasks to localStorage
  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }, [tasks]);

  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "")return;

    const newTask = {
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (index) =>{
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return(
    <div>
      <h1>Student Planner</h1>

      <input
       type="text"
       placeholder="Enter a task..."
       value={input}
       onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>

        <ul>
          {tasks.map((task, index)=> (
            <li key={index}>
              <span
              onClick={()=> toggleTask(index)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              >
                {task.text}
              </span>

              <button onClick={() => deleteTask(index)}>❌</button>
            </li>
          ))}
        </ul>
    </div>
  );
 
}
export default StudentPlanner;