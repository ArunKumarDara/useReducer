import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TiTick, TiTrash } from "react-icons/ti";

const TodoList = () => {
  const [task, setTask] = useState({
    title: "",
    by: "",
  });
  const [list, setList] = useState([]);

  const handleTaskInfo = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setTask({ ...task, [key]: value });
  };

  const addTask = () => {
    const updatedTask = { ...task, id: uuidv4(), isDone: false };
    setList([...list, updatedTask]);
  };

  const markDoneHandler = (id) => {
    const index = list.findIndex((item) => item.id === id);
    const doneTask = [...list];
    doneTask[index].isDone = true;
    setList(doneTask);
  };

  const deleteTaskHandler = (id) => {
    const filteredList = list.filter((item) => item.id !== id);
    setList(filteredList);
  };

  return (
    <>
      <div>
        <h1>ToDoLists</h1>
        <div>
          I want to complete{" "}
          <input
            type="text"
            name="title"
            value={task?.title}
            onChange={(e) => handleTaskInfo(e)}
          />
          <input
            type="date"
            name="by"
            value={task?.by}
            onChange={(e) => handleTaskInfo(e)}
          />
        </div>
        <button onClick={addTask}>Add a Task</button>
      </div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <span
              style={{ textDecoration: item?.isDone ? "line-through" : "none" }}
            >
              <strong>{item?.title}</strong> is due by {item?.by}
              <span>
                <TiTick size={24} onClick={() => markDoneHandler(item.id)} />
              </span>
              <span>
                <TiTrash size={24} onClick={() => deleteTaskHandler(item.id)} />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
