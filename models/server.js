const express = require('express')
const cors = require('cors')


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT


        // *****************************************Middlewares*****************************************
        this.middlewares()

        
        // ************************************Rutas de la aplicacion************************************
        this.routes()
    }

    middlewares() {
        //******************************************** CORS********************************************
        this.app.use(cors())

        // ***************************************Parseo del body***************************************
        this.app.use( express.json() )

        //************************************** Directorio publico**************************************
        this.app.use( express.static('public') )

    }


    routes() {

        this.app.use('/api/usuarios', require('../routes/users'))
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`)
        })
    }

}


module.exports = Server


