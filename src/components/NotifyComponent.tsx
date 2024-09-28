interface NotifyComponentProp {
  title: String;
  description: String;
  date: String;
  type: "Req_created" | "Win";
}
export function NotifyComponent({
  title,
  description,
  date,
  type,
}: NotifyComponentProp) {
  return (
    <div className="alert alert-info mt-4 w-75 mx-auto">
      <div className="card-body d-flex align-items-center justify-content-between">
        <h5 className="card-title text-center">{title}</h5>
        {type == "Req_created" ? (
          <p className="bg-success text-white p-1 small rounded">
            Nuevo requerimiento creado
          </p>
        ) : (
          <p className="p-0 m-0 bg-warning text-white p-1 small rounded">
            Ha sido seleccionado para este requerimiento
          </p>
        )}
      </div>
      <hr />
      <div className="position-relative">
        <p className="card-text">{description}</p>
        <span className="position-absolute bottom-0 end-0">{date}</span>
      </div>
    </div>
  );
}
