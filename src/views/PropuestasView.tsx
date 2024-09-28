import React from 'react';
import { Link } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
//import PostsComponent from "../components/PostsComponent";
//import { Filter1Rounded, KeyboardReturnOutlined } from "@mui/icons-material";
//import FilterComponent from "../components/FilterComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { PostulacionType } from "../types/PostulacionType";
import { ObtenerPostulacionesDeRequerimiento } from "../services/PostulationService";
import { PostulacionComponent } from "../components/PostulacionComponent";

function PropuestasView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const location = useLocation();
  const [postulaciones, setPostulaciones] = useState<PostulacionType[]>();
  const { idRequerimiento, nombreRequerimiento, detalle_requerimiento } =
    location.state;

  useEffect(() => {
    (async () => {
      const res = await ObtenerPostulacionesDeRequerimiento(idRequerimiento);

      if (res.status == "success") {
        setPostulaciones(res.data.postulaciones_requerimiento);
      }
    })();
  }, []);
  return (
    <>
      <div className="h-100 flex-grow-1 align-self-start mx-3 p-4 bg-white">
        <Box sx={{ p: 3, width: '100%', margin: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Link to="/main/posts" >
              <Button startIcon={<ArrowBackIcon />} size="small">
              </Button>
            </Link>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
              Cotizaciones de: <span style={{ color: theme.palette.text.secondary }}>{nombreRequerimiento}</span>
            </Typography>
          </Box>
          <Typography variant="h6" component="h2" gutterBottom>
            Detalle del requerimiento:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {detalle_requerimiento}
          </Typography>
          <Grid container spacing={3}>
            {postulaciones?.map((postulacion: PostulacionType, i) => (
              <PostulacionComponent
                key={i}
                id_postulacion={postulacion.id_postulacion}
                detalle_postulacion={postulacion.detalle_postulacion}
                costo={postulacion.costo}
                nombre={postulacion.nombre}
                ruc={postulacion.ruc}
                razon_social={postulacion.razon_social}
                requerimientoData={location.state}
                id_usuario_postulante={postulacion.id_usuario}
              ></PostulacionComponent>
            ))}
          </Grid>
          {postulaciones?.length == 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <Typography variant="body1" textAlign="center" fontStyle="italic" fontWeight="bold" gutterBottom>
                Aún no hay cotizaciones para este requerimiento.
              </Typography>
            </Box>
          )}
        </Box>
      </div>

      {/*
      <div className="h-100 flex-grow-1 align-self-start mx-3 p-4 bg-white">
        
        <div className="d-flex align-items-center justify-content-between">
          <a href="/main/posts">
            <KeyboardReturnOutlined></KeyboardReturnOutlined>
          </a>

          <h4 className="text-end">
            Cotizaciones de:{" "}
            <span className="text-secondary"> {nombreRequerimiento}</span>
          </h4>
        </div>
        <div className="mt-4">
          <h6>Detalle del requerimiento</h6>
          <p>{detalle_requerimiento}</p>
          <div className="mt-4 container-postulations">
            {postulaciones?.map((postulacion: PostulacionType, i) => (
              <PostulacionComponent
                key={i}
                id_postulacion={postulacion.id_postulacion}
                detalle_postulacion={postulacion.detalle_postulacion}
                costo={postulacion.costo}
                nombre={postulacion.nombre}
                ruc={postulacion.ruc}
                razon_social={postulacion.razon_social}
                requerimientoData={location.state}
                id_usuario_postulante={postulacion.id_usuario}
              ></PostulacionComponent>
            ))}
          </div>
        </div>
        {postulaciones?.length == 0 && (
          <p className="text-center text-secondary mt-4 fst-italic">
            Aun no hay cotizaciones para este requerimiento.
          </p>
        )}
      </div>*/}
    </>
  );
}

export default PropuestasView;
