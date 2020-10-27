const db = require("../models");
const Mesa = db.Mesas;
const Reserva = db.Reservas;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
// Validate request
    if (!req.body.restauranteId) {
        res.status(400).send({
            message: "Debe enviar un restaurante valido!"
        });
        return;
    }
// crea una venta
    const mesa = {
        nombre: req.body.nombre,
        posx: req.body.posx,
        posy: req.body.posy,
        planta: req.body.planta,
        capacidad:req.body.capacidad,
        restauranteId: req.body.restauranteId,
        RestauranteId: req.body.restauranteId
    };

// Guardamos a la base de datos
    Mesa.create(mesa)
        .then(data => {
            console.log(">> Mesa creada: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            console.log(">> Ha ocurrido un error al crear la mesa.");
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear una mesa."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    Mesa.findByPk(id,{include:["reservas"]})
        .then(data => {
            console.log(">> Mesa encontrada: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            console.log(">> No se pudo encontrar la mesa con id:",id);
            res.status(500).send({
                message: "Error al obtener mesa con id=" + id
            });
        });
};
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const planta = req.query.planta;
    const capacidad = req.query.capacidad;
    var condition = nombre ? {nombre: {[Op.iLike]: `%${nombre}%`}} :
                    planta ? {planta: {[Op.iLike]: `%${planta}%`}} :
                    capacidad ? {capacidad: {[Op.iLike]: `%${capacidad}%`}} :null;
    Mesa.findAll({where: condition})
        .then(data => {
            console.log(">> Mesas encontradas: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            console.log(">> No se pudo encontrar las mesas");
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las mesas."
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Mesa.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                console.log(">> Mesas actualizada: " + JSON.stringify(req.body, null, 4));
                res.send({
                    message: "Mesa fue actualizada exitosamente."
                });
            } else {
                console.log(">> No se pudo actualizar la mesa con id=",id);
                res.send({
                    message: `No se puede actualizar la mesa con id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(">>Eror al actualizar la mesa con id:", id);
            res.status(500).send({
                message: "Error al actualizar la mesa con id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Mesa.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                console.log(">> Mesas eliminada exitosamente");
                res.send({
                    message: "Mesa fue eliminada exitosamente!"
                });
            } else {
                console.log(">> No se pudo eliminar la mesa con id:",id);
                res.send({
                    message: `No se pudo eliminar la mesa con id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(">>Eror al eliminar la mesa con id:", id);
            res.status(500).send({
                message: "Error al eliminar la mesa con id=" + id
            });
        });
};