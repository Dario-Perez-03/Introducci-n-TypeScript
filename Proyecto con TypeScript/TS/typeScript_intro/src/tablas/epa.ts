import axios from "axios";

export function epa() {
  document.getElementById("epa-botones")!.innerHTML = `
  <button id="btn-listar-epa">Listar EPAs</button>
  <button id="btn-buscar-epa">Buscar por ID</button>
  <button id="btn-registrar-epa">Registrar</button>
  <button id="btn-actualizar-epa">Actualizar</button>
  <button id="btn-eliminar-epa">Eliminar</button>
`;


document.getElementById("btn-listar-epa")!.addEventListener("click", listarEPA);
document.getElementById("btn-buscar-epa")!.addEventListener("click", mostrarBuscarFormEPA);
document.getElementById("btn-registrar-epa")!.addEventListener("click", mostrarRegistrarFormEPA);
document.getElementById("btn-actualizar-epa")!.addEventListener("click", mostrarActualizarFormEPA);
document.getElementById("btn-eliminar-epa")!.addEventListener("click", mostrarEliminarFormEPA);
}
function tablaEPA(datos: any[]) {
  const contenedor = document.getElementById("tabla-epa");
  if (!contenedor) {
    console.error("No se encontró el contenedor para la tabla de EPAs");
    return;
  }

  contenedor.innerHTML = "";

  const tabla = document.createElement("table");
  tabla.className = "tabla-epa";

  const thead = `
    <thead>
      <tr>
        <th>ID</th>
        <th>ID Cultivo</th>
        <th>Estado EPA</th>
        <th>ID Tipo EPA</th>
        <th>Nombre Tipo EPA</th>
        <th>Nombre EPA</th>
        <th>Descripcion</th>
      </tr>
    </thead>
  `;

  const tbody = datos.map((epa: any) => `
    <tr>
      <td>${epa.id_epa_pk}</td>
      <td>${epa.id_cultivo_fk}</td>
      <td>${epa.estado_epa}</td>
      <td>${epa.id_tipo_epa_fk}</td>
      <td>${epa.nombre_tipo_epa}</td>
      <td>${epa.nombre_epa}</td>
      <td>${epa.descripcion_epa}</td>
    </tr>
  `).join("");

  tabla.innerHTML = thead + `<tbody>${tbody}</tbody>`;
  contenedor.appendChild(tabla);
}

function listarEPA() {
  limpiarVistas();
  axios.get("http://localhost:3000/epa/listar")
    .then(res => tablaEPA(res.data.data ?? res.data))
    .catch(err => mostrarError(err));
}

function mostrarBuscarFormEPA() {
  limpiarVistas();
  document.getElementById("formulario-epa")!.innerHTML = `
    <input type="number" id="epa-buscar-id" placeholder="ID a buscar" />
    <button id="btn-ejecutar-buscar-epa">Buscar</button>
  `;

  document.getElementById("btn-ejecutar-buscar-epa")!.addEventListener("click", () => {
    const id = (document.getElementById("epa-buscar-id") as HTMLInputElement).value;
  axios.get(`http://localhost:3000/epa/buscar/${id}`)
  .then(res => mostrarResultadoEPA(res.data.data ?? res.data))
  .catch(err => mostrarError(err));
  });
}

function mostrarRegistrarFormEPA() {
  limpiarVistas();
 document.getElementById("formulario-epa")!.innerHTML = `
  <input type="number" id="id_cultivo_fk" placeholder="ID Cultivo" />
<select id="estado_epa">
  <option value="">-- Selecciona tipo --</option>
  <option value="presente">Presente</option>
  <option value="ausente">Ausente</option>
</select>
  <input type="number" id="id_tipo_epa_fk" placeholder="ID Tipo EPA" />
  <input type="text" id="nombre_epa" placeholder="Nombre EPA" />
  <input type="text" id="descripcion_epa" placeholder="Descripción EPA" />
  <button id="btn-ejecutar-registrar-epa">Registrar</button>
`;

document.getElementById("btn-ejecutar-registrar-epa")!.addEventListener("click", () => {
  const id_cultivo_fk = (document.getElementById("id_cultivo_fk") as HTMLInputElement).value;
  const estado_epa = (document.getElementById("estado_epa") as HTMLInputElement).value;
  const id_tipo_epa_fk = (document.getElementById("id_tipo_epa_fk") as HTMLInputElement).value;
  const nombre_epa = (document.getElementById("nombre_epa") as HTMLInputElement).value;
  const descripcion_epa = (document.getElementById("descripcion_epa") as HTMLInputElement).value;

  axios.post("http://localhost:3000/epa/registrar", {
    id_cultivo_fk,
    estado_epa,
    id_tipo_epa_fk,
    nombre_epa,
    descripcion_epa
  })
    .then(() => mostrarResultadoEPA("Registrado correctamente"))
    .catch(err => mostrarError(err));
});
}

