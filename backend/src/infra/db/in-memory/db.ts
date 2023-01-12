export type TaskInMemoryDB = {
  id: string;
  name: string;
  responsible: string;
  deadLine: Date;
  done: boolean;
};

export type ProjectInMemoryDB = {
  name: string;
  tasks: TaskInMemoryDB[];
};

type InMemoryDB = ProjectInMemoryDB[];

export const db: InMemoryDB = [];
