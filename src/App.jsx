import { useRef } from "react";
import "./App.css";

// rht
import toast from "react-hot-toast";

//redux
import { useDispatch, useSelector } from "react-redux";

import { addTodo, removedTodo, changeStatusTodo } from "./app/todoSlice";

function App() {
  const dispatch = useDispatch();
  const inputText = useRef();

  const { todos, unCompletedCount, completedCount } = useSelector(
    (state) => state.todos
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputText.current.value.trim();
    if (value) {
      dispatch(
        addTodo({
          id: Math.random(),
          text: value,
          completed: false,
        })
      );
      toast.success("Added successfuly !");
    } else {
      toast.error("Please, write something !");
    }

    inputText.current.value = "";
  };

  return (
    <div className="wrapper">
      <video
        className="bg-video"
        src="video-main-bg.mp4"
        autoPlay
        muted
        loop
      ></video>
      <div className="data-wrapper">
        <h1>Todo List - {todos.length}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <span>Text:</span>
            <input className="input-text" ref={inputText} type="text" />
          </div>
          <button>Add</button>
        </form>
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className={`todo  ${todo.completed ? "completed" : ""}`}
            >
              <h4>{todo.text}</h4>
              <div>
                <input
                  type="checkbox"
                  onClick={() => dispatch(changeStatusTodo(todo.id))}
                  readOnly
                  checked={todo.completed}
                />
                <button onClick={() => dispatch(removedTodo(todo.id))}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="completed-count">
          <h4>Completed: {completedCount}</h4>
          <h4>Uncompleted: {unCompletedCount}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
