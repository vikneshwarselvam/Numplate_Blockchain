const express = require('express');
const app = express();
const cors = require('cors');
const postgres = require("./db");
//const $ = require('jquery');
var transactionList = require("./build/contracts/TransactionList.json");
//var getJSON = require('get-json');
const contract = require("@truffle/contract");
const Web3 = require('web3');
var provider = new Web3.providers.HttpProvider("http://localhost:7545");

// Middleware
app.use(cors());
app.use(express.json());
//var contracts = {};
var TransactionList;
// getting user credentials from database
app.get("/login/:username", async (req, res) => {
    try {
        const {username} = req.params;
        const user_credentials = await postgres.query("SELECT * FROM users WHERE username = $1", [username]);
        res.json(user_credentials.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/transactions/:numplate", async (req, res) => {
    try {
        const {numplate} = req.params;
        //console.log(numplate);
        const transactions = await postgres.query("SELECT * FROM tollTransactions WHERE numplate = $1", [numplate]);
        res.json(transactions.rows);
    } catch (error) {
        console.log(error.message);
    }
});




app.get("/:user_id", async (req, res) => {
    try {
        const {user_id} = req.params;
        const user_credentials = await postgres.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        res.json(user_credentials.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//register user
app.post("/register", async (req, res) => {
    try {
        //console.log(req.body);
        const { username } = req.body;
        const { password } = req.body;
        const { numplate } = req.body;
        //console.log(username, password, numplate);
        const insert_new_user = await postgres.query("INSERT INTO users (username, password, numplate) VALUES($1, $2, $3)", [username, password, numplate]);
        res.json(insert_new);
    } catch (error) {
        console.log(error);
    }
});

// Post request from python file for creating new transactions
app.post("/createTransactions", async (req, res) => {
    try {
        
        //const transactionList = await $.getJSON('./build/contracts/TransactionList.json');
        //console.log(req.body);
        // TransactionList = contract(transactionList);
        // TransactionList.setProvider(provider);
        // transactionList = await TransactionList.deployed();

        
        const { numplate } = req.body;
        const { tollgate_location } = req.body;
        const { transaction_date } =    req.body;
        const { transaction_time } = req.body;
        const { toll_tariff } = req.body;
        const payment_status = false;
        console.log(numplate, tollgate_location, transaction_date, transaction_time, toll_tariff, payment_status);
        const insert_new_transaction = await postgres.query("INSERT INTO tollTransactions(numplate, tollgate_location, transaction_date, transaction_time, toll_tariff, payment_status) VALUES($1, $2, $3, $4, $5, $6)", [numplate, tollgate_location, transaction_date, transaction_time, toll_tariff, payment_status]);
        res.json(insert_new_transaction);
        // await transactionList.createTransaction(numplate, tollgate_location, transaction_date, transaction_time, toll_tariff);
    } catch (error) {
        console.log(error);
    }
});

app.post("/updatePayment", async (req, res)=>{
    try {
        console.log("Updating Payment Status")
        const { numplate } = req.body;
        const { tollgate_location } = req.body;
        const { transaction_date } =    req.body;
        const { transaction_time } = req.body;
        const { toll_tariff } = req.body;
        const update_payment = await postgres.query("UPDATE tollTransactions SET payment_status = true WHERE numplate = $1 AND tollgate_location = $2 AND transaction_date = $3 AND transaction_time = $4 AND toll_tariff = $5", [numplate, tollgate_location, transaction_date, transaction_time, toll_tariff]);
        res.json(update_payment);
        console.log("success")
      } catch (error) {
        console.error(error.message)
      }
})






app.listen(5000, () => {
    console.log("Numplate Server Running in port 5000");
});