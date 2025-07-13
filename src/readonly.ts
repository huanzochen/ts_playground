type User = {
  id: number;
  name: string;
};

const user: Readonly<User> = {
  id: 10,
  name: "tommy",
};
// user.name = "alen"; // ❌ Error: Cannot assign to 'name' because it is a read-only property

const numbers: ReadonlyArray<number> = [12, 33, 44, 55];
// numbers.push(66); // ❌ Error: Property 'push' does not exist on type 'readonly number[]'
