/*import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Container,
  Paper,
  InputAdornment,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useLocation } from "react-router";
import { GetUserById } from "../services/UserService";
import { UsuarioType } from "../types/UsuarioType";
import { CreatePostulation } from "../services/PostulationService";
import { UploadAnexosPostulacion } from "../services/AnexoPostulacionService";
import AlertComponent from "../components/AlertComponent";

const COSTO_MAX = 41200;

function PostularView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const id_usuario = Number(localStorage.getItem("id_usuario"));
  const { idRequerimiento: id_requerimiento, nombreRequerimiento, detalle_postulacion } = location.state;

  const [usuario, setUsuario] = useState<UsuarioType | null>(null);
  const [formData, setFormData] = useState({
    id_postulacion: 0,
    detalle_postulacion,
    costo: '',
    id_requerimiento,
    id_usuario,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [errCosto, setErrCosto] = useState(false);
  const [errFile, setErrFile] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await GetUserById(id_usuario);
      setUsuario(userData);
    };
    fetchUser();
  }, [id_usuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "costo") {
      setErrCosto(Number(value) > COSTO_MAX);
    }
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file =>
        ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.type)
      );
      setErrFile(validFiles.length === 0);
      setSelectedFiles(validFiles.length > 0 ? validFiles : null);
    } else {
      setErrFile(true);
      setSelectedFiles(null);
    }
  };

  const postularHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await CreatePostulation(formData);
      if (response.status === "success" && selectedFiles) {
        const responseAnexos = await UploadAnexosPostulacion(selectedFiles, response.data.insertId);
        if (responseAnexos.status === "success") {
          setFormData(prevData => ({ ...prevData, costo: '', detalle_postulacion: '' }));
          setSelectedFiles(null);
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.error("Error al crear la postulación:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cotizar: {nombreRequerimiento}
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={postularHandler}>
          <TextField
            fullWidth
            disabled
            label="RUC"
            variant="outlined"
            margin="normal"
            value={usuario?.ruc || ''}
          />
          <TextField
            fullWidth
            disabled
            label="Razón Social"
            variant="outlined"
            margin="normal"
            value={usuario?.razon_social || ''}
          />
          <TextField
            fullWidth
            disabled
            label="Dirección fiscal"
            variant="outlined"
            margin="normal"
            value={usuario?.direccion || ''}
          />
          <TextField
            fullWidth
            disabled
            label="Código de Cuenta Interbancario"
            variant="outlined"
            margin="normal"
            value={usuario?.numero_cuenta || ''}
          />
          <TextField
            fullWidth
            name='costo'
            label="Costo"
            variant="outlined"
            margin="normal"
            type='number'
            required
            value={formData.costo}
            onChange={handleChange}
            error={errCosto}
            helperText={errCosto ? `El costo no debe superar los 8 UIT=S/${COSTO_MAX}` : ''}
            InputProps={{
              startAdornment: <InputAdornment position="start">S/</InputAdornment>,
            }}
          />
          <input
            type="file"
            accept=".doc,.docx,.pdf"
            multiple
            onChange={handleFileChange}
            style={{ margin: '20px 0' }}
          />
          {errFile && (
            <Typography variant="caption" color="error">
              Por favor, seleccione solo archivos PDF o Word.
            </Typography>
          )}
          <TextField
            fullWidth
            name='detalle_postulacion'
            label="Detalle"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={formData.detalle_postulacion}
            onChange={handleChange}
          />
          <Button
            type='submit'
            variant="contained"
            size='large'
            color="primary"
            sx={{ mt: 2 }}
            fullWidth={isMobile}
            disabled={errCosto || errFile}
          >
            Publicar
          </Button>
        </Box>
      </Paper>
      {showAlert && (
        <AlertComponent
          variant="success"
          visible={showAlert}
          title="¡Publicado!"
          description="La postulación se ha publicado correctamente"
        />
      )}
    </Container>
  );
}

export default PostularView;*/
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Container,
  Paper,
  InputAdornment,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useLocation } from "react-router";
