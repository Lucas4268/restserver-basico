const { response } = require("express");
const bcrypt = require('bcryptjs')

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");


const login = async (req, res = response) => {

    const {correo, contrasena} = req.body

    try {

        const usuario = await Usuario.findOne({correo})

        // verificar existencia de correo
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'EL usuario o contrasena no son correctos'
            })
        }

        // verificar si usuario esta activo en bdd
        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                msg: 'EL usuario o contrasena no son correctos - estado: false'
            })
        }

        // verificar password
        const validContrasena = bcrypt.compareSync( contrasena, usuario.contrasena )
        if (!validContrasena) {
            return res.status(400).json({
                ok: false,
                msg: 'EL usuario o contrasena no son correctos - password incorrecta'
            })
        }

        // generar JWT
        const token = await generarJWT( usuario.id )


        res.json({
            ok: true,
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mgs: 'Hable con el administrador'
        })
    } 

}



module.exports = {
    login
}

