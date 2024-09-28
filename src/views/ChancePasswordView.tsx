/*import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";
import { KeyboardReturnOutlined } from "@mui/icons-material";
import { ChancePassword, SendMail } from "../services/MailService";

function ChancePasswordView() {
  const [alert, setAlert] = useState({
    variant: "",
    visible: false,
    title: "",
    description: "",
    actionClose: () => {},
  });

  const resetForm = useRef<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { correo } = location.state;

  const [formData, setFormData] = useState({
    contrasena: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetHandler = async (e: any) => {
    e.preventDefault();

    const json = await ChancePassword(correo, formData.contrasena);
    console.log(json);

    if (json.status == "success") {
      setAlert({
        variant: "success",
        visible: true,
        title: "Exito",
        description: "Contraseña cambiada correctamente",
        actionClose: () => {
          navigate("/");
        },
      });
      resetForm?.current?.reset();
    } else {
      setAlert({
        variant: "error",
        visible: true,
        title: "Error",
        description: json.data.message,
        actionClose: () => {},
      });
    }
  };

  return (
    <div>
      <AlertComponent
        variant={alert.variant}
        visible={alert.visible}
        title={alert.title}
        description={alert.description}
        actionClose={alert.actionClose}
      ></AlertComponent>
      <div className="bg-white w-50 mx-auto mt-4 p-4 rounded">
        <h4 className="text-center">Crea una nueva contraseña</h4>
        <Form ref={resetForm} className="mt-4" onSubmit={resetHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              onChange={handleChange}
              name="contrasena"
              type="password"
              placeholder="Nueva contraseña"
              required
            />
          </Form.Group>

          <Button className="mx-auto d-block" type="submit" variant="success">
            Crear nueva contraseña
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ChancePasswordView;*/
