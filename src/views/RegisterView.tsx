
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  Container,
  Paper,
  Box,
  useMediaQuery,
  Link,
} from '@mui/material';
//import { } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GetDataByRuc } from "../services/SunatService";
import { Signin } from "../services/UserService";
import AlertComponent from "../components/AlertComponent";
import Municipio from "./../assets/md-velille2.webp";
import { Mail, MapPinHouse, Lock, CreditCardIcon, IdCardIcon, ArrowRight, UserPen, Phone, PiggyBank } from 'lucide-react';

const validationSchema = Yup.object({
  correo: Yup.string().email('Correo electrónico inválido').required('El correo es requerido'),
  contrasena: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
  dni: Yup.string().length(8, 'El DNI debe tener 8 dígitos').required('El DNI es requerido'),
  nombre: Yup.string().required('El nombre es requerido'),
  apellido: Yup.string().required('El apellido es requerido'),
  telefono: Yup.string().length(9, "Ingrese 09 dígitos").required('El teléfono es requerido'),
  numero_cuenta: Yup.string().length(20, 'El CCI debe contener 20 dígitos').required('El número de cuenta es requerido'),
  ruc: Yup.string().length(11, 'El RUC debe tener 11 dígitos').required('El RUC es requerido'),
  razon_social: Yup.string().required('La razón social es requerida'),
  direccion: Yup.string().required('La dirección es requerida'),
  distrito: Yup.string().required('Campo requerido'),
  provincia: Yup.string().required('Campo requerido'),
  departamento: Yup.string().required('Campo requerido'),
});

