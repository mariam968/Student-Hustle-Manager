import { useState, useEffect } from "react";

function Planner() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work");

  // load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // add-task
  const addTask = () => {
    if (!text) return;

    const newTask = {
      text,
      category,
      completed: false,
      date: new Date().toLocaleDateString(),
    };

    setTasks([...tasks, newTask]);
    setText("");
  };

  // toggle complete
  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  // delete task
  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  // summary
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div>
      <h1>📚 Student Planner</h1>

      {/* form */}
      <div className="form">
        <input
          placeholder="Enter a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Work</option>
          <option>School</option>
          <option>Personal</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      {/* summary */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="dashboard-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>
      </div>

      {/* task list*/}
      <div style={{ marginTop: "20px" }}>
        {tasks.map((task, index) => (
          <div key={index} className="card">
            <div>
              <span
                onClick={() => toggleTask(index)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {task.text}
              </span>

              <br />
              <small style={{ color: "blue" }}>
                ({task.category}) - {task.date}
              </small>
            </div>

            <div>
              {task.completed && (
                <span className="green" style={{ marginRight: "10px" }}>
                  ✔
                </span>
              )}

              <button onClick={() => deleteTask(index)}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planner;