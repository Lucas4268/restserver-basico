const jtw = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }


    try {

        const {uid} = jtw.verify(token, process.env.SECRET_KEY)

        // leer el usuario logueado
        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            if (!usuario.estado) {
                return res.status(401).json({
                    ok: false,
                    msg: 'Token no valido - usuario no existente'
                })
            }
        }

        
        // verificar si uid tiene estado true
        if (!usuario.estado) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido'
            })
        }


        req.usuario = usuario

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }    
}




module.exports = {
    validarJWT
}