import { GetUserById } from "../services/UserService";
import { UsuarioType } from "../types/UsuarioType";
import { CreatePostulation } from "../services/PostulationService";
import { UploadAnexosPostulacion } from "../services/AnexoPostulacionService";
import AlertComponent from "../components/AlertComponent";

const COSTO_MAX = 41200;

function PostularView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const id_usuario = Number(localStorage.getItem("id_usuario"));
  const { idRequerimiento: id_requerimiento, nombreRequerimiento, detalle_postulacion } = location.state;

  const [usuario, setUsuario] = useState<UsuarioType | null>(null);
  const [formData, setFormData] = useState({
    id_postulacion: 0,
    detalle_postulacion,
    costo: '',
    id_requerimiento,
    id_usuario,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [errCosto, setErrCosto] = useState(false);
  const [errFile, setErrFile] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await GetUserById(id_usuario);
      setUsuario(userData);
    };
    fetchUser();
  }, [id_usuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "costo") {
      setErrCosto(Number(value) > COSTO_MAX);
    }
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file =>
        ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.type)
      );
      setErrFile(validFiles.length === 0);
      setSelectedFiles(validFiles.length > 0 ? validFiles : null);
    } else {
      setErrFile(true);
      setSelectedFiles(null);
    }
  };

  const postularHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await CreatePostulation(formData);
      if (response.status === "success" && selectedFiles) {
        const responseAnexos = await UploadAnexosPostulacion(selectedFiles, response.data.insertId);
        if (responseAnexos.status === "success") {
          setFormData(prevData => ({ ...prevData, costo: '', detalle_postulacion: '' }));
          setSelectedFiles(null);
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.error("Error al crear la postulación:", error);
    }
  };

  const isFormValid = useMemo(() => {
    return (
      formData.costo !== '' &&
      formData.detalle_postulacion.trim() !== '' &&
      selectedFiles !== null &&
      !errCosto &&
      !errFile
    );
  }, [formData, selectedFiles, errCosto, errFile]);

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cotizar: {nombreRequerimiento}
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={postularHandler}>
          <TextField
            fullWidth
            disabled
            label="RUC"
            variant="outlined"
            margin="normal"
            value={usuario?.ruc || ''}
          />
          <TextField
            fullWidth
            disabled
            label="Razón Social"
            variant="outlined"
            margin="normal"
            value={usuario?.razon_social || ''}
          />
          <TextField
            fullWidth
            disabled
            label="Dirección fiscal"
            variant="outlined"
            margin="normal"
            value={usuario?.direccion || ''}
          />
          <TextField
            fullWidth
            disabled
            label="Código de Cuenta Interbancario"
            variant="outlined"
            margin="normal"
            value={usuario?.numero_cuenta || ''}
          />
          <TextField
            fullWidth
            name='costo'
            label="Costo"
            variant="outlined"
            margin="normal"
            type='number'
            required
            value={formData.costo}
            onChange={handleChange}
            error={errCosto}
            helperText={errCosto ? `El costo no debe superar los 8 UIT=S/${COSTO_MAX}` : ''}
            InputProps={{
              startAdornment: <InputAdornment position="start">S/</InputAdornment>,
            }}
          />
          <input
            type="file"
            accept=".doc,.docx,.pdf"
            multiple
            onChange={handleFileChange}
            style={{ margin: '20px 0' }}
          />
          {errFile && (
            <Typography variant="caption" color="error">
              Por favor, seleccione solo archivos PDF o Word.
            </Typography>
          )}
          <TextField
            fullWidth
            name='detalle_postulacion'
            label="Detalle"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={formData.detalle_postulacion}
            onChange={handleChange}
            required
          />
          <Button
            type='submit'
            variant="contained"
            size='large'
            color="primary"
            sx={{ mt: 2 }}
            fullWidth={isMobile}
            disabled={!isFormValid}
          >
            Publicar
          </Button>
        </Box>
      </Paper>
      {showAlert && (
        <AlertComponent
          variant="success"
          visible={showAlert}
          title="¡Publicado!"
          description="La postulación se ha publicado correctamente"
        />
      )}
    </Container>
  );
}

export default PostularView;
