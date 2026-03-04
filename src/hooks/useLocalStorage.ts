import { useState, useCallback } from "react";

type SetValue<T> = (val: T | ((prev: T) => T)) => void;


export function useLocalStorage<T>(
  key: string,
  initial: T
): [T, SetValue<T>] {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  const set: SetValue<T> = useCallback(
    (val) => {

      setState((prev) => {
        const next = val instanceof Function ? val(prev) : val;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
        }
        return next;
      });
    },
    [key]
  );

  return [state, set];
}