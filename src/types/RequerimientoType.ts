export interface RequerimientoType {
  id_requerimiento: number;
  nombre: String;
  fecha_publicacion: String;
  fecha_fin: String;
  detalle: String;
  costo: String;
  tipo: String;
  estado: String;
  ya_postulo: boolean;
  id_usuario_ganador: number;
}
