/**
 * Intersection types are at the core of the TypeScript experience via the `&` operator.
 * Ref: https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
 *
 * However, it is not always fool-proof, especially if there are possible overlap between the types being combined.
 * Let's implement a Merge<T,U> utility type that allows combining 2 types while letting U overrides whatever is overlapped.
 *
 * ***BONUS POINT 🎗***: make it Merge<T, U, depth> that handles merging at n-level.
 */
export type Merge<T, U> = Omit<T, keyof U> & U;
