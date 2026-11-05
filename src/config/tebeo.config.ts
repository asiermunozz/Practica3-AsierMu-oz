import { Db, MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://asiprivi_db_user:jmLRp68V03L3zbMZ@cluster0.unkkypz.mongodb.net/");

export const conectarAlMongo = (): Promise<Db> => {
    return client.connect().then(() => {
        console.log("Conectado a Mongo con éxito");
        return client.db("tebeos_db");
    }).catch((error) => {
        console.log("Error de conexión");
        throw error;
    });
}