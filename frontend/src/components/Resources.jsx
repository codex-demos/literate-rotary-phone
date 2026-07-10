import { Card, CardContent, Chip, Typography, Stack, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useResources } from "../context/ResourceContext";

function Resources() {
  const { isLoading, resources, isError, message } = useResources();

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
