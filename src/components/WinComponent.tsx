import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { MyContext } from "../context/Context";
import { UpdateRequirement } from "../services/RequirementService";
import { useNavigate } from "react-router";

function WinComponent(props: any) {
  //const { reqFilter, setReqFilter } = useContext(MyContext);
  const navigate = useNavigate();

  const escogerCotizacionHandler = async (e: any) => {
    await UpdateRequirement(props.idRequerimiento, {
      estado: "Terminado",
      id_usuario_ganador: props.idUsuarioPostulante,
    });
    navigate("/main/posts");
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Detalle de seleccion</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center">
          <p className="m-0">
            Al seleccionar esta cotizacion, el requerimiento se dará por concluido y el
            proveedor sera notificado sobre la adjudicación de la buena pro.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={escogerCotizacionHandler}>Aprobar cotización</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WinComponent;
