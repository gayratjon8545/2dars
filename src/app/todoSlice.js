import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialStateFromLocal = () => {
  return (
    JSON.parse(localStorage.getItem("todos")) || {
      todos: [],
      completedCount: 0,
      unCompletedCount: 0,
    }
  );
};
const todosSlice = createSlice({
  name: "todos",
  initialState: initialStateFromLocal(),
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos = [...state.todos, payload];
      todosSlice.caseReducers.calculateTotal(state);
    },
    removedTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
      todosSlice.caseReducers.calculateTotal(state);
      toast.success("Deleted !");
    },
    changeStatusTodo: (state, { payload }) => {
      const item = state.todos.find((todo) => todo.id == payload);
      item.completed = !item.completed;
      todosSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      localStorage.setItem("todos", JSON.stringify(state));

      let done = 0;
      let notDone = 0;

      state.todos.forEach((todo) => {
        if (todo.completed) {
          done += 1;
        } else {
          notDone += 1;
        }
      });

      state.completedCount = done;
      state.unCompletedCount = notDone;
    },
  },
});

export const { addTodo, removedTodo, changeStatusTodo } = todosSlice.actions;
//actions
export default todosSlice.reducer;
