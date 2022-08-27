function createVar<T>(value: T): [() => T, (newValue: T) => T] {
  let variable = value;

  const getValue = () => variable;
  const setValue = (newValue: T) => (variable = newValue);

  return [getValue, setValue];
}

export default createVar;
