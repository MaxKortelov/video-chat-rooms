import { useCallback, useEffect, useRef, useState } from "react";

export function useStateWithCallback<T>(initialState: T): {
  state: T;
  updateState: (newState: T | ((state: T) => T), cb?: () => void) => void;
} {
  const [state, setState] = useState<T>(initialState);
  const cbRef = useRef<(state: T) => void>(null);

  const updateState = useCallback((newState: T | ((state: T) => T), cb?: (state: T) => void) => {
    if(cb) {
      cbRef.current = cb;
    }

    setState((state) => (typeof newState === "function" ? (newState as (state: T) => T)(state) : newState));
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]); //eslint-disable-line

  return { state, updateState };
}
