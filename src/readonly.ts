type User = {
  id: number;
  name: string;
};

const user: Readonly<User> = {
  id: 10,
  name: "tommy",
};
// Cannot assign to 'name' because it is a read-only property.ts(2540)
user.name = "alen";

const numbers: ReadonlyArray<number> = [12, 33, 44, 55];
// Property 'push' does not exist on type 'readonly number[]'.ts(2339)
numbers.push(66);
