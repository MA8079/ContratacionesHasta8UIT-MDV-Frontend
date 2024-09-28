import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";
import { KeyboardReturnOutlined } from "@mui/icons-material";
import { SendMail, ValidateCode } from "../services/MailService";

function SetcodeView() {
  const [alert, setAlert] = useState({
    variant: "",
    visible: false,
    title: "",
    description: "",
    actionClose: () => {},
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { correo } = location.state;
  console.log(correo);

  const [formData, setFormData] = useState({
    codigo_recuperacion: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateHandler = async (e: any) => {
    e.preventDefault();

    console.log(correo, formData.codigo_recuperacion);

    const json = await ValidateCode(correo, formData.codigo_recuperacion);
    console.log({ json });

    if (json.status == "success") {
      setAlert({
        variant: "success",
        visible: true,
        title: "Exito",
        description: "Codigo de recuperacion correcto",
        actionClose: () => {
          navigate("/chance", {
            state: {
              correo,
            },
          });
        },
      });
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
        <a href="/reset">
          <KeyboardReturnOutlined></KeyboardReturnOutlined>
        </a>
        <br />
        <br />
        <h4 className="text-center">Digite el codigo recibido</h4>
        <Form className="mt-4" onSubmit={validateHandler}>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={handleChange}
              name="codigo_recuperacion"
              type="number"
              placeholder="Codigo"
              required
            />
          </Form.Group>

          <Button className="mx-auto d-block" type="submit" variant="primary">
            Validar codigo
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SetcodeView;
