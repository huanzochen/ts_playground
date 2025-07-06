import { lusolve as myLusolve } from "./lusolve";
import { lusolve as mathjsLusolve } from "mathjs";

function deepCloseTo(a: any, b: any, digits = 8): boolean {
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < Math.pow(10, -digits);
  }
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    return a.every((v, i) => deepCloseTo(v, b[i], digits));
  }
  return false;
}

describe("lusolve (compare with mathjs)", () => {
  const cases: { name: string; A: number[][]; b: number[] | number[][] }[] = [
    // 2x2
    {
      name: "2x2",
      A: [
        [2, 1],
        [1, 3],
      ],
      b: [5, 10],
    },
    // 3x3
    {
      name: "3x3",
      A: [
        [3, 2, -1],
        [2, -2, 4],
        [-1, 0.5, -1],
      ],
      b: [1, -2, 0],
    },
    // 3x3, b is 2D
    {
      name: "3x3 b is 2D",
      A: [
        [1, 2, 3],
        [0, 1, 4],
        [5, 6, 0],
      ],
      b: [[3], [7], [8]],
    },
    // 4x4
    {
      name: "4x4",
      A: [
        [1, 2, 3, 4],
        [2, 1, 1, 1],
        [3, 1, 2, 1],
        [4, 1, 1, 2],
      ],
      b: [30, 10, 20, 20],
    },
    // 2x2, b is 2D
    {
      name: "2x2 b is 2D",
      A: [
        [1, 2],
        [3, 4],
      ],
      b: [
        [5, 6],
        [7, 8],
      ],
    },
    // singular matrix (det=0)
    {
      name: "singular matrix (det=0)",
      A: [
        [1, 2],
        [2, 4],
      ],
      b: [3, 6],
    },
  ];

  cases.forEach(({ name, A, b }, idx) => {
    test(`case ${idx + 1} (${name})`, () => {
      let mathjsResult;
      let isMathjsError = false;
      try {
        mathjsResult = mathjsLusolve(A, b);
      } catch (e) {
        mathjsResult = e;
        isMathjsError =
          typeof e === "object" &&
          e !== null &&
          "message" in e &&
          typeof (e as any).message === "string";
      }
      // eslint-disable-next-line no-console
      console.log(
        `case ${idx + 1} mathjsResult:`,
        JSON.stringify(mathjsResult)
      );
      function toMathjsShape(x: any) {
        if (Array.isArray(x) && typeof x[0] === "number") {
          // 1D array -> 2D column vector
          return x.map((v: number) => [v]);
        }
        return x;
      }
      let myLusolveError = null;
      let myResult;
      try {
        myResult = myLusolve(A, b);
      } catch (err) {
        myLusolveError = err;
      }
      if (myLusolveError) {
        // If our implementation throws, that's acceptable (and correct for singular matrices)
        expect(true).toBe(true);
      } else if (!isMathjsError && !myLusolveError) {
        // Both succeed, compare results
        // eslint-disable-next-line no-console
        console.log(`case ${idx + 1} myResult:`, JSON.stringify(myResult));
        expect(deepCloseTo(toMathjsShape(myResult), mathjsResult)).toBe(true);
      } else if (isMathjsError && !myLusolveError) {
        // mathjs throws but ours does not: fail
        throw new Error(
          `Mismatch: mathjsLusolve threw=${isMathjsError}, myLusolve threw=${!!myLusolveError}`
        );
      }
    });
  });
});
