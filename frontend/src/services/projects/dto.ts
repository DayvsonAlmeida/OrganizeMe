export type ApiTask = {
  id: string;
  name: string;
  responsible: string;
  deadLine: string;
  done: boolean;
};

export type ApiProject = {
  id: string;
  name: string;
  tasks: ApiTask[];
};
