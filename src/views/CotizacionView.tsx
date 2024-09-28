import { useContext, useEffect, useState } from "react";
import { AnexoType } from "../types/AnexoType";
import docxIcon from "./../assets/extensions/docx.webp";
import pdfIcon from "./../assets/extensions/pdf.jpeg";
import { useLocation } from "react-router";
//import { KeyboardReturnOutlined, CheckCircle } from "@mui/icons-material";
import { ArrowBack as ArrowBackIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { MyContext } from "../context/Context";
import {
  GetAnexosPostulacion,
  GetUrlAnexoPostulacion,
} from "../services/AnexoPostulacionService";
import { Link } from "react-router-dom";
import WinComponent from "../components/WinComponent";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  useMediaQuery,
  ThemeProvider,
  createTheme,
} from '@mui/material';

function CotizacionView() {
  const location = useLocation();
  const {
    id_postulacion,
    detalle_postulacion,
    costo,
    nombre,
    ruc,
    razon_social,
    id_usuario_postulante,
    requerimientoData,
  } = location.state;

  const [anexos, setAnexos] = useState<AnexoType[]>([]);
  const { anexoSelected, setAnexoSelected } = useContext(MyContext);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    (async () => {
      const results = await GetAnexosPostulacion(id_postulacion);
      setAnexos(results.data.anexos);
      setAnexoSelected(results.data.anexos[0].nombre);
    })();
  }, []);

  const ObtenerIcono = (extension: string) => {
    if (extension == "pdf") return pdfIcon;
    if (extension == "docx" || extension == "doc") return docxIcon;
  };

  const GetExtension = (anexoSelected: string) => {
    let extension = anexoSelected.split(".")[1];

    return extension;
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
  });
  
  //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p:7, width: '100%', margin: 'auto' }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Grid item>
            <Link to="/main/propuestas" state={requerimientoData}>
              <Button startIcon={<ArrowBackIcon />} size="small">
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircleIcon />}
              sx={{ borderRadius: 20 }}
              onClick={() => setModalShow(true)}
            >
              Seleccionar cotización
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Nombre proveedor:</Typography>
              <Typography variant="body1" paragraph>{nombre}</Typography>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>RUC:</Typography>
              <Typography variant="body1" paragraph>{ruc}</Typography>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Costo:</Typography>
              <Typography variant="body1">{costo}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Razón social:</Typography>
              <Typography variant="body1" paragraph>{razon_social}</Typography>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Detalle de la postulacion:</Typography>
              <Typography variant="body1">{detalle_postulacion}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>Anexos subidos por el proveedor:</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm="auto">
              {anexos.map((anexo: AnexoType, i) => (
                <Card key={i}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', py: 1 }} >
                    <div
                      role="button"
                      onClick={() => setAnexoSelected(anexo.nombre)}
                      className={`anexo d-flex flex-column align-items-center justify-content-center p-2 border border-1 mx-1 text-center ${anexoSelected == anexo.nombre && "anexo-active"
                        }`}>
                      <img src={ObtenerIcono(anexo.extension)} alt="Ver" />
                      <span className="mt-3">{anexo.nombre}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            {GetExtension(anexoSelected) == "pdf" ? (
              <Grid item xs={12} sm="auto">
                <Button
                  variant="contained"
                  color="primary"
                  href={GetUrlAnexoPostulacion(anexoSelected)}
                  target="_blank"
                  rel="noopener noreferrer">
                  Ver anexo
                </Button>
              </Grid>
            ) : (
              <Grid item xs={12} sm="auto">
                <Button
                  variant="contained"
                  color="primary"
                  href={GetUrlAnexoPostulacion(anexoSelected)}>
                  Descargar anexo
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
      <WinComponent
        idRequerimiento={requerimientoData.idRequerimiento}
        idUsuarioPostulante={id_usuario_postulante}
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></WinComponent>
    </ThemeProvider>

  );
}

export default CotizacionView;
/*}
    <div className="h-100 flex-grow-1 align-self-start mx-3 p-4 bg-white  overflow-y-hidden">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/main/propuestas" state={requerimientoData}>
          <KeyboardReturnOutlined></KeyboardReturnOutlined>
        </Link>

        <button
          className="btn btn-primary text-end d-flex align-items-center"
          onClick={() => setModalShow(true)}
        >
          <CheckCircle></CheckCircle>
          <span className="mx-2">Seleccionar cotizacion</span>
        </button>
      </div>
      <div className="mt-3 d-flex align-items-start">
        <div className="w-50">
          <div className="">
            <h6 className="m-0 p-0">Nombre proveedor: </h6>
            <p className="p-0 m-0 mt-2">{nombre}</p>
          </div>
          <br />
          <div className="">
            <h6 className="m-0 p-0">Ruc: </h6>
            <p className="p-0 m-0 mt-2">{ruc}</p>
          </div>
          <br />
          <div className="">
            <h6 className="m-0 p-0">Costo: </h6>
            <p className="p-0 m-0 mt-2"> S/. {costo}</p>
          </div>
        </div>

        <div className="mx-5">
          <div className="">
            <h6 className="m-0 p-0">Razon social: </h6>
            <p className="p-0 m-0 mt-2">{razon_social}</p>
          </div>
          <br />
          <div className="">
            <h6 className="m-0 p-0">Detalle de la postulacion: </h6>
            <p className="p-0 m-0 mt-2">{detalle_postulacion}</p>
          </div>
        </div>
      </div>
      <br />
      <h6 className="m-0 p-0">Anexos subidos por el proveedor: </h6>
      <div className="container  p-1 text-center">
        <div className="row mt-2">
          <div className="col">
            {anexos.map((anexo: AnexoType, i) => (
              <div
                key={i}
                role="button"
                onClick={() => setAnexoSelected(anexo.nombre)}
                className={`anexo d-flex flex-column align-items-center justify-content-center p-2 border border-1 mx-1 text-center ${anexoSelected == anexo.nombre && "anexo-active"
                  }`}>
                <img src={ObtenerIcono(anexo.extension)} alt="Ver" />
                <span className="mt-3">{anexo.nombre}</span>
              </div>
            ))}
          </div>
          {GetExtension(anexoSelected) == "pdf" ? (
            <div className="col">
              <a
                href={GetUrlAnexoPostulacion(anexoSelected)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-3 px-5 py-2"
              >
                Ver anexo
              </a>
            </div>
          ) : (
            <div className="col">
              <a
                href={GetUrlAnexoPostulacion(anexoSelected)}
                className="btn btn-primary mt-3 px-5 py-2"
              >
                Descargar anexo
              </a>
            </div>
          )}
        </div>
      </div>
      <WinComponent
        idRequerimiento={requerimientoData.idRequerimiento}
        idUsuarioPostulante={id_usuario_postulante}
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></WinComponent>      
    </div>
    
    {/*}
                  <CardContent key={i} sx={{ display: 'flex', alignItems: 'center', py: 1 }} >
                    <img src={ObtenerIcono(anexo.extension)} alt="Ver" />
                    <PdfIcon color="error" sx={{ fontSize: 40, mr: 1 }} />
                    {/*<Typography variant="body2" sx={{
                      maxWidth: isMobile ? '200px' : '300px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {anexo.nombre}
                    </Typography>
                  </CardContent>
    
    
    */
