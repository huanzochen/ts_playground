import { getMyFavoriteNumber } from "./union.ts";
import { directions, move } from "./const_assertions.ts";
import { getArea } from "./discriminated_union.ts";

import { student } from "./interface_extends.ts";
console.log("🚀 ~ student:", student);

// union
getMyFavoriteNumber(2);
getMyFavoriteNumber("2");

// const assertions
move(directions[0]);

// discriminated unions
console.log(
  getArea({
    kind: "square",
    sideLength: 2,
  })
);
