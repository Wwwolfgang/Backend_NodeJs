module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define("Reserva", {
        nombre: {
            type: Sequelize.STRING
        },
        r1213:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        r1314:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        r1415:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        r1920:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        r2021:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        r2122:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        r2223:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        fecha:{
            type: Sequelize.DATEONLY
        },
        cantidad:{
            type: Sequelize.BIGINT
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Reserva;
};