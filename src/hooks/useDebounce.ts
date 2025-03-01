import { useEffect, useRef } from "react";

export function useDebouncedCallback<T extends unknown[]>(
  callback: (...args: T) => void,
  wait: number
) {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  useEffect(() => cleanup, []);

  return (...args: T) => {
    cleanup();

    timeout.current = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}
