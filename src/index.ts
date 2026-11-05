import express from 'express'; 
import { conectarAlMongo } from './config/tebeo.config.js';
import { configCollection } from './controllers/tebeo.controllers.js';
import type { Collection } from 'mongodb';
import type { Tebeo } from './model/tebeo.model.js'
import router from './routes/tebeo.routes.js';

const app = express();
app.use(express.json());

const startServer = () => {
    conectarAlMongo().then((db) => {
        const coleccion: Collection<Tebeo> = db.collection("tebeos_db");
        
        configCollection(coleccion);
        
        app.use("/tebeos", router); 
        
        const PORT = 6969;
        app.listen(PORT, () => {
            console.log(`API escuchando en el puerto ${PORT}`);
        }); 
    }).catch(() => {
        console.log("Fallo crítico: No se ha podido iniciar el servidor");
    });
}

startServer();