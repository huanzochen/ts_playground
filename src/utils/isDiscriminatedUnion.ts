type DiscriminatorKeys<T> = {
  [K in keyof T]: T[K] extends string | number | boolean
    ? T[K] extends `${T[K]}` // is litaral type?
      ? K
      : never
    : never;
}[keyof T];

type IsDiscriminatedUnion<T> = T extends infer U
  ? U extends object
    ? DiscriminatorKeys<U> extends never
      ? false
      : false
    : false
  : false;

export type { IsDiscriminatedUnion };
