pragma solidity ^0.5.0;

contract TransactionList{
    uint public transactionCount = 0;

    struct Transaction{
        uint id;
        string numplate;
        string tollgate_location;
        string transaction_date;
        string transaction_time;
        string toll_tariff;
        bool paid;
    }

    mapping(uint => Transaction) public transactions;

    event TransactionCreated(
        uint id,
        string numplate,
        string tollgate_location,
        string transaction_date,
        string transaction_time,
        string toll_tariff,
        bool paid
    );

    constructor() public{
        createTransaction("TN38BR3036", "Nallur Toll Plaza", "29-08-2020", "13:30", "1 ETH");
        createTransaction("TN38BR3036", "Nallur Toll Plaza", "28-08-2020", "17:50", "1 ETH");
    }

    function createTransaction(string memory numplate, string memory tollgate_location, string memory transaction_date, string memory transaction_time, string memory toll_tariff) public{
        transactionCount++;
        transactions[transactionCount] = Transaction(transactionCount, numplate, tollgate_location, transaction_date, transaction_time, toll_tariff, true);
        emit TransactionCreated(transactionCount, numplate, tollgate_location, transaction_date, transaction_time, toll_tariff, true);
    }
}