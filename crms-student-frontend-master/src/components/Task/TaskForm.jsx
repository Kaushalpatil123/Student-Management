import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../layout/Header";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../redux/slices/pageTitleSlice";

const TaskForm = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setPageTitle("Add Tasks"));
    }, [dispatch]);
  const [tasks, setTasks] = useState([]);

  // Fetch on load
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch(console.error);
  }, []);

  // Auto-save timer holders
  const timers = {};

const handleChange = (index, name, value) => {
  const updatedTasks = [...tasks];
  updatedTasks[index][name] = value;
  setTasks(updatedTasks);

  if (timers[index]) clearTimeout(timers[index]);

  timers[index] = setTimeout(() => {
    saveTask(updatedTasks[index], index); // 👈 pass index
  }, 2000);
};


const saveTask = async (task, index) => {
  try {
    if (!task.task) return; // 🛑 Don't save if task is empty

    if (task._id) {
      // Update existing
      const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, task);
      const updated = [...tasks];
      updated[index] = res.data;
      setTasks(updated);
    } else {
      // Create only if task is entered
      const res = await axios.post("http://localhost:5000/api/tasks", { tasks: [task] });
      const newId = res.data.data[0]._id;
      const updated = [...tasks];
      updated[index]._id = newId;
      setTasks(updated);
    }
  } catch (err) {
    console.error("Save error:", err.message);
  }
};


  const addRow = () => {
    setTasks([...tasks, { task: "", hours: "", notes: "" }]);
  };

  const removeRow = (index) => {
    const taskToRemove = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    if (taskToRemove._id) {
      axios.delete(`http://localhost:5000/api/tasks/${taskToRemove._id}`).catch(console.error);
    }
  };

  return (
    <div>
      <Header />
    <div className="p-4">
      
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center gap-2 my-2">
          <input
            name="task"
            value={task.task}
            onChange={(e) => handleChange(index, "task", e.target.value)}
            placeholder="Task"
            className="border p-2"
          />
          <input
            name="hours"
            value={task.hours}
            onChange={(e) => handleChange(index, "hours", e.target.value)}
            placeholder="Hours"
            className="border p-2"
          />
          <input
            name="notes"
            value={task.notes}
            onChange={(e) => handleChange(index, "notes", e.target.value)}
            placeholder="Notes"
            className="border p-2"
          />
          <button onClick={() => removeRow(index)} className="bg-red-500 text-white px-2 rounded">
            Remove
          </button>
        </div>
      ))}
      <button onClick={addRow} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Add Row
      </button>
    </div>
    </div>
  );
};

export default TaskForm;
