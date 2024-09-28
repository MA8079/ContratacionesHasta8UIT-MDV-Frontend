
import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { RequerimientoType } from "../types/RequerimientoType";
import { MyContext } from "../context/Context";
import { GetRequirements } from "../services/RequirementService";
import { UsuarioType } from "../types/UsuarioType";
import { GetUserById } from "../services/UserService";
import { YaPostulo } from "../services/PostulationService";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Send as SendIcon,
  Edit as EditIcon,
  RocketLaunch as RocketIcon,
} from '@mui/icons-material';

export default function PostsComponent() {
  const [requerimientos, setRequerimientos] = useState<RequerimientoType[]>([]);
  const { reqFilter, setReqFilter } = useContext(MyContext);
  const [usuario, setUsuario] = useState<UsuarioType>();

  useEffect(() => {
    setReqFilter("Todos");
    (async () => {
      const idUsuario = Number(localStorage.getItem("id_usuario"));
      setUsuario(await GetUserById(idUsuario));

      const json = await GetRequirements();

      if (json.status == "success") {
        let reqs: RequerimientoType[] = [];

        if (reqFilter != "Todos") {
          const filterReq = json.data.requerimientos.filter(
            (req: RequerimientoType) => req.tipo == reqFilter
          );

          reqs = filterReq;
        } else {
          reqs = json.data.requerimientos;
        }
        for (const req of reqs) {
          const ya_postulo = await YaPostulo(req.id_requerimiento, idUsuario);
          req.ya_postulo = Boolean(ya_postulo);
        }
        setRequerimientos(reqs);

      }
    })();
  }, [reqFilter]
  );

  return (
    <Box sx={{ p: 5, width: '100%' }}>
      <Grid container spacing={3}>
        {requerimientos.map((req: RequerimientoType) => {
          let fecha=req.fecha_fin.split("T")[0];
          let fecha_seccionada=fecha.split('-');
          let fecha_invertida=fecha_seccionada.reverse().join('-');

          if (usuario?.id_rol == 2 && req.estado == "Terminado") return null;
          return (
            <Grid item xs={12} sm={12} md={6} key={req.id_requerimiento}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {req.nombre}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {req.tipo}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Monto: S/.{req.costo}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Finaliza el: {fecha_invertida}
                  </Typography>
                  {req?.estado == "Vigente"?(
                    <Box sx={{ mt: 2 }}>
                    <Chip label={req.estado} color="success" size="small" />
                  </Box>
                  ):(
                    <Box sx={{ mt: 2 }}>
                    <Chip label={req.estado} color="error" size="small" />
                  </Box>
                  )}                  
                </CardContent>
                <CardActions>
                  <Link className={`${req.estado == "Terminado" && "text-secondary"}`}
                    to="/main/anexos"
                    state={{
                      idRequerimiento: req.id_requerimiento,
                      nombreRequerimiento: req.nombre,
                    }}
                  >
                    <Button startIcon={<VisibilityIcon />} size="small">
                      Ver anexos
                    </Button>
                  </Link>
                  {usuario?.id_rol == 1 ? (
                    <><Link
                      className={`${req.estado == "Terminado" && "text-secondary"}`}
                      to="/main/propuestas"
                      /*{`${req.estado != "Terminado" ? "/main/propuestas" : ""}`}*/
                      state={{
                        idRequerimiento: req.id_requerimiento,
                        nombreRequerimiento: req.nombre,
                        detalle_requerimiento: req.detalle,
                      }}
                    >
                      <Button startIcon={<SendIcon />} size="small">
                        Ver propuestas
                      </Button>
                    </Link>
                      <Link                        
                        to={`${req.estado != "Terminado" ? "/main/edit_req" : ""}`}
                        state={{ req }}
                      >
                        <Button startIcon={<EditIcon />} size="small">
                          Editar
                        </Button>
                      </Link>

                    </>
                  ) : !req.ya_postulo ? (
                    <Link
                      state={{
                        idRequerimiento: req.id_requerimiento,
                        nombreRequerimiento: req.nombre,
                        detalle_postulacion: `${req.nombre}: ${req.detalle}`,
                      }}
                      to={`/main/postular`}
                    >
                      <Button startIcon={<RocketIcon />} size="small">
                        Postular
                      </Button>
                    </Link>
                  ) : (
                    <Chip label="Postulado" />
                  )} {/*aquí*/}
                </CardActions>
              </Card>
            </Grid>
          )
        })} {/*ok*/}
      </Grid>
    </Box>
  );
}