function mostrarActualizarFormEPA() {
  limpiarVistas();
  document.getElementById("formulario-epa")!.innerHTML = `
    <input type="number" id="id_epa" placeholder="ID a actualizar" />
    <input type="number" id="id_cultivo_fk" placeholder="Nuevo ID Cultivo" />
    
    <select id="estado_epa">
      <option value="">-- Selecciona estado --</option>
      <option value="presente">Presente</option>
      <option value="ausente">Ausente</option>
    </select>
    
    <input type="number" id="id_tipo_epa_fk" placeholder="Nuevo ID Tipo EPA" />
    <input type="text" id="nombre_epa" placeholder="Nuevo nombre EPA" />
    <input type="text" id="descripcion_epa" placeholder="Nueva descripción" />
    
    <button id="btn-ejecutar-actualizar-epa">Actualizar</button>
  `;

  document.getElementById("btn-ejecutar-actualizar-epa")!.addEventListener("click", () => {
    const id = (document.getElementById("id_epa") as HTMLInputElement).value;
    const id_cultivo_fk = (document.getElementById("id_cultivo_fk") as HTMLInputElement).value;
    const estado_epa = (document.getElementById("estado_epa") as HTMLSelectElement).value;
    const id_tipo_epa_fk = (document.getElementById("id_tipo_epa_fk") as HTMLInputElement).value;
    const nombre_epa = (document.getElementById("nombre_epa") as HTMLInputElement).value;
    const descripcion_epa = (document.getElementById("descripcion_epa") as HTMLInputElement).value;

    axios.put(`http://localhost:3000/epa/actualizar/${id}`, {
      id_cultivo_fk,
      estado_epa,
      id_tipo_epa_fk,
      nombre_epa,
      descripcion_epa
    })
    .then(() => mostrarResultadoEPA("Actualizado correctamente"))
    .catch(err => mostrarError(err));
  });
}


function mostrarEliminarFormEPA() {
  limpiarVistas();
  document.getElementById("formulario-epa")!.innerHTML = `
    <input type="number" id="id_eliminar" placeholder="ID a eliminar" />
    <button id="btn-ejecutar-eliminar-epa">Eliminar</button>
  `;

  document.getElementById("btn-ejecutar-eliminar-epa")!.addEventListener("click", () => {
    const id = (document.getElementById("id_eliminar") as HTMLInputElement).value;

    axios.delete(`http://localhost:3000/epa/eliminar/${id}`)
      .then(() => mostrarResultadoEPA("Eliminado correctamente"))
      .catch(err => mostrarError(err));
  });
}

function mostrarResultadoEPA(mensaje: string | object) {
  const contenedor = document.getElementById("resultado-epa")!;

  if (typeof mensaje === "string") {
    contenedor.innerHTML = `
      <div style="background:#2a2a2a;padding:1rem;border-radius:10px;border:1px solid #444;margin-top:1rem;color:#9ae3b6">
        <strong>${mensaje}</strong>
      </div>
    `;
  } else if (typeof mensaje === "object" && mensaje !== null) {
    const {
      id_epa_pk,
      id_cultivo_fk,
      estado_epa,
      id_tipo_epa_fk,
      nombre_tipo_epa,
      nombre_epa,
      descripcion_epa
    } = mensaje as any;

    contenedor.innerHTML = `
      <div style="background:#1e1e1e;padding:1rem;border-radius:10px;border:1px solid #444;margin-top:1rem">
        <h3 style="color:#00bcd4;">EPA Encontrado</h3>
        <p><strong>ID:</strong> ${id_epa_pk}</p>
        <p><strong>ID Cultivo:</strong> ${id_cultivo_fk}</p>
        <p><strong>Estado:</strong> ${estado_epa}</p>
        <p><strong>ID Tipo EPA:</strong> ${id_tipo_epa_fk}</p>
        <p><strong>Nombre del Tipo EPA:</strong> ${nombre_tipo_epa}</p>
        <p><strong>Nombre EPA:</strong> ${nombre_epa}</p>
        <p><strong>Descripción:</strong> ${descripcion_epa}</p>
      </div>
    `;
  } else {
    contenedor.innerHTML = `<p style="color:gray;">Sin datos para mostrar.</p>`;
  }
}


function mostrarError(err: any) {
  document.getElementById("resultado-epa")!.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
}

function limpiarVistas() {
  const tablaDiv = document.getElementById("tabla-epa");
  const formDiv = document.getElementById("formulario-epa");
  const resultDiv = document.getElementById("resultado-epa");

  if (tablaDiv) tablaDiv.innerHTML = "";
  if (formDiv) formDiv.innerHTML = "";
  if (resultDiv) resultDiv.innerHTML = "";
}
