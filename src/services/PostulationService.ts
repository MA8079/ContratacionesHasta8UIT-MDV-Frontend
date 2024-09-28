export async function CreatePostulation(formData: any) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/server/postulaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Error en enviar la solicitud de postulacion");
    }

    const json = await res.json();
    return json;
  } catch (error: any) {}
}

export async function YaPostulo(idRequerimiento: number, idUsuario: number) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      `http://localhost:3000/server/postulaciones_usuario/${idRequerimiento}/${idUsuario}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        "Error en enviar la solicitud de saber si postulo usuario"
      );
    }

    const json = await res.json();
    let ya_postulo = false;
    if (json.status == "success") {
      if (json.data.postulaciones_usuario[0]) ya_postulo = true;
    }
    return ya_postulo;
  } catch (error: any) {}
}
export async function ObtenerPostulacionesDeRequerimiento(
  idRequerimiento: number
) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:3000/server/postulaciones_requerimiento/${idRequerimiento}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const json = await res.json();
  return json;
}

export async function DeletePostulacionesDeRequerimiento(
  idRequerimiento: number
) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:3000/server/postulaciones_requerimiento/${idRequerimiento}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const json = await res.json();
  return json;
}
