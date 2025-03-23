import { getMyFavoriteNumber } from "./union.ts";
import { directions, move } from "./const_assertions.ts";

// union
getMyFavoriteNumber(2);
getMyFavoriteNumber("2");

// const assertions
move(directions[0]);
