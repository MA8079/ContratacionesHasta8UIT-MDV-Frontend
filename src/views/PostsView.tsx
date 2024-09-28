import PostsComponent from "../components/PostsComponent";
import { Filter1Rounded } from "@mui/icons-material";
import FilterComponent from "../components/FilterComponent";
import { useState } from "react";
function PostsView() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="h-100 flex-grow-1 align-self-start mx-3 p-4 mt-4 bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <h4>Publicaciones</h4>
          <div
            role="button"
            onClick={() => setModalShow(true)}
            className="container-filter p-2 rounded d-flex align-items-center"
          >
            <Filter1Rounded></Filter1Rounded>
            <h6 className="my-0 mx-2">Filtros</h6>
          </div>
        </div>
        <PostsComponent></PostsComponent>
      </div>
      <FilterComponent
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></FilterComponent>
    </>
  );
}

export default PostsView;
