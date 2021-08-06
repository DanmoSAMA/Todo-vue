interface Todo {
  id: string;
  title: string;
  done: boolean;
}

enum Mode {
  All,
  Active,
  Completed,
}

export { Todo, Mode }