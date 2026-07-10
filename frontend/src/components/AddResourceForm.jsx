import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Alert, Button, Stack } from "@mui/material";
import { useResources } from "../context/ResourceContext";
import Resources from "./Resources";
function AddResourceForm() {
  const { createResource, isError, message } = useResources();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    const newResource = { title, description, category };
    createResource(e, newResource);
    setTitle("");
    setDescription("");
    setCategory("");
  }

  return (
    <>
      <Stack spacing={2}>
        {message && <Alert severity={isError ? "error" : "success"}>{message}</Alert>}
        <Stack
          component="form"
          onSubmit={handleSubmit}
          spacing={2}
        >
          <TextField
            label="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            value={description}
            multiline
            minRows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button
            disabled={false}
            // sx={{ alignSelf: "start" }}
            type="submit"
            variant="contained"
          >
            Create
          </Button>
        </Stack>
      </Stack>
      <Resources />
    </>
  );
}

export default AddResourceForm;
