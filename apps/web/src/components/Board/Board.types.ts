export type TSubTask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type TTask = {
  id: string;
  title: string;
  description: string;
  subTasks: TSubTask[];
};

export type TColumn = {
  id: string;
  title: string;
  tasks: TTask[];
};

export type TBoard = {
  id: string;
  title: string;
  columns: TColumn[];
}