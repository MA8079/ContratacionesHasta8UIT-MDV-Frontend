 export async function GetAnexosRequerimiento(idRequirement: number) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      `http://localhost:3000/server/anexos_requerimiento/${idRequirement}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Encabezado de autorización
        },
      }
    );

    if (!res.ok) {
      throw new Error("Error en enviar la solicitud de postear");
    }

    const json = await res.json();

    return json;
  } catch (error: any) {}
}

export function GetUrlAnexoRequerimiento(anexoNombre: string) {
  return `http://localhost:3000/preview_anexos/${anexoNombre}`;
}

export async function UploadAnexosRequerimiento(
  selectedFiles: any,
  idRequerimiento: number
) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("id_requerimiento", idRequerimiento.toString());

  Array.from(selectedFiles).forEach((file: any) => {
    formData.append("files", file);
  });

  try {
    const res = await fetch(
      "http://localhost:3000/server/anexos_requerimiento",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Encabezado de autorización
        },
        body: formData,
      }
    );
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("There was an error uploading the file!", error);
  }
}

export async function UpdateAnexosRequerimiento(
  selectedFiles: any,
  idRequerimiento: number
) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("id_requerimiento", idRequerimiento.toString());

  Array.from(selectedFiles).forEach((file: any) => {
    formData.append("files", file);
  });

  try {
    const res = await fetch(
      "http://localhost:3000/server/anexos_requerimiento",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Encabezado de autorización
        },
        body: formData,
      }
    );
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("There was an error uploading the file!", error);
  }
}
