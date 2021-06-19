import React, { useState } from "react";
import TodoService from "../services/todo.service";

export default function Form(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    var data = {
      name: name,
    };

    TodoService.create(data)
      .then((response) => {
        // console.log(response)
        setName("");
        props.updateList(true);

        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // props.addTask(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}
