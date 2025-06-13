import { Router } from "express";
import { verificarToken } from '../../middlewares/authentication.js';
import {
    listarCultivos,
    buscarCultivoPorId,
    registrarCultivo,
    actualizarCultivo,
    eliminarCultivo,
    historialCultivoCompleto
} from '../../controllers/cultivo/controller.cultivo.js';

const router = Router();

router.get('/listar', verificarToken, listarCultivos);
router.get('/buscar/:id_cultivo_pk', verificarToken, buscarCultivoPorId);
router.post('/registrar', verificarToken, registrarCultivo);
router.put('/actualizar/:id_cultivo_pk', verificarToken, actualizarCultivo);
router.delete('/eliminar/:id_cultivo_pk', verificarToken, eliminarCultivo);
router.get('/historial/:id_cultivo', verificarToken, historialCultivoCompleto);

export default router;
