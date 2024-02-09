const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteTelefono, existePerroById } = require('../helpers/db-validators');

const { perrosPost, perrosGet, getPerrosByid, perrosPut, perrosDelete } = require('../controllers/perros.controller');

const router = Router();

router.get("/", perrosGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existePerroById),
        validarCampos
    ], getPerrosByid);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existePerroById),
        validarCampos
    ], perrosPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existePerroById),
        validarCampos
    ], perrosDelete);


router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("especie", "La espiece es obligatorio").not().isEmpty(),
        check("dueño", "El nombre del dueño es obligatorio").not().isEmpty(),
        check("telefono_dueño", "El teléfono del dueño es obligatorio").not().isEmpty(),
        check("telefono_dueño").custom(existenteTelefono),
        validarCampos,
    ], perrosPost);

module.exports = router;