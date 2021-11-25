import { useState, useCallback } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      } catch (err) {
        console.log(err);
      }
    },
    [key]
  );

  const clearValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (err) {
      console.log(err);
    }
  };

  return { storedValue, setValue, clearValue };
}

export default useLocalStorage;
