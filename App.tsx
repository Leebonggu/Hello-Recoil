import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { inputState, Todo, todoSelector, todoState } from './atom/todos';
import './style.css';

const useInputHanlder = () => {
  const [input, setInput] = useRecoilState(inputState);

  const onReset = () => {
    setInput({
      subject: '',
      contents: '',
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return {
    input,
    onChange,
    onReset,
  };
};

const useTodoListHandler = () => {
  const [todoList, setTodoList] = useRecoilState(todoState);

  const addTodo = (newtodo: Todo) => {
    setTodoList((prev) => [...prev, newtodo]);
  };

  const deleteTodo = (id: number) => {
    setTodoList((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodoList((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  const allComplete = () => {
    setTodoList((prev) => prev.map((todo) => ({ ...todo, completed: true })));
  };

  return {
    todoList,
    addTodo,
    deleteTodo,
    toggleComplete,
    allComplete,
  };
};

export default function App() {
  const { input, onChange, onReset } = useInputHanlder();
  const { todoList, addTodo, deleteTodo, toggleComplete, allComplete } =
    useTodoListHandler();
  const { isAllComplete, count } = useRecoilValue(todoSelector);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      ...input,
      id: todoList.length + 1,
      completed: false,
    };

    addTodo(form);
    onReset();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Hello Recoil World</h1>
        <input name="subject" value={input.subject} onChange={onChange} />
        <input name="contents" value={input.contents} onChange={onChange} />
        <button>제출</button>
        <hr />
      </form>
      {!isAllComplete ? <button onClick={allComplete}>올클리어</button> : null}
      {todoList.map((todo) => (
        <div
          style={{
            padding: '16px',
            backgroundColor: todo.completed ? 'pink' : 'white',
          }}
        >
          <span>{todo.subject}</span>
          <span>/</span>
          <span>{todo.contents}</span>
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? '취소' : '완료'}
          </button>
          <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
}
