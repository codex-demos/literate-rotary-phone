import { Card, CardContent, Chip, Typography, Stack, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

function Resources() {
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

  useEffect(() => {
    loadResources();
  }, []);

  if (isLoading) {
    return (
      <Stack sx={{ minHeight: "80vh", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress aria-label="Loading…" />
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "start", alignItems: "center" }}
            >
              <Typography variant="h5">{resource.title}</Typography>
              {resource.category && (
                <Chip
                  label={resource.category}
                  color="secondary"
                />
              )}
              <Typography variant="h5">{resource.description}</Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default Resources;
