export type College = {
  id: number;
  name: string;
  teachers: number;
  students: number;
};

export type Teacher = {
  id: number;
  name: string;
  subject: string;
  progress: number;
};

export type Student = {
  id: number;
  name: string;
  course: string;
  progress: number;
};