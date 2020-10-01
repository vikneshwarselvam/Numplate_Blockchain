CREATE DATABASE numplatedb;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password  VARCHAR(100) NOT NULL,
    numplate varchar(10) UNIQUE
); 

CREATE TABLE tollTransactions(
    transaction_id SERIAL PRIMARY KEY,
    numplate varchar(10) ,
    tollgate_location varchar(100),
    transaction_date varchar(10),
    transaction_time varchar(10),
    toll_tariff varchar(10)

);
