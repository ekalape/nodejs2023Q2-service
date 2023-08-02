export function excludeField<T, Key extends keyof T>(
  user: T,
  keys: Key[],
): Omit<T, Key> {
  const filteredEntries = Object.entries(user).filter(
    ([key]) => !keys.includes(key as Key),
  );
  return Object.fromEntries(filteredEntries) as Omit<T, Key>;
}
