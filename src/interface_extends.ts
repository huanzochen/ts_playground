export interface NullyNameStudent {
  name: string | null;
  age: number;
}

export interface Student extends NullyNameStudent {
  name: string;
}

export const student: Student = {
  name: "Alice",
  age: 20,
};
