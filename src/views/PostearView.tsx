import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Container,
  Paper,
  InputAdornment,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { AttachFile as AttachFileIcon } from '@mui/icons-material';
import AlertComponent from "../components/AlertComponent";
import { UploadAnexosRequerimiento } from "../services/AnexoRequerimientoService";
import { CreateRequirement } from "../services/RequirementService";

const COSTO_MAX = 41200;

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es requerido'),
  costo: Yup.number()
    .typeError('El costo debe ser un número')
    .required('El costo es requerido')
    .positive('El costo debe ser positivo')
    .max(COSTO_MAX, `El costo no debe superar las 8 UIT=S/${COSTO_MAX}`),
  tipo: Yup.string().required('El tipo es requerido'),
  detalle: Yup.string().required('El detalle es requerido'),
  files: Yup.mixed().required('Se requiere adjuntar un archivo: PDF ó DOCX')
});

const sumarDiasSinFinDeSemana = (fechaInicial: Date, dias: number): string => {
  const fecha = new Date(fechaInicial);
  let diasRestantes = dias;

  while (diasRestantes > 0) {
    fecha.setDate(fecha.getDate() + 1);
    if (fecha.getDay() !== 6 && fecha.getDay() !== 0) {
      diasRestantes--;
    }
  }

  return formatDate(fecha);
};

const formatDate = (date: Date): string => {
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

const obtenerFechaActual = (): string => {
  return formatDate(new Date());
};

const PostearView: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showAlert, setShowAlert] = useState(false);
  

  const formik = useFormik({
    initialValues: {
      id_requerimiento: 0,
      nombre: '',
      fecha_publicacion: obtenerFechaActual(),
      fecha_fin: sumarDiasSinFinDeSemana(new Date(), 10),
      costo: '',
      tipo: '',
      estado: 'Vigente',
      detalle: '',
      id_usuario_ganador: null,
      files: null as File[] | null,
    },
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const response = await CreateRequirement(values);
        if (response.status === "success" && values.files) {
          const responseAnexos = await UploadAnexosRequerimiento(
            values.files,
            response.data.insertId
          );
          if (responseAnexos.status === "success") {
            formik.resetForm();
            setShowAlert(true);
          }
        }
      } catch (error) {
        console.error('Error al publicar el requerimiento:', error);
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file =>
        ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.type)
      );
      formik.setFieldValue('files', validFiles.length > 0 ? validFiles : null);
    }
  };

  useEffect(() => {
    formik.validateForm();
  }, []);

  return (
    <Container maxWidth='lg'>
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Publicar requerimiento
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name='nombre'
            label="Nombre de requerimiento"
            variant="outlined"
            margin="normal"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />
          <TextField
            fullWidth
            name='costo'
            label="Costo"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">S/</InputAdornment>,
            }}
            value={formik.values.costo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.costo && Boolean(formik.errors.costo)}
            helperText={formik.touched.costo && formik.errors.costo}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              name='tipo'
              labelId="tipo-label"
              label="Tipo"
              variant="outlined"
              value={formik.values.tipo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.tipo && Boolean(formik.errors.tipo)}
            >
              <MenuItem value="Servicios">Servicio</MenuItem>
              <MenuItem value="Bienes">Bien</MenuItem>
            </Select>
            {formik.touched.tipo && formik.errors.tipo && (
              <Typography variant="caption" color="error">
                {formik.errors.tipo}
              </Typography>
            )}
          </FormControl>
          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept=".doc,.docx,.pdf"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(event) => {
                handleFileChange(event);
                formik.setFieldTouched('files', true, false);
              }}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                startIcon={<AttachFileIcon />}
                fullWidth={isMobile}
              >
                {formik.values.files?.[0]?.name || 'Elegir archivos'}
              </Button>
            </label>
            {formik.touched.files && formik.errors.files && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {formik.errors.files as string}
              </Typography>
            )}
          </Box>
          <TextField
            fullWidth
            name='detalle'
            label="Detalle"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={formik.values.detalle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.detalle && Boolean(formik.errors.detalle)}
            helperText={formik.touched.detalle && formik.errors.detalle}
          />
          <Button
            type='submit'
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            fullWidth={isMobile}
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Publicar
          </Button>
        </Box>
      </Paper>
      <AlertComponent
        variant="success"
        visible={showAlert}
        title={"Publicado!"}
        description={"El requerimiento se ha publicado correctamente"}
      />
    </Container>
  );
};

export default PostearView;