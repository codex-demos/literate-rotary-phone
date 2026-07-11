import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export function UserProvider({ children }) {
  const BACKEND = import.meta.env.VITE_BACKEND;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  async function login(email, password) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const res = await fetch(BACKEND + "/api/login", options);
      const { token, user } = await res.json();

      setToken(token);
      setUser(user);
    } catch (error) {
      // TODO render error message if auth fails
      console.error(error);
    }
  }

  return <UserContext.Provider value={{ user, login }}>{children}</UserContext.Provider>;
}

export function useUser(UserContext) {
  return useContext(UserContext);
}