function RegisterView() {

  const [rucError, setRucError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const [alert, setAlert] = useState({
    severity: "",
    variant: "",
    visible: false,
    title: "",
  });
  const [ctrlErrorVisible, setCtrlErrorVisible] = useState({
    visible: false,
  });

  const formik = useFormik({
    initialValues: {
      correo: '',
      contrasena: '',
      dni: '',
      nombre: '',
      apellido: '',
      telefono: '',
      numero_cuenta: '',
      ruc: '',
      razon_social: '',
      direccion: '',
      distrito: '',
      provincia: '',
      departamento: '',

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let response = null;
      try {
        response = await Signin(values);
        console.log(response);
        if (response.status === "success") {
          setAlert({
            variant: "filled",
            severity: "success",
            visible: true,
            title: "Usuario registrado",

          });

          setCtrlErrorVisible({
            visible: true,
          });
          formik.resetForm();
        }
      } catch (error) {
        //console.log("Error");
        setAlert({
          variant: "filled",
          severity: "error",
          visible: true,
          title: response.status,

        });
        setCtrlErrorVisible({
          visible: true,
        });
        formik.resetForm();
      }
      formik.resetForm();
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    const isValid = Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length > 0;
    setIsFormValid(isValid);
  }, [formik.errors, formik.touched]);

  const handleRucChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.handleChange(e);
    if (value.length === 11) {
      try {
        const response = await GetDataByRuc(value);
        if (response.status === 'success') {
          formik.setFieldValue('razon_social', response.data.sunatData.razonSocial);
          formik.setFieldValue('distrito', response.data.sunatData.distrito);
          formik.setFieldValue('provincia', response.data.sunatData.provincia);
          formik.setFieldValue('departamento', response.data.sunatData.departamento);
          setRucError('');
        }
      } catch (error) {
        formik.setFieldValue('razon_social', '');
        setRucError('No se pudo obtener la información del RUC');
      }
    } else {
      formik.setFieldValue('razon_social', '');
      setRucError('');
    }
  };

  /*const tema = createTheme({
    palette: {
      primary: {
        main: 'rgb(213,12,30)',
      },
    }
  });*/
  const theme = createTheme({
    palette: {
      background: {
        default: '#efaa1e', // Un amarillo dorado para el fondo
      },
      primary: {
        main: '#d50c1e', // Un rojo para el fondo
      },
    },
    /*components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff', // Fondo blanco para el Paper
          },
        },
      },

    },*/
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <ThemeProvider theme={theme}>
      <AlertComponent
        severity={alert.severity}
        variant={alert.variant}
        visible={alert.visible}
        title={alert.title}
      ></AlertComponent>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ mt: 2, display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden' }}>
          <Box
            sx={{
              flex: isMobile ? 'none' : '0 0 40%',
              bgcolor: 'primary.main',
              color: 'white',
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: 125,
                height: 125,
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
            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1, textAlign: 'center' }}>
              Municipalidad Distrital de Velille
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
              Registro de proveedores
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
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mt: 1 }}>
                    Información de cuenta
                  </Typography>
                  <TextField
                    fullWidth
                    id="correo"
                    name="correo"
                    label="Correo electrónico"
                    value={formik.values.correo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.correo && Boolean(formik.errors.correo)}
                    helperText={formik.touched.correo && formik.errors.correo}
                    margin="normal"
                    InputProps={{
                      startAdornment: <Mail size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                    }}
                  />
                  <TextField
                    variant='outlined'
                    fullWidth
                    id="contrasena"
                    name="contrasena"
                    label="Contraseña"
                    type="password"
                    value={formik.values.contrasena}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.contrasena && Boolean(formik.errors.contrasena)}
                    helperText={formik.touched.contrasena && formik.errors.contrasena}
                    margin="normal"
                    InputProps={{
                      startAdornment: <Lock size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                    }}
                  />
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mt: 1 }}>
                    Información de empresa
                  </Typography>
                  <TextField
                    fullWidth
                    id="ruc"
                    name="ruc"
                    label="RUC"
                    value={formik.values.ruc}
                    onChange={handleRucChange}
                    onBlur={formik.handleBlur}
                    error={(formik.touched.ruc && Boolean(formik.errors.ruc)) || Boolean(rucError)}
                    helperText={(formik.touched.ruc && formik.errors.ruc) || rucError}
                    margin="normal"
                    InputProps={{
                      startAdornment: <CreditCardIcon size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    id="razon_social"
                    name="razon_social"
                    label="Razón social"
                    value={formik.values.razon_social}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.razon_social && Boolean(formik.errors.razon_social)}
                    helperText={formik.touched.razon_social && formik.errors.razon_social}
                    margin="normal"
                    disabled
                  />
                  <TextField
                    fullWidth
                    id="direccion"
                    name="direccion"
                    label="Dirección"
                    value={formik.values.direccion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                    helperText={formik.touched.direccion && formik.errors.direccion}
                    margin="normal"
                    InputProps={{
                      startAdornment: <MapPinHouse size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    id="distrito"
                    name="distrito"
                    label="Distrito"
                    value={formik.values.distrito}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.distrito && Boolean(formik.errors.distrito)}
                    helperText={formik.touched.distrito && formik.errors.distrito}
                    margin="normal"
                    disabled
                  />
                  <TextField
                    fullWidth
                    id="provincia"
                    name="provincia"
                    label="Provincia"
                    value={formik.values.provincia}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.provincia && Boolean(formik.errors.provincia)}
                    helperText={formik.touched.provincia && formik.errors.provincia}
                    margin="normal"
                    disabled
                  />
                  <TextField
                    fullWidth
                    id="departamento"
                    name="departamento"
                    label="Departamento"
                    value={formik.values.departamento}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.departamento && Boolean(formik.errors.departamento)}
                    helperText={formik.touched.departamento && formik.errors.departamento}
                    margin="normal"
                    disabled
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mt: 1 }}>
                    Representante legal
                  </Typography>
                  <TextField
                    fullWidth
                    id="dni"
                    name="dni"
                    label="DNI"
                    value={formik.values.dni}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dni && Boolean(formik.errors.dni)}
                    helperText={formik.touched.dni && formik.errors.dni}
                    margin="normal"
                    InputProps={{
                      startAdornment: <IdCardIcon size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    helperText={formik.touched.nombre && formik.errors.nombre}
                    margin="normal"
                    InputProps={{
                      startAdornment: <UserPen size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    id="apellido"
                    name="apellido"
                    label="Apellido"
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                    helperText={formik.touched.apellido && formik.errors.apellido}
                    margin="normal"
                    InputProps={{
                      startAdornment: <UserPen size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                    }}
                  />

                  <TextField
                    fullWidth
                    id="telefono"
                    name="telefono"
                    label="Teléfono"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                    helperText={formik.touched.telefono && formik.errors.telefono}
                    margin="normal"
                    InputProps={{
                      startAdornment: <Phone size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    id="numero_cuenta"
                    name="numero_cuenta"
                    label="Número de cuenta bancaria"
                    value={formik.values.numero_cuenta}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.numero_cuenta && Boolean(formik.errors.numero_cuenta)}
                    helperText={formik.touched.numero_cuenta && formik.errors.numero_cuenta}
                    margin="normal"
                    InputProps={{
                      startAdornment: <PiggyBank size={20} style={{ color: theme.palette.text.secondary, marginRight: '8px' }} />,
                    }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2, py: 1.5, textTransform: 'none' }}
                  color="primary"
                  disabled={!isFormValid}
                  endIcon={<ArrowRight size={20} />}
                >
                  Registrarse
                </Button>
              </Box>
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2">
                  ¿Ya tienes cuenta? <Link href="/" variant="body2" sx={{ color: 'primary.main' }}>
                    Iniciar sesión
                  </Link>
                </Typography>

              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterView;
