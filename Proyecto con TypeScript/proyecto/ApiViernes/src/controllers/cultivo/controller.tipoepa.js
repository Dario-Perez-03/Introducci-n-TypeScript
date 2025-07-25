import { pool } from '../../database/conexion.js';

export const listarTiposEpa = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tipos_epas');
        if (result.rows.length > 0) {
            res.status(200).json({ 
                message: 'Se listó los tipos de EPA', 
                status: 200, 
                data: result.rows
            });
        } else {
            res.status(404).json({ 
                message: 'No se encontraron tipos de EPA registrados', 
                status: 404 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al listar tipos de EPA: ' + error.message, 
            status: 500 
        });
    }
};


export const buscarTipoEpaPorId = async (req, res) => {
    try {
        const id_tipo_epa_pk = req.params.id_tipo_epa_pk;
        const result = await pool.query('SELECT * FROM tipos_epas WHERE id_tipo_epa_pk = $1', [id_tipo_epa_pk]);

        if (result.rows.length > 0) {
            res.status(200).json({ 
                message: 'Se buscó el tipo de EPA', 
                status: 200, 
                data: result.rows[0]
            });
        } else {
            res.status(404).json({ 
                message: 'No se encontró el tipo de EPA con el ID proporcionado', 
                status: 404 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al buscar tipo de EPA por ID: ' + error.message, 
            status: 500 
        });
    }
};


export const registrarTipoEpa = async (req, res) => {
    try {
        
        const { nombre_tipo_epa, descripcion } = req.body;

        const result = await pool.query(
            'INSERT INTO tipos_epas (nombre_tipo_epa, descripcion) VALUES ($1, $2) RETURNING *',
            [nombre_tipo_epa, descripcion]
        );

        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Se registró el tipo de EPA', status: 200 });
        } else {
            res.status(400).json({ message: 'No se pudo registrar el tipo de EPA', status: 400 });
        }
    } catch (error) {
    res.status(500).json({ message: 'Error al registrar tipo de EPA: ' + error.message, status: 500 });
}
};

export const actualizarTipoEpa = async (req, res) => {
    try {

        const id_tipo_epa_pk = req.params.id_tipo_epa_pk;
        const { nombre_tipo_epa, descripcion } = req.body;

        const result = await pool.query(
            'UPDATE tipos_epas SET nombre_tipo_epa = $1, descripcion = $2 WHERE id_tipo_epa_pk = $3 RETURNING *',
            [nombre_tipo_epa, descripcion, id_tipo_epa_pk]
        );

        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Tipo de EPA actualizado con éxito', status: 200 });
        } else {
            res.status(404).json({ message: 'No se encontró el tipo de EPA para actualizar', status: 404 });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tipo de EPA: ' + error.message, status: 500 });
    }
};

export const eliminarTipoEpa = async (req, res) => {
  try {
    const { id_tipo_epa_pk } = req.params;

    const existe = await pool.query(
      "SELECT 1 FROM tipos_epas WHERE id_tipo_epa_pk = $1",
      [id_tipo_epa_pk]
    );

    if (existe.rowCount === 0) {
      return res.status(404).json({ message: "Tipo de EPA no encontrado" });
    }

    const result = await pool.query(
      "DELETE FROM tipos_epas WHERE id_tipo_epa_pk = $1",
      [id_tipo_epa_pk]
    );

    res.status(200).json({ message: "Tipo de EPA eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar tipo de EPA: " + error.message,
    });
  }
};
