import { useContext, useEffect } from "react";
import SidebarComponent from "../components/SidebarComponent";
import { Outlet, useNavigate } from "react-router";
import { MyContext } from "../context/Context";

function MainView() {
  const navigate = useNavigate();
  const { setSelectedOption, setReqFilter } = useContext(MyContext);

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }
  useEffect(() => {
    setSelectedOption("Publicaciones");
    setReqFilter("Todos");
  }, []);

  return (
    <div className="p-3 d-flex align-items-center justify-content-between bg-white">
      <SidebarComponent></SidebarComponent>
      <Outlet></Outlet>
    </div>
  );
}

export default MainView;
