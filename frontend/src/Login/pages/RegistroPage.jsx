import Registro from "./Registro";

export default function RegistroPage() {
  const handleRegistro = async ({ name, email, phone, role, password }) => {
    // Mientras no tengamos el backend real simulamos el alta.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Registro simulado:", { name, email, phone, role, password });

    /* Cuando tengamos el back borramos lo de arriba y usamos esto
    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, role, password }),
    });

    if (!res.ok) {
      throw new Error("No pudimos crear tu cuenta. Probá de nuevo.");
    }
    --- */
  };

  return <Registro onSubmit={handleRegistro} />;
}
