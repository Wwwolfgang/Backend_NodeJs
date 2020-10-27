const db = require("../models");
const Restaurante = db.Restaurantes;
const Mesa = db.Mesas;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
// Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Debe enviar un nombre valido!"
        });
        return;
    }
// crea una venta
    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        pisos:req.body.pisos,
    };

// Guardamos a la base de datos
    Restaurante.create(restaurante)
        .then(data => {
            console.log(">> Restaurante creado: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            console.log(">> Error al crear el restaurante.");
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear un restaurante."
            });
        });
};
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await Restaurante.findByPk(id, {
        include: ["mesas","reservas"]
    })
        .then(data => {
            console.log(">> Restaurante encontrado: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            console.log(">> Error al obtener el restaurante con id:",id);
            res.status(500).send({
                message: "Error al obtener restaurante con id=" + id
            });
        });
};
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? {nombre: {[Op.iLike]: `%${nombre}%`}} : null;
    Restaurante.findAll({where: condition,include: ["mesas","reservas"]})
        .then(data => {
            console.log(">> Restaurantes encontrados: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            console.log(">> Error al obtener los restaurantes.");
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los restaurantes."
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Restaurante.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                console.log(">> Restaurante fue actualizado exitosamente con id:",id);
                res.send({
                    message: "Restaurante fue actualizado exitosamente."
                });
            } else {
                console.log(">> No se pudo actualizar el restaurante con id:",id);
                res.send({
                    message: `No se puede actualizar restaurante con id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(">> Error al actualizar el restaurante con id:",id);
            res.status(500).send({
                message: "Error al actualizar restaurante con id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Restaurante.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                console.log(">> Restaurante fue eliminado exitosamente con id:",id);
                res.send({
                    message: "Restaurante fue eliminado exitosamente!"
                });
            } else {
                console.log(">> No se pudo eliminar restaurante con id=",id);
                res.send({
                    message: `No se pudo eliminar restaurante con id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(">> Error al eliminar restaurante con id=",id);
            res.status(500).send({
                message: "Error al eliminar restaurante con id=" + id
            });
        });
};