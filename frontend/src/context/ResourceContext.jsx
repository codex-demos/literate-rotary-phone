import { createContext, useContext, useEffect, useState } from "react";

const ResourceContext = createContext(null);

export function ResourceProvider({ children }) {
  const BACKEND = import.meta.env.VITE_BACKEND;
  const [resources, setResources] = useState([]);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(true);

  async function loadResources() {
    try {
      setIsError(false);
      const res = await fetch(import.meta.env.VITE_BACKEND + "/api/resources");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Response was not okay");
      }

      setResources(data.resources);
    } catch (error) {
      setIsError(true);
      setMessage("Something went wrong getting resources. Please reload the page.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function createResource(event, resource) {
    try {
      setMessage("");
      setIsError(false);
      event.preventDefault();
      const body = JSON.stringify(resource);
      const options = {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(BACKEND + "/api/resources", options);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      setMessage("Created new resource.");
      setResources((prev) => [...prev, data]);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    loadResources();
  }, []);

  return <ResourceContext.Provider value={{ resources, isError, message, isLoading, createResource }}>{children}</ResourceContext.Provider>;
}

export function useResources() {
  return useContext(ResourceContext);
}
