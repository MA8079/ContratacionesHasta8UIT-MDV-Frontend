import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';

export function PostulacionComponent({
  id_postulacion,
  detalle_postulacion,
  costo,
  nombre,
  ruc,
  razon_social,
  id_usuario_postulante,
  requerimientoData,
}: any) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/main/cotizacion", {
      state: {
        id_postulacion,
        detalle_postulacion,
        costo,
        nombre,
        ruc,
        razon_social,
        id_usuario_postulante,
        requerimientoData,
      },
    });
  };
  return (
    < Grid item xs={12} sm={12} md={6} >
      <Box sx={{ p:2, width: '100%' }}
        role="button"
        className="postulacion-card "
        onClick={handleClick}
      >
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Proveedor: {nombre}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detalle_postulacion}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>RUC:</strong> {ruc}
            </Typography>
            <Typography variant="body2">
              <strong>Razón social:</strong> {razon_social}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid >
  )
}
