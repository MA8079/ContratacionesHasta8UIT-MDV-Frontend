import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";
import { KeyboardReturnOutlined } from "@mui/icons-material";
import { SendMail } from "../services/MailService";

function ResetPasswordView() {
  const [alert, setAlert] = useState({
    variant: "",
    visible: false,
    title: "",
    description: "",
    actionClose: () => {},
  });

  const navigate = useNavigate();
  const resetForm = useRef<any>(null);
  const btnSend = useRef<any>(null);
  const btnBack = useRef<any>(null);

  const [formData, setFormData] = useState({
    correo: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetHandler = async (e: any) => {
    btnSend.current.disabled = true;
    btnBack.current.style.pointerEvents = "none";

    e.preventDefault();

    const json = await SendMail(formData.correo);
    console.log({ json });

    if (json.status == "success") {
      setAlert({
        variant: "success",
        visible: true,
        title: "Exito",
        description: "Codigo de recuperacion enviado",
        actionClose: () => {
          console.log("holaa");
          navigate("/setcode", {
            state: { correo: formData.correo },
          });
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

    btnSend.current.disabled = false;
    btnBack.current.style.pointerEvents = "auto";
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
        <a href="/" ref={btnBack}>
          <KeyboardReturnOutlined></KeyboardReturnOutlined>
        </a>
        <br />
        <br />
        <h4 className="text-center">Enviar codigo de recuperacion</h4>
        <Form ref={resetForm} className="mt-4" onSubmit={resetHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              onChange={handleChange}
              name="correo"
              type="email"
              placeholder="Correo"
              required
            />
          </Form.Group>

          <Button
            ref={btnSend}
            className="mx-auto d-block"
            type="submit"
            variant="primary"
          >
            Enviar codigo
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPasswordView;
