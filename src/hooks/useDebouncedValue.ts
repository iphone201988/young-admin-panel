import { useEffect, useState } from "react";

/**
 * Returns a value that updates only after `delay` ms have passed without the input changing.
 * Used to trigger API calls after user stops typing.
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
