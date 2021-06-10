const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        // **************************************Coneccion a BDD**************************************
        this.conectarDB()
        

        // *****************************************Middlewares*****************************************
        this.middlewares()

        
        // ************************************Rutas de la aplicacion************************************
        this.routes()
    }


    async conectarDB() {
        await dbConnection()
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

        this.app.use('/api/auth', require('../routes/auth'))
        
        this.app.use('/api/usuarios', require('../routes/users'))
        
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`)
        })
    }

}


module.exports = Server


