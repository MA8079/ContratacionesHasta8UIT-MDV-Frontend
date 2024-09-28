// Material UI
import React, { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  CssBaseline,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Municipio from "./../assets/md-velille2.webp";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";
import { Login } from "../services/UserService";

function LoginView() {
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const loginHandler = async (e: any) => {
    e.preventDefault();

    const json = await Login(formData);

    if (json.status == "success") {
      navigate("/main");
      localStorage.setItem("token", json.data.token);
      localStorage.setItem("id_usuario", json.data.user.id_usuario);
    } else {
      setShowAlert(true);
    }
  };
  const theme = createTheme({
    palette: {
      background: {
        default: '#615c5c', // Un gris oscuro para el fondo
      },
      primary: {
        main: '#d50c1e', // Un rojo para el fondo
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <AlertComponent
        variant="error"
        visible={showAlert}
        title={"Incorrecto"}
        description={"Usuario desconocido"}
      ></AlertComponent>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%', overflow: 'hidden' }}>
          <Box
            sx={{
              flex: isMobile ? 'none' : '0 0 40%',
              bgcolor: 'primary.main',
              color: 'white',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: 160,
                height: 160,
                borderRadius: '50%',
                bgcolor: 'white',
                mb: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <img src={Municipio} alt="Municipio" style={{ width: '110%', height: '110%', objectFit: 'contain' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
              Sistema de Contrataciones
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Acceso a Contrataciones Menores a 8 UIT
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1, textAlign: 'center' }}>
              Municipalidad Distrital de Velille
            </Typography>
          </Box>
          <Box
            sx={{
              flex: isMobile ? 'none' : '0 0 60%',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Bienvenido
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Ingrese sus credenciales para acceder al sistema
            </Typography>
            <Box component="form" noValidate onSubmit={loginHandler}>
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                type="email"
                fullWidth
                id="email"
                placeholder="Correo Electrónico"
                name="correo"
                autoComplete="email"
                autoFocus
                variant="outlined"
                InputProps={{
                  startAdornment: <Mail size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="contrasena"
                placeholder="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="outlined"
                InputProps={{
                  startAdornment: <Lock size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                }}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, py: 1.5, textTransform: 'none' }}
                endIcon={<ArrowRight size={20} />}
              >
                Iniciar sesión
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'flex-start', gap: isMobile ? 1 : 0 }}>
                {/*<Link href="/reset" variant="body2" sx={{ color: 'text.secondary' }}>
                  Olvidé mi contraseña
                </Link>*/}
                <Link href="/register" variant="body2" sx={{ color: 'primary.main' }}>
                  Registrarse como proveedor
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
export default LoginView;
