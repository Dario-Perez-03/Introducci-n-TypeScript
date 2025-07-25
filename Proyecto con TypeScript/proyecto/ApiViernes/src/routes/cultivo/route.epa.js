import { Router } from 'express';
import { verificarToken } from '../../middlewares/authentication.js';
import {
    listarEpas,
    buscarEpaPorId,
    registrarEpa,
    actualizarEpa,
    eliminarEpa,
    buscarPorNombreTipoEpa,
    buscarNombreEspecifico
} from '../../controllers/cultivo/controller.epa.js';


const router = Router();
router.get('/listar',listarEpas);
router.get('/buscar/:id_epa_pk', buscarEpaPorId);
router.post('/registrar', registrarEpa);
router.put('/actualizar/:id_epa_pk', actualizarEpa);
router.delete('/eliminar/:id_epa_pk', eliminarEpa);
router.get('/tipo/:nombreTipoepa', buscarPorNombreTipoEpa);
router.get('/tipo/:nombreTipoepa/epa/:nombreEspecifico', buscarNombreEspecifico);

router.get('/verificarToken', verificarToken);

export default router;
