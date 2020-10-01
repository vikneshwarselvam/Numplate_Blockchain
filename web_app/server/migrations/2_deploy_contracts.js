const TransactionList = artifacts.require("./TransactionList.sol");

module.exports = function (deployer) {
  deployer.deploy(TransactionList);
};
