/*
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/Context";
import { GetUserById } from "../services/UserService";
import { UsuarioType } from "../types/UsuarioType";
import ProveedorImg from "../assets/proveedor.png";
import Municipio from "./../assets/md-velille2.webp";

function SidebarComponent() {
  const navigate = useNavigate();
  const { selectedOption, setSelectedOption } = useContext(MyContext);
  const [usuario, setUsuario] = useState<UsuarioType>();
  useEffect(() => {
    (async () => {
      const idUsuario = Number(localStorage.getItem("id_usuario"));
      setUsuario(await GetUserById(idUsuario));
    })();
  }, []);
  const clickHanlder = (e: any) => {
    if (e.target.text) {
      setSelectedOption(e.target.text);
    }
  };
  const cerrarSesionHandler = (e: any) => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="container-sidebar px-2" style={{background:'#efaa1e'}}>
      <div className="container-photo mt-3 mx-auto text-center">
        {usuario?.id_rol == 1 ? (
          <img src={Municipio} alt="" />
        ) : (
          <img src={ProveedorImg} alt="" />
        )}

        <h5 className="mt-2">{usuario?.nombre}</h5>
        <p className="text-success">
          {usuario?.id_rol == 1 ? "Municipio" : "Proveedor"}
        </p>
      </div>
      <div className="mt-5">
        <div
          className={`option rounded mb-3 ${
            selectedOption == "Publicaciones" && "active-option"
          }`}
          role="button"
          onClick={clickHanlder}
        >
          <p className="py-2 px-3 m-0">
            <Link
              to="posts"
              style={{ color: "#212529", fontWeight: "normal" }}
              className="d-block text-decoration-none"
            >
              Publicaciones
            </Link>
          </p>
        </div>
        {usuario?.id_rol == 1 && (
          <div
            className={`option rounded mb-3 ${
              selectedOption == "Publicar" && "active-option"
            }`}
            role="button"
            onClick={clickHanlder}
          >
            <p className="py-2 px-3 m-0">
              <Link
                to="postear"
                style={{ color: "#212529", fontWeight: "normal" }}
                className="d-block text-decoration-none"
              >
                Publicar
              </Link>
            </p>
          </div>
        )}
        {usuario?.id_rol == 2 && (
          <div
            className={`option rounded mb-3 ${
              selectedOption == "Notificaciones" && "active-option"
            }`}
            role="button"
            onClick={clickHanlder}
          >
            <p className="py-2 px-3 m-0">
              <Link
                to="notify"
                style={{ color: "#212529", fontWeight: "normal" }}
                className="d-block text-decoration-none"
              >
                Notificaciones
              </Link>
            </p>
          </div>
        )}
        <div
          className={`option rounded mx-2 mb-3 cerrar-sesion-option ${
            selectedOption == "Cerrar sesion" && "active-option"
          }`}
          role="button"
          onClick={cerrarSesionHandler}
        >
          <p className="py-2 px-3 m-0">Cerrar sesion</p>
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent;*/
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/Context";
import { GetUserById } from "../services/UserService";
import { UsuarioType } from "../types/UsuarioType";
import ProveedorImg from "../assets/proveedor.png";
import Municipio from "./../assets/md-velille2.webp";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemButton,
  Typography,
  Box,
  Avatar,
  Button,
  useMediaQuery,
  IconButton,
  AppBar,
  Toolbar,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Publish as PublishIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(213, 12, 30)', //rojo 

    },
    background: {
      default: '#fff',
    },
  },
});
export default function SidebarComponent() {
  const navigate = useNavigate();
  const { selectedOption, setSelectedOption } = useContext(MyContext);
  const [usuario, setUsuario] = useState<UsuarioType>();
  useEffect(() => {
    (async () => {
      const idUsuario = Number(localStorage.getItem("id_usuario"));
      setUsuario(await GetUserById(idUsuario));
    })();
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const clickHandler = (e: any) => {
    if (e.target.text) {
      setSelectedOption(e.target.text);
    }
  };

  const cerrarSesionHandler = (e: any) => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const estiloBotonLista = {
    mt: 1,
    '&:hover': {
      backgroundColor: 'primary.light',
      transition: 'background-color 0.3s',
    },
    '&.Mui-selected': {
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
      '&:hover': {
        backgroundColor: 'primary.main',
      },
    },
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#efaa1e', ...(isMobile ? { marginTop: 6 } : { marginTop: 0 }) }}>

      <Box sx={{ p: 2, textAlign: 'center' }}>
        {usuario?.id_rol == 1 ? (
          <Avatar
            src={Municipio}
            alt="MunicipalidadLogo"
            sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
          />
        ) : (
          <Avatar
            src={ProveedorImg}
            alt="ProveedorIcon"
            sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
          />
        )}
        <Typography variant="h5" color="primary">
          {usuario?.id_rol == 1 ? "Municipalidad" : "Proveedor"}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" fontWeight="bold">
          {usuario?.nombre}
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        <ListItemButton
          selected={selectedOption === "Publicaciones"}
          onClick={clickHandler}
          sx={estiloBotonLista}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <Link
            to="posts"
            style={{ color: "#ffffff", fontWeight: "bold" }}
            className="d-block text-decoration-none"
          >
            Publicaciones
          </Link>
        </ListItemButton>
        {usuario?.id_rol == 1 && (
        <ListItemButton
          selected={selectedOption === "Publicar"}
          onClick={clickHandler}
          sx={estiloBotonLista}
        >
          <ListItemIcon>
            <PublishIcon />
          </ListItemIcon>
          <Link
            to="postear"
            style={{ color: "#ffffff", fontWeight: "bold", }}
            className="d-block text-decoration-none"
          >
            Publicar
          </Link>
        </ListItemButton>
        )}
        {usuario?.id_rol == 2 && (
          <ListItemButton
            selected={selectedOption === "Notificaciones"}
            onClick={clickHandler}
            sx={estiloBotonLista}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <Link
              to="notify"
              style={{ color: "#ffffff", fontWeight: "bold", }}
              className="d-block text-decoration-none"
            >
              Notificaciones
            </Link>
          </ListItemButton>
        )}
      </List>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ExitToAppIcon />}
        sx={{ m: 2 }}
        onClick={cerrarSesionHandler}
      >
        <b>Cerrar sesión</b>
      </Button>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        {isMobile && (
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {usuario?.id_rol == 1 ? "Unidad de Abastecimiento" : "Proveedor"}
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: 'background.default',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
        >
          {isMobile && <Toolbar />}
          {/* Main content goes here */}
        </Box>
      </Box>
    </ThemeProvider>
  );

}


