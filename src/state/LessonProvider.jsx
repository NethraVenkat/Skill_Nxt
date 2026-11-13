import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";
import { lessonReducer } from "./lessonReducer";
import { loadState, saveState } from "./persistence";
const LessonContext = createContext(null);
export function LessonProvider({ children }) {
  const [state, dispatch] = useReducer(lessonReducer, undefined, loadState);
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    setSaved(saveState(state));
  }, [state]);
  const running = Object.values(state.timers).some((t) => t.running);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(
      () => dispatch({ type: "TICK", now: Date.now() }),
      100,
    );
    return () => clearInterval(id);
  }, [running]);
  const set = useCallback(
    (key, value) => dispatch({ type: "SET", key, value }),
    [],
  );
  const flag = useCallback(
    (id, label) => dispatch({ type: "FLAG", flag: { id, label } }),
    [],
  );
  return (
    <LessonContext.Provider value={{ state, dispatch, set, flag, saved }}>
      {children}
    </LessonContext.Provider>
  );
}
export const useLesson = () => useContext(LessonContext);
