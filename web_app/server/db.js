const Postgres = require('pg').Pool;

const postgres = new Postgres({
    user: "vikneshwar",
    password: "admin123",
    host: "localhost",
    port: 5432,
    database: "numplatedb"
});

module.exports = postgres;