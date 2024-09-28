import { useEffect, useState } from "react";
import { NotifyComponent } from "../components/NotifyComponent";
import { RequerimientoType } from "../types/RequerimientoType";
import { UsuarioType } from "../types/UsuarioType";
import { GetUserById } from "../services/UserService";
import { GetRequirements } from "../services/RequirementService";
import { NoSimOutlined } from "@mui/icons-material";

export function NotifyView() {
  const [requerimientos, setRequerimientos] = useState<RequerimientoType[]>([]);
  const [usuario, setUsuario] = useState<UsuarioType>();

  useEffect(() => {
    //setReqFilter("Todos");
    (async () => {
      const idUsuario = Number(localStorage.getItem("id_usuario"));
      setUsuario(await GetUserById(idUsuario));

      const json = await GetRequirements();

      if (json.status == "success") {
        let reqs = json.data.requerimientos.filter(
          (r: RequerimientoType) =>
            r.id_usuario_ganador == idUsuario || r.estado == "Vigente"
        );
        setRequerimientos(reqs);
      }
    })();
  }, []);
  return (
    <>
      <div className="h-100 flex-grow-1 align-self-start mx-3 p-4 bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <h4>Notificaciones</h4>
        </div>
        {requerimientos.map((req: RequerimientoType, i: number) => (
          <NotifyComponent
            key={i}
            title={req.nombre}
            description={req.detalle}
            date={req.fecha_publicacion.split("T")[0]}
            type={`${req.estado == "Vigente" ? "Req_created" : "Win"}`}
          ></NotifyComponent>
        ))}

        {requerimientos.length == 0 && (
          <div className="d-flex align-items-center justify-content-center flex-column mt-5">
            <NoSimOutlined></NoSimOutlined>
            <p className="text-center text-secondary mt-4 fst-italic">
              Su bandeja de notificaciones esta vacia
            </p>
          </div>
        )}
      </div>
    </>
  );
}
