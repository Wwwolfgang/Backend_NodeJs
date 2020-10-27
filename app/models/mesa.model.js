module.exports = (sequelize, Sequelize) => {
    const Mesa = sequelize.define("Mesa", {
        nombre: {
            type: Sequelize.STRING
        },
        posx:{
          type: Sequelize.BIGINT
        },
        posy:{
            type: Sequelize.BIGINT
        },
        planta:{
            type: Sequelize.BIGINT,
            defaultValue : 1
        },
        capacidad:{
            type: Sequelize.BIGINT
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        // restauranteId:{
        //     type: Sequelize.BIGINT,
        //     allowNull: false,
        //     references: {
        //         model: 'Restaurantes',
        //         key: 'id'
        //     }
        // }
    });


    return Mesa;
};