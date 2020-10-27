module.exports = (sequelize, Sequelize) => {
    const Restaurante = sequelize.define("Restaurante", {
        nombre: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        pisos:{
            type: Sequelize.BIGINT
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });


    return Restaurante;
};