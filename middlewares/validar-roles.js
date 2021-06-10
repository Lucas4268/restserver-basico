


const esAdminRol = (req, res, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'no se verifico token'
        })
    }

    const { rol, nombre } = req.usuario

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            ok: false,
            msg: `El usuario ${nombre} no tiene permisos`
        })
    }

    next()
}



const tieneRol = (...rest) => {
    return (req, res, next) => {
        
        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                msg: 'no se verifico token'
            })
        }

        if (!rest.includes(req.usuario.rol)) {
            return res.status(401).json({
                ok: false,
                msg: `El servicio requiere uno de los siguientes roles: ${rest}`
            })
        }

        next()
    }

}



module.exports = {
    esAdminRol,
    tieneRol
}