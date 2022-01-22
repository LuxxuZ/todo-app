import { createContext, useState, useEffect, useReducer } from "react";
import { createClient } from "@supabase/supabase-js";

export const SupabaseContext = createContext({});
export const TodoContext = createContext([]);
export const AuthContext = createContext();
export const TaskLoadContext = createContext(false);

export function SupabaseProvider({ children }) {
  const [supabaseClient, setSupabaseClient] = useState();

  useEffect(() => {
    const supabase = createClient(
      process.env.REACT_APP_SUPABASE_URL,
      process.env.REACT_APP_SUPABASE_KEY
    );

    setSupabaseClient(supabase);
  }, []);

  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  return (
    <TodoContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TodoContext.Provider>
  );
}

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}
