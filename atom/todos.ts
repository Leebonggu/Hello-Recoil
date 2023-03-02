import { atom, selector } from 'recoil';

export type Todo = {
  id: number;
  subject: string;
  contents: string;
  completed: boolean;
};

export const inputState = atom({
  key: 'todoInput',
  default: {
    subject: '',
    contents: '',
  },
});

export const todoState = atom<Todo[]>({
  key: 'todoList',
  default: [],
});

export const todoSelector = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const todoList = get(todoState);

    return {
      count: todoList.length,
      first: todoList[0],
      last: todoList[todoList.length - 1],
      subject: todoList.map((todo) => todo.subject),
      isAllComplete: todoList.every((todo) => Boolean(todo.completed)),
    };
  },
});
