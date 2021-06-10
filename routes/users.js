const { Router } = require('express')
const { check } = require('express-validator')

const { esRolValido, emailExiste, existeUsuarioId } = require('../helpers/db-validators')

const { usuariosGet, updateUser, addNewUser, deleteUser } = require('../controllers/users')

// const { validarCampos } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt')
// const { esAdminRol, tieneRol } = require('../middlewares/validar-roles')
const { validarCampos, validarJWT, esAdminRol, tieneRol } = require('../middlewares')

 
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
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
], deleteUser)
 


module.exports = router