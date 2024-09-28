export async function GetAnexosPostulacion(idPostulacion: number) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      `http://localhost:3000/server/anexos_postulacion/${idPostulacion}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Error en enviar la solicitud de postear");
    }

    const json = await res.json();
    console.log(json);

    return json;
  } catch (error: any) {}
}

export function GetUrlAnexoPostulacion(anexoNombre: string) {
  return `http://localhost:3000/preview_anexos/${anexoNombre}`;
}

export async function UploadAnexosPostulacion(
  selectedFiles: any,
  idpostulacion: number
) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("id_postulacion", idpostulacion.toString());

  Array.from(selectedFiles).forEach((file: any) => {
    formData.append("files", file);
  });

  try {
    const res = await fetch("http://localhost:3000/server/anexos_postulacion", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("There was an error uploading the file!", error);
  }
}
