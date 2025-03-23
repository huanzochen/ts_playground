type MyFavoriteNumber = string | number;

const getMyFavoriteNumber = (myFavoriteNumber: MyFavoriteNumber) => {
  console.log(`
typeof(myFavoriteNumber): ${typeof myFavoriteNumber}
The value is ${myFavoriteNumber}
`);
};

export { getMyFavoriteNumber };
