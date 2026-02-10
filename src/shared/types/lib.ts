export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer I)[] ? DeepPartial<I>[] : DeepPartial<T[P]>;
};
