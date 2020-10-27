const db = require("../models");
const Cliente = db.Clientes;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
// Validate request
    if (!req.body.cedula) {
        res.status(400).send({
            message: "Debe enviar un numero de cedula!"
        });
        return;
    }
// crea una venta
    const cliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula
    };

// Guardamos a la base de datos
    Cliente.create(cliente)
        .then(data => {
            console.log(">> Cliente creado: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear un cliente."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id, {
        include: ["reservas"]
    })
        .then(data => {
            console.log(">> Cliente encontrado: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener cliente con id=" + id
            });
        });
};
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const cedula = req.query.cedula;
    var condition = nombre ? {nombre: {[Op.iLike]: `%${nombre}%`}}
    : apellido ? {apellido: {[Op.iLike]: `%${apellido}%`}}
    : cedula ? {cedula: {[Op.iLike]:`%${cedula}%`}} : null;
    Cliente.findAll({where: condition,include: ["reservas"]})
        .then(data => {
            console.log(">> Clientes encontrados: " + JSON.stringify(data, null, 4));
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los clientes."
            });
        });
};