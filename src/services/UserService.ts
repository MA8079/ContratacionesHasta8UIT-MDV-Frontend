export async function GetUserById(id: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/server/usuarios/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  if (json.status == "success") {
    return json.data.usuarios[0];
  }

  return null;
}

export async function Login(formData: any) {
  const res = await fetch("http://localhost:3000/server/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    throw new Error("Error en enviar la solicitud de login");
  }
  const json = await res.json();
  return json;
}

export async function Signin(formData: any) {
  try {
    const res = await fetch("http://localhost:3000/server/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Error en enviar la solicitud de registro");
    }

    const json = await res.json();

    return json;
  } catch (error: any) {}
}
