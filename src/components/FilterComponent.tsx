import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { MyContext } from "../context/Context";

function FilterComponent(props: any) {
  const { reqFilter, setReqFilter } = useContext(MyContext);

  const filterChange = (e: any) => {
    setReqFilter(e.target.value);
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
          <h4>Filtros de publicaciones</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center">
          <Form.Label className="h5">Tipos de publicacion: </Form.Label>
          <Form.Select
            className="mx-3 w-25"
            value={reqFilter}
            onChange={filterChange}
          >
            <option>Todos</option>
            <option>Servicios</option>
            <option>Bienes</option>
          </Form.Select>
        </div>        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Listo</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FilterComponent;
