const { response } = require("express")

 const usuariosGet = (req, res = response) => {
    res.json({
        ok: true,
        msg: "get API"
    })
}


const updateUser = (req, res) => {

    const id = req.params.id

    res.status(201).json({
        ok: true,
        msg: "put API",
        id
    })
}

const addNewUser = (req, res) => {

    const body = req.body

    res.json({
        ok: true,
        msg: "post API",
        body
    })
}

const deleteUser = (req, res) => {
    res.json({
        ok: true,
        msg: "delete API"
    })
}


module.exports = {
    usuariosGet,
    updateUser,
    addNewUser,
    deleteUser
}

