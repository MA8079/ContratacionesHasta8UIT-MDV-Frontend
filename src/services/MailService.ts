export async function SendMail(to: string) {
  try {
    const res = await fetch("http://localhost:3000/server/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to }),
    });

    if (!res.ok) {
      throw new Error(
        "Error en enviar la solicitud de recuperacion de contraseña"
      );
    }

    const json = await res.json();

    return json;
  } catch (error: any) {
    console.log(error);
  }
}

export async function ValidateCode(
  correo: string,
  codigo_recuperacion: string
) {
  try {
    const res = await fetch("http://localhost:3000/server/code_validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, codigo_recuperacion }),
    });

    const json = await res.json();
    console.log(10101001, json);

    return json;
  } catch (error: any) {
    console.log(error);
  }
}

export async function ChancePassword(correo: string, contrasena: string) {
  try {
    const res = await fetch("http://localhost:3000/server/chance_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contrasena }),
    });

    const json = await res.json();

    return json;
  } catch (error: any) {
    console.log(error);
  }
}
