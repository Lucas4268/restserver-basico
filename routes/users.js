const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, updateUser, addNewUser, deleteUser } = require('../controllers/users')
const { esRolValido, emailExiste, existeUsuarioId } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.get('/', usuariosGet)



router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    check('rol').custom(esRolValido),
    validarCampos
], updateUser)



router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contrasena', 'La contrasena es obligatoria y mayor a 6').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], addNewUser)



router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
], deleteUser)
 


module.exports = router