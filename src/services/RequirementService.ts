export async function CreateRequirement(formData: any) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/server/requerimientos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Error en enviar la solicitud de postear");
    }

    const json = await res.json();
    return json;
  } catch (error: any) {}
}

export async function GetRequirements() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/server/requerimientos", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
}

export async function UpdateRequirement(idReqeriment: number, formData: any) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      `http://localhost:3000/server/requerimientos/${idReqeriment}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok) {
      throw new Error("Error en enviar la solicitud de actualizar");
    }

    const json = await res.json();
    return json;
  } catch (error: any) {}
}
