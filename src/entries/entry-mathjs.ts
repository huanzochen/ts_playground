import { lusolve } from "mathjs";

// 實際呼叫 lusolve 做一次簡單運算，驗證能正常使用
const A = [
  [2, 1],
  [1, 3],
];
const b = [5, 10];
const result = lusolve(A, b);
console.log("mathjs lusolve result:", result);
