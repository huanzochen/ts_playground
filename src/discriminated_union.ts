import type { IsDiscriminatedUnion } from "./utils/isDiscriminatedUnion.ts";

type Circle = {
  kind: "circle";
  radius: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

// union type
type Shape = Circle | Rectangle | Square;

// not union type
type Shape2 =
  | { kind: "square"; sideLength: number }
  | { kind: string; radius: number }
  | { kind: "rectangle"; width: number; height: number };

const getArea = (shape: Shape): number => {
  switch (shape.kind) {
    case "circle":
      return 2 ** Math.PI * shape.radius;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.sideLength * shape.sideLength;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
};

type ExpectTrue<T extends true> = T;
type ExpectFalse<T extends false> = T;

type Test1 = IsDiscriminatedUnion<Shape>;
type Test2 = IsDiscriminatedUnion<Shape2>;

type Check1 = ExpectTrue<IsDiscriminatedUnion<Shape>>;
type Check2 = ExpectFalse<IsDiscriminatedUnion<Shape2>>;

export { getArea };
