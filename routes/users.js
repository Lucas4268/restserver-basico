const { Router } = require('express')
const { usuariosGet, updateUser, addNewUser, deleteUser } = require('../controllers/users')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', updateUser)

router.post('/', addNewUser)

router.delete('/', deleteUser)



module.exports = router