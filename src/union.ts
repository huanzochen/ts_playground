type MyFavoriteNumber = string | number;

/**
 * unions example
 *
 * @param {MyFavoriteNumber} myFavoriteNumber
 */
const getMyFavoriteNumber = (myFavoriteNumber: MyFavoriteNumber) => {
  console.log(`
typeof(myFavoriteNumber): ${typeof myFavoriteNumber}
The value is ${myFavoriteNumber}
`);
};

export { getMyFavoriteNumber };
