import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Alert, Button, Stack } from "@mui/material";
function AddResourceForm() {
  const BACKEND = import.meta.env.VITE_BACKEND;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  async function createResource(event) {
    try {
      setMessage("");
      setIsError(false);
      event.preventDefault();
      const body = JSON.stringify({ title, description, category });
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
      console.log(data);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      console.error(error);
    }
  }

  return (
    <Stack spacing={2}>
      {message && <Alert severity={isError ? "error" : "success"}>{message}</Alert>}
      <Stack
        component="form"
        onSubmit={createResource}
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
  );
}

export default AddResourceForm;
