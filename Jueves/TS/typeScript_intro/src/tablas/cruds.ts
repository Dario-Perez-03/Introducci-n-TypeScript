//epas
export function TablaEPAs(datos: any[]) {
    console.log("Ejecutando renderizarTablaEPAs con datos:", datos);
    const contenedor = document.getElementById("tabla-epa")!;
    contenedor.innerHTML = ""; 

    const tabla = document.createElement("table");
    tabla.className = "tabla-epa";

    const thead = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>ID Tipo</th>
                <th>ID Cultivo</th>
            </tr>
        </thead>
    `;
    const tbody = datos.map(epa => `
        <tr>
            <td>${epa.id_epa_pk}</td>
            <td>${epa.nombre_epa}</td>
            <td>${epa.estado_epa}</td>
            <td>${epa.id_tipo_epa_fk}</td>
            <td>${epa.id_cultivo_fk}</td>
        </tr>
    `).join("");

    tabla.innerHTML = thead + `<tbody>${tbody}</tbody>`;
    contenedor.appendChild(tabla);
}

//tipos espas
export function TablaTiposEPA(datos: any[]) {
  console.log("Datos tipos EPA:", datos);

  const contenedor = document.getElementById("tabla-tipoepa");
  if (!contenedor) {
    console.error("No se encontró el contenedor tabla-tipoepa");
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

