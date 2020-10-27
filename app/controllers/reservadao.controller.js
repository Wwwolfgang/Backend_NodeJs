const db = require("../models");
const Reserva = db.Reservas;
const Mesa = db.Mesas;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
// Validate request
    if (!req.body.cantidad) {
        res.status(400).send({
            message: "Debe enviar una cantidad solicitada!"
        });
        return;
    }
// crea una venta
    const reserva = {
        nombre: req.body.nombre,
        rangos: req.body.rangos,
        fecha: req.body.fecha,
        cantidad: req.body.cantidad,
        restauranteId: req.body.restauranteId,
        RestauranteId: req.body.restauranteId,
        ClienteId: req.body.clienteId,
        clienteId: req.body.clienteId,
        mesaId: req.body.mesaId,
        MesaId: req.body.mesaId,
        r1213: req.body.r1213,
        r1314: req.body.r1314,
        r1415: req.body.r1415,
        r1920: req.body.r1920,
        r2021: req.body.r2021,
        r2122: req.body.r2122,
        r2223: req.body.r2223
    };

// Guardamos a la base de datos
    Reserva.create(reserva)
        .then(data => {
            console.log(">> Reserva creado: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            console.log(">> Error al crear la reserva.");
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al hacer una reserva."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    Reserva.findByPk(id, {include:["restaurante","mesa","cliente"]})
        .then(data => {
            console.log(">> Reserva obtenida: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            console.log(">> Error al obtener la reserva con id:",id);
            res.status(500).send({
                message: "Error al obtener la reserva con id=" + id
            });
        });
};
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? {nombre: {[Op.iLike]: `%${nombre}%`}} :null;
    Reserva.findAll({where: condition, include:["restaurante","mesa","cliente"]})
        .then(data => {
            console.log(">> Reservas obtenidas: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            console.log(">> Error al obtener las reservas.");
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las reservas."
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Reserva.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                console.log(">> Reserva fue actualizada exitosamente con id:",id);
                res.send({
                    message: "Reserva fue actualizada exitosamente."
                });
            } else {
                console.log(">> No se puede actualizar con id:",id);
                res.send({
                    message: `No se puede actualizar la reserva con id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(">> Error al actualizar la reserva con id:",id);
            res.status(500).send({
                message: "Error al actualizar la reserva con id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Reserva.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                console.log(">> Reserva fue eliminada exitosamente");
                res.send({
                    message: "Reserva fue eliminada exitosamente!"
                });
            } else {
                console.log(">> No se pudo eliminar la reserva con id:",id);
                res.send({
                    message: `No se pudo eliminar la reserva con id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(">> Error al eliminar la reserva con id:",id);
            res.status(500).send({
                message: "Error al eliminar la reserva con id=" + id
            });
        });
};