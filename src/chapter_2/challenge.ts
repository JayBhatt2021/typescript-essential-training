enum TodoStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  completedOn?: Date;
}

const firstTodo: Todo = {
  id: 1,
  title: "Learn HTML",
  status: TodoStatus.DONE,
  completedOn: new Date("2021-09-11"),
};
const secondTodo: Todo = {
  id: 2,
  title: "Learn TypeScript",
  status: TodoStatus.IN_PROGRESS,
};
const thirdTodo: Todo = {
  id: 3,
  title: "Write the best app in the world",
  status: TodoStatus.TODO,
};

const todoItems: Todo[] = [firstTodo, secondTodo, thirdTodo];

function addTodoItem(todoTitle: string): Todo {
  const id = getNextId(todoItems);

  const newTodo: Todo = {
    id,
    title: todoTitle,
    status: TodoStatus.TODO,
  };

  todoItems.push(newTodo);

  return newTodo;
}

function getNextId<T extends { id: number }>(items: T[]): number {
  return items.reduce((max, x) => (x.id > max ? x.id : max), 0) + 1;
}

const newTodo: Todo = addTodoItem(
  "Buy lots of stuff with all the money we make from the app"
);

console.log(JSON.stringify(newTodo));
