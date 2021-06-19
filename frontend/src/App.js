import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import usePrevious from "./functions/usePrevious";
import TodoService from "./services/todo.service";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

//  usePrevious(value)
// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

export default function App(props) {
  const [tasks, setTasks] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [filter, setFilter] = useState("All");
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {

    function getTasks() {
      TodoService.getAll()
        .then((response) => {
          setTasks(response.data);
          setUpdateList(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTasks();
    
  }, [updateList]);

  


  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      name={task.name}
      id={task.id}
      completed={task.completed}
      key={task.id}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const listHeadingRef = useRef(null);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>Todo Matic</h1>
      <Form updateList={setUpdateList}/>
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
