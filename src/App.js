import { useEffect, useState } from "react";
import { BsFillAlarmFill, BsPlusLg, BsXLg } from "react-icons/bs";

function App() {
  const url = "http://localhost:8000/tasks/";
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTasks(data);
      });
  };

  // submitting task
  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { name: input, completed: false };
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => {
      setInput("");
      fetchTasks(url);
    });
  };

  // deleting task
  const handleDelete = (id) => {
    fetch(url + id, { method: "DELETE" }).then(() => {
      fetchTasks(url);
    });
  };

  // toggle completed task

  const toggleConplete = (task) => {
    const obj = { name: task.name, completed: !task.completed };
    fetch(url + task.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    }).then(() => {
      fetchTasks(url);
    });
  };

  useEffect(() => {
    fetchTasks(url);
  }, [url]);

  return (
    <div className="app">
      <div className="container">
        <h1>
          <BsFillAlarmFill /> Daily Task
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <BsPlusLg className="icon" />
            <input
              type="text"
              required
              placeholder="Enter a task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </form>

        <div>
          {tasks.map((task) => (
            <div
              key={task.id}
              onDoubleClick={() => toggleConplete(task)}
              className={`task-row ${task.completed ? "completed" : ""}`}
            >
              <p>{task.name}</p>
              <BsXLg onClick={() => handleDelete(task.id)} className="icon" />
            </div>
          ))}
        </div>

        <p className="length">
          {tasks < 1 ? "You have no tasks" : `Tasks: ${tasks.length}`}
        </p>
      </div>
    </div>
  );
}

export default App;
