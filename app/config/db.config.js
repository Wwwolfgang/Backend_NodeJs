module.exports = {

    HOST: "localhost",

    USER: "postgres",

    PASSWORD: "Passw0rd",

    DB: "backend_nodejs",

    dialect: "postgres",

    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};