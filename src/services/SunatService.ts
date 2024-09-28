export async function GetDataByRuc(ruc: string) {
  try {
    const res = await fetch(`http://localhost:3000/server/sunat/${ruc}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error en enviar la solicitud de postear");
    }

    const json = await res.json();

    return json;
  } catch (error: any) {
    console.log(error);
  }
}
