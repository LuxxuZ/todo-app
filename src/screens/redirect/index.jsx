import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthContext,
  SupabaseContext,
  TodoContext,
} from "../../utilities/context-wrapper";
import { MainContainer } from "./styles";

export default function Redirect() {
  const { tasks, setTasks } = useContext(TodoContext);
  const { authToken, setAuthToken } = useContext(AuthContext);
  const client = useContext(SupabaseContext);

  const navigate = useNavigate();

  async function loadTasks() {
    if (authToken) {
      const { currentSession } = JSON.parse(authToken || "{}");
      const { user } = currentSession;

      await client
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .then(({ data = [] }) => {
          setTasks(data);
        })
        .then(authToken && navigate("../tasks"));
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setAuthToken(localStorage.getItem("supabase.auth.token"));
    }, 7000);
  }, []);

  useEffect(() => {
    loadTasks();
  }, [authToken]);
  return (
    <MainContainer>
      <p>Redirecting...</p>
    </MainContainer>
  );
}
