const { response } = require("express")
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario")





 const usuariosGet = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query

    // const usuarios = await Usuario.find({estado: true})
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments({estado: true})

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        ok: true,
        // resp
        total,
        usuarios
    })
}



const updateUser = async (req, res = response) => {

    const {id} = req.params
    const {_id, contrasena, google, ...rest} = req.body

    // Validar BD
    if (contrasena) {
        const salt = bcrypt.genSaltSync()
        rest.contrasena = bcrypt.hashSync(contrasena, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest)

    res.status(201).json({
        ok: true,
        usuario
    })
}




const addNewUser = async (req, res = response) => {

    const {nombre, correo, contrasena, rol} = req.body
    const usuario = new Usuario({nombre, correo, contrasena, rol})
    
    // verificar si existe el mail
    

    // encriptar contrasena
    const salt = bcrypt.genSaltSync()
    usuario.contrasena = bcrypt.hashSync(contrasena, salt)

    // guardar en db
    await usuario.save()

    res.json({
        ok: true,
        usuario
    })
}



const deleteUser = async (req, res) => {

    const {id} = req.params

    const usuarioLoged = req.usuario

    // Eliminar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id)

    // eliminacion por campo
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({
        ok: true,
        usuario,
        usuarioLoged
    })
}


module.exports = {
    usuariosGet,
    updateUser,
    addNewUser,
    deleteUser
}

