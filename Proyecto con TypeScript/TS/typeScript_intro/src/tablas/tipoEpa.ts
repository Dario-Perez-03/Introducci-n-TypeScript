import axios from "axios";

export function tipoEPA() {
    const botones = document.getElementById("tipoepa-botones");
    if (!botones) return;

    botones.innerHTML = `
    <button id="btn-listar">Listar Tipos</button>
    <button id="btn-buscar">Buscar por ID</button>
    <button id="btn-registrar">Registrar</button>
    <button id="btn-actualizar">Actualizar</button>
    <button id="btn-eliminar">Eliminar</button>
  `;

    document.getElementById("btn-listar")!.addEventListener("click", listar);
    document.getElementById("btn-buscar")!.addEventListener("click", mostrarBuscarForm);
    document.getElementById("btn-registrar")!.addEventListener("click", mostrarRegistrarForm);
    document.getElementById("btn-actualizar")!.addEventListener("click", mostrarActualizarForm);
    document.getElementById("btn-eliminar")!.addEventListener("click", mostrarEliminarForm);
}


export function tablaTiposEPA(datos: any[]) {
    const contenedor = document.getElementById("tabla-tipoepa");
    if (!contenedor) {
        console.error("No se encontró el contenedor para la tabla de tipos EPA");
        return;
    }

    contenedor.innerHTML = "";

    const tabla = document.createElement("table");
    tabla.className = "tabla-epa";

    const thead = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripción</th>
      </tr>
    </thead>
  `;

    const tbody = datos.map((tipo: any) => `
    <tr>
      <td>${tipo.id_tipo_epa_pk}</td>
      <td>${tipo.nombre_tipo_epa}</td>
      <td>${tipo.descripcion}</td>
    </tr>
  `).join("");

    tabla.innerHTML = thead + `<tbody>${tbody}</tbody>`;
    contenedor.appendChild(tabla);
}

function listar() {
    axios.get("http://localhost:3000/tipoepa/listar")
        .then(response => {
            const formDiv = document.getElementById("formulario");
            const resultDiv = document.getElementById("resultado");
            if (formDiv) formDiv.innerHTML = "";
            if (resultDiv) resultDiv.innerHTML = "";

            tablaTiposEPA(response.data.data ?? response.data);
        })
        .catch(err => mostrarError(err));
}

function mostrarBuscarForm() {
    const tablaDiv = document.getElementById("tabla-tipoepa");
    const resultDiv = document.getElementById("resultado");
    if (tablaDiv) tablaDiv.innerHTML = "";
    if (resultDiv) resultDiv.innerHTML = "";
    const form = `
    <input type="number" id="buscar-id" placeholder="ID a buscar" />
    <button id="btn-ejecutar-buscar">Buscar</button>
  `;
    document.getElementById("formulario")!.innerHTML = form;

    document.getElementById("btn-ejecutar-buscar")!.addEventListener("click", () => {
        const id = (document.getElementById("buscar-id") as HTMLInputElement).value;
        axios.get(`http://localhost:3000/tipoepa/buscar/${id}`)
            .then(res => mostrarResultado(res.data.data ?? res.data))
            .catch(err => mostrarError(err));
    });
}

function mostrarRegistrarForm() {
    const tablaDiv = document.getElementById("tabla-tipoepa");
    const resultDiv = document.getElementById("resultado");
    if (tablaDiv) tablaDiv.innerHTML = "";
    if (resultDiv) resultDiv.innerHTML = "";
    const form = `
    <label for="nombre">Tipo EPA:</label>
    <select id="nombre">
      <option value="enfermedad">Enfermedad</option>
      <option value="plaga">Plaga</option>
      <option value="arvense">Arvense</option>
    </select>
    <input type="text" id="descripcion" placeholder="Descripción" />
    <button id="btn-ejecutar-registrar">Registrar</button>
  `;
    document.getElementById("formulario")!.innerHTML = form;

    document.getElementById("btn-ejecutar-registrar")!.addEventListener("click", () => {
        const nombre = (document.getElementById("nombre") as HTMLSelectElement).value;
        const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;

        axios.post("http://localhost:3000/tipoepa/registrar", {
            nombre_tipo_epa: nombre,
            descripcion
        })
            .then(res => mostrarResultado("Registrado correctamente"))
            .catch(err => mostrarError(err));
    });
}


function mostrarActualizarForm() {
    const tablaDiv = document.getElementById("tabla-tipoepa");
    const resultDiv = document.getElementById("resultado");
    if (tablaDiv) tablaDiv.innerHTML = "";
    if (resultDiv) resultDiv.innerHTML = "";
    const form = `
    <input type="number" id="id" placeholder="ID a actualizar" />
    <select id="nombre">
  <option value="">-- Selecciona tipo --</option>
  <option value="enfermedad">Enfermedad</option>
  <option value="plaga">Plaga</option>
  <option value="arvense">Arvense</option>
</select>
    <input type="text" id="descripcion" placeholder="Nueva Descripción" />
    <button id="btn-ejecutar-actualizar">Actualizar</button>
  `;
    document.getElementById("formulario")!.innerHTML = form;

    document.getElementById("btn-ejecutar-actualizar")!.addEventListener("click", () => {
        const id = (document.getElementById("id") as HTMLInputElement).value;
        const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
        const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
        axios.put(`http://localhost:3000/tipoepa/actualizar/${id}`, {
            nombre_tipo_epa: nombre,
            descripcion
        })
            .then(res => mostrarResultado("Actualizado correctamente"))
            .catch(err => mostrarError(err));
    });
}

function mostrarEliminarForm() {
    const tablaDiv = document.getElementById("tabla-tipoepa");
    const resultDiv = document.getElementById("resultado");
    if (tablaDiv) tablaDiv.innerHTML = "";
    if (resultDiv) resultDiv.innerHTML = "";
    const form = `
    <input type="number" id="eliminar-id" placeholder="ID a eliminar" />
    <button id="btn-ejecutar-eliminar">Eliminar</button>
  `;
    document.getElementById("formulario")!.innerHTML = form;

    document.getElementById("btn-ejecutar-eliminar")!.addEventListener("click", () => {
        const id = (document.getElementById("eliminar-id") as HTMLInputElement).value;
        axios.delete(`http://localhost:3000/tipoepa/eliminar/${id}`)
            .then(res => mostrarResultado("Eliminado correctamente"))
            .catch(err => mostrarError(err));
    });
}

function mostrarResultado(mensaje: string | object) {
    const contenedor = document.getElementById("resultado")!;
    if (typeof mensaje === "string") {
        contenedor.innerHTML = `
      <div style="background:#2a2a2a;padding:1rem;border-radius:10px;border:1px solid #444;margin-top:1rem;color:#9ae3b6">
        <strong>${mensaje}</strong>
      </div>
    `;
    } else if (typeof mensaje === "object" && mensaje !== null) {
        const { id_tipo_epa_pk, nombre_tipo_epa, descripcion } = mensaje as any;
        contenedor.innerHTML = `
      <div style="background:#1e1e1e;padding:1rem;border-radius:10px;border:1px solid #444;margin-top:1rem">
        <h3 style="color:#00bcd4;">Tipo EPA Encontrado</h3>
        <p><strong>ID:</strong> ${id_tipo_epa_pk}</p>
        <p><strong>Nombre:</strong> ${nombre_tipo_epa}</p>
        <p><strong>Descripción:</strong> ${descripcion}</p>
      </div>
    `;
    } else {
        contenedor.innerHTML = `<p style="color:gray;">Sin datos para mostrar.</p>`;
    }
}


function mostrarError(err: any) {
    document.getElementById("resultado")!.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
}
