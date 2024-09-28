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
//
import AlertComponent from "../components/AlertComponent";
import {
  GetAnexosRequerimiento,
  UpdateAnexosRequerimiento,
} from "../services/AnexoRequerimientoService";
import {
  UpdateRequirement,
} from "../services/RequirementService";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { KeyboardReturnOutlined, Warning } from "@mui/icons-material";
import { RequerimientoType } from "../types/RequerimientoType";
import { DeletePostulacionesDeRequerimiento } from "../services/PostulationService";

function EditReqView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const costo_max = 41200;
  const postForm = useRef<any>(null);
  const postBtn = useRef<any>(null);
  const navigate = useNavigate();
  const [errFile, setErrFile] = useState(false);

  const location = useLocation();
  let { req } = location.state;
  let req_edit: RequerimientoType = req;
  const [anexos, setAnexos] = useState<any[]>([]);
  //const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<(File | string)[]>([]);
  const [errCosto, setErrCosto] = useState(false);

  const [alert, setAlert] = useState({
    variant: "",
    severity: "",
    visible: false,
    title: "",
    description: "",
    actionClose: () => { },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const response = await GetAnexosRequerimiento(req_edit.id_requerimiento);
      if (response.status === "success") {
        setAnexos(response.data.anexos);
        setSelectedFile(response.data.anexos.map((anexo: any) => anexo.nombre));
      }
    })();
  }, []);

  const sumarDiasSinFinDeSemana = (fechaInicial: any, dias: any) => {
    const fecha = new Date(fechaInicial);
    let diasRestantes = dias;

    while (diasRestantes > 0) {
      // Sumar un día
      fecha.setDate(fecha.getDate() + 1);

      // Excluir sábados (día 6) y domingos (día 0)
      if (fecha.getDay() !== 6 && fecha.getDay() !== 0) {
        diasRestantes--;
      }
    }

    return formatDate(fecha);
  };

  const formatDate = (now: Date) => {
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;

    return formattedDate;
  };
  const obtenerFechaActual = () => {
    const now = new Date();

    return formatDate(now);
  };

  const [formData, setFormData] = useState({
    nombre: req_edit.nombre,
    fecha_publicacion: obtenerFechaActual(),
    fecha_fin: sumarDiasSinFinDeSemana(obtenerFechaActual(), 10),
    costo: req_edit.costo,
    tipo: req_edit.tipo,
    estado: "Vigente",
    detalle: req_edit.detalle,
    id_usuario_ganador: null,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "costo") {
      if (value > costo_max) {
        setErrCosto(true);
        if (postBtn.current) {
          postBtn.current.disabled = true;
        }
      } else {
        setErrCosto(false);
        if (postBtn.current) {
          postBtn.current.disabled = false;
        }
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postHandler = async (e: any) => {

    e.preventDefault();
    const response = await UpdateRequirement(req_edit.id_requerimiento, formData);

    if (response.status === "success") {
      const filesToUpload = selectedFile.filter(file => file instanceof File);
      if (filesToUpload.length > 0) {
        const responseAnexos = await UpdateAnexosRequerimiento(filesToUpload, req_edit.id_requerimiento);
        console.log(responseAnexos);
      }

      /*if (selectedFile) {
        console.log(selectedFile, req_edit.id_requerimiento);

        const responseAnexos = await UpdateAnexosRequerimiento(
          selectedFile,
          req_edit.id_requerimiento
        );
        console.log(responseAnexos);
      }*/
      const r = await DeletePostulacionesDeRequerimiento(
        req_edit.id_requerimiento
      );
      console.log("Hola", r);

      setAlert({
        variant: "filled",
        severity: "success",
        visible: true,
        title: "Requerimiento actualizado",
        description: "El requerimiento se ha actualizado correctamente",
        actionClose: () => {
          navigate("/main/posts");
        },
      });
    }
    console.log(response);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'application/pdf' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword') {
        const newSelectedFiles = [...selectedFile];
        newSelectedFiles[index] = file;
        setSelectedFile(newSelectedFiles);
        setErrFile(false);
      } else {
        setErrFile(true);
        event.target.value = '';
      }
    }
  };

  /*const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    let validFiles: File[] | null = [];

    if (files) {
      validFiles = Array.from(files).filter(file =>
        file.type === 'application/pdf' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword'
      );

      if (validFiles.length === 0) {
        setErrFile(true);
        event.target.value = ''; // Limpiar el input
      } else {
        setErrFile(false);
      }
    } else {
      setErrFile(true);
      event.target.value = '';
    }

    setSelectedFile(validFiles);
    console.log()
    setFormData((prevData) => ({
      ...prevData,
      files: validFiles
    }));
  };*/

  /*const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };*/

  const handleButtonClick = (index: number) => {
    const fileInput = document.getElementById(`file-input-${index}`);
    if (fileInput) {
      fileInput.click();
    }
  };
  return (

    <Container maxWidth='lg'>
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <a href="/main/posts">
          <KeyboardReturnOutlined></KeyboardReturnOutlined>
        </a>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar requerimiento
        </Typography>
        <Box component="form" ref={postForm} onSubmit={postHandler}>
          <TextField fullWidth name='nombre' label="Nombre de requerimiento"
            variant='outlined'
            margin='normal'
            onChange={handleChange}
            defaultValue={req_edit?.nombre.toString()}
            type='text'
            required />

          <TextField
            fullWidth
            name='costo'
            label="Costo"
            variant='outlined'
            margin='normal'
            onChange={handleChange}
            defaultValue={req_edit?.costo.toString()}
            type='number'
            required
            InputProps={{
              startAdornment: <InputAdornment position='start'>
                S/
              </InputAdornment>
            }}
          />
          {errCosto && (
            <small className="d-block text-end text-danger">
              El costo no debe superar los 8 UIT=S/41,200
            </small>
          )}

          <FormControl fullWidth margin='normal'>
            <InputLabel id="tipo-lable">Tipo</InputLabel>
            <Select
              name='tipo'
              labelId='tipo-label'
              variant='outlined'
              defaultValue={req_edit?.tipo.toString()}
              onChange={handleChange}
            >
              <MenuItem value="Servicios">Servicio</MenuItem>
              <MenuItem value="Bienes">Bien</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 2, mb: 2 }}>
            {anexos.map((anexo, index) => (
              <div key={index}>
                <input
                  accept=".doc,.docx,.pdf"
                  style={{ display: 'none' }}
                  id={`file-input-${index}`}
                  type="file"
                  onChange={(e) => handleFileChange(e, index)}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AttachFileIcon />}
                  fullWidth={isMobile}
                  onClick={() => handleButtonClick(index)}
                >
                  {selectedFile[index] instanceof File
                    ? (selectedFile[index] as File).name
                    : selectedFile[index] || anexo.nombre}
                </Button>
              </div>
            ))}
            {errFile && (
              <Typography variant="body2" sx={{ mt: 1, color: "#ff0000" }}>
                Por favor, seleccione solo archivos PDF o Word.
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
            defaultValue={req_edit?.detalle.toString()}
            onChange={handleChange}
            required
          />

          <p className="alert alert-warning">
            <Warning></Warning>
            <span className="mx-3">
              El requerimiento finalizará en 10 días adicionales.
            </span>
          </p>
          <Button
            type="submit"
            variant="contained"
            color='warning'
            size='large'
            sx={{ mt: 2 }}
            fullWidth={isMobile}
            ref={postBtn}
          >
            Actualizar requerimiento
          </Button>
        </Box>
      </Paper>
      <AlertComponent
        variant={alert.variant}
        visible={alert.visible}
        title={alert.title}
        description={alert.description}
        actionClose={alert.actionClose}
      ></AlertComponent>
    </Container>
  );
}

export default EditReqView;
