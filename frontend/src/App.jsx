import { useEffect } from "react";
import "./App.css";
import AddResourceForm from './components/AddResourceForm';

function App() {
  const BACKEND = import.meta.env.VITE_BACKEND;
  useEffect(() => {
    async function wakeBackend() {
      await fetch(BACKEND);
    }
    wakeBackend();
  }, []);

  return (
    <>
      <main>
      <section>
        <AddResourceForm/>
      </section>
      </main>
    </>
  );
}

export default App;
