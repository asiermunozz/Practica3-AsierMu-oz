import type { Request, Response } from "express";
import { ObjectId, type Collection } from "mongodb";
import type { Tebeo, ErrorAPI } from "../model/tebeo.model.js"; // Asegúrate de enlazar bien la ruta

let coleccion: Collection<Tebeo>;

export const configCollection = (col: Collection<Tebeo>) => {
    coleccion = col;
}

export const getTebeos = (req: Request, res: Response) => {
    coleccion.find().toArray().then((datos) => {
        res.json(datos);
    }).catch(() => {
        res.status(500).json({ message: "Error al buscar todos" });
    });
}

export const getTebeoId = (req: Request, res: Response) => {
    const id = String(req.params.id);
    
    if(!ObjectId.isValid(id)){
        res.status(400).json({ message: "ID no válido" });
        return;
    }

    coleccion.findOne({ _id: new ObjectId(id) }).then((resultado) => {
        if(!resultado){
            res.status(404).json({ message: "No encontrado" });
            return;
        }
        res.json(resultado);
    }).catch(() => {
        res.status(500).json({ error: "Error en la búsqueda" }as ErrorAPI);
    });
}

export const createTebeo = (req: Request, res: Response) => {
    const newTebeo: Tebeo = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    };

    coleccion.insertOne(newTebeo).then((resultado) => {
        res.status(201).json({
            _id: resultado.insertedId,
            ...newTebeo
        });
    }).catch(() => {
        res.status(500).json({ message: "Error al crear" });
    });
}

export const deleteTebeo = (req: Request, res: Response) => {
    const id = String(req.params.id);

    if(!ObjectId.isValid(id)){
        res.status(400).json({ message: "ID no válido" });
        return;
    }

    coleccion.deleteOne({ _id: new ObjectId(id) }).then((resultado) => {
        if(resultado.deletedCount === 0){
            res.status(404).json({ message: "No se encontró para eliminar" });
            return;
        }
        res.json({ message: "Eliminado correctamente" });
    }).catch(() => {
        res.status(500).json({ message: "Error al eliminar" });
    });
}

export const putTebeo = (req: Request, res: Response) => {
    const id = String(req.params.id);

    if(!ObjectId.isValid(id)){
        res.status(400).json({ message: "ID no válido" });
        return;
    }

    const newTebeo: Tebeo = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    };

    coleccion.replaceOne({ _id: new ObjectId(id) }, newTebeo).then((resultado) => {
        if(resultado.matchedCount === 0){
            res.status(404).json({ message: "No se encontró para actualizar" });
            return;
        }
        res.json({
            _id: new ObjectId(id),
            ...newTebeo
        });
    }).catch(() => {
        res.status(500).json({ message: "Error al actualizar" });
    });
}