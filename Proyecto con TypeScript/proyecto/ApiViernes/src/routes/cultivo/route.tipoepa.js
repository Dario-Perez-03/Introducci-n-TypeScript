import { Router } from "express";
import { verificarToken } from '../../middlewares/authentication.js';
import {
    listarTiposEpa,
    buscarTipoEpaPorId,
    registrarTipoEpa,
    actualizarTipoEpa,
    eliminarTipoEpa
} from '../../controllers/cultivo/controller.tipoepa.js';

const router = Router();
router.get('/listar', listarTiposEpa);
router.get('/buscar/:id_tipo_epa_pk',buscarTipoEpaPorId);
router.post('/registrar',registrarTipoEpa);
router.put('/actualizar/:id_tipo_epa_pk',actualizarTipoEpa);
router.delete('/eliminar/:id_tipo_epa_pk', eliminarTipoEpa);

router.get('/verificarToken', verificarToken);

export default router;  