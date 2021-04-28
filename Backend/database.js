const bcrypt = require("bcrypt");

let users = {
  users: [
    {
      id: 1,
      username: "wongthawee",
      password: "$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO",
      email: "wongthawee@gmail.com",
    },
    {
      id: 2,
      username: "test",
      password: "$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO",
      email: "test@gmail.com",
    },
  ],
};

let transactions = {
  transaction: [
    {
      username: "user1",
      tst_id: 1,
      scientific_name: "",
      characteristic: "",
      foundsource: "",
      date: "26/4/2021",
    },
    {
      username: "user2",
      tst_id: 2,
      scientific_name: "",
      characteristic: "",
      foundsource: "",
      date: "26/4/2021",
    },
    {
      username: "user3",
      tst_id: 3,
      scientific_name: "",
      characteristic: "",
      foundsource: "",
      date: "26/4/2021",
    },
  ],
};


const SECRET = "your_jwt_secret";
const NOT_FOUND = -1;

exports.users = users;
exports.SECRET = SECRET;
exports.NOT_FOUND = NOT_FOUND;

exports.setUsers = function (_users) {
  users = _users;
};

// === validate username/password ===
exports.isValidUser = async (username, password) => {
  const index = users.users.findIndex((item) => item.username === username);
  return await bcrypt.compare(password, users.users[index].password);
};

// return -1 if user is not existing
exports.checkExistingUser = (username) => {
  return users.users.findIndex((item) => item.username === username);
};

exports.findTransactions = async () => {
  return transactions.transaction
};

exports.findTransactionsByID = async (user_id) => {
  let temp = transactions.transaction.filter(index => index.user_id == user_id)
  return temp
};

exports.addTransaction = async (req, username) => {
  const { scientific_name, characteristic, foundsource, date } = req;
  let lastTranID = await this.findTransactionID();
  let newData = {}
  newData.username = username
  newData.tst_id = lastTranID
  newData.scientific_name = scientific_name
  newData.characteristic = characteristic
  newData.foundsource = foundsource
  newData.date = date
  transactions = { transaction:[...transactions.transaction , newData]}
  return transactions.transaction[lastTranID]
};

exports.findUserID = async (users_id) => {
  return 
};

exports.findTransactionID = async () => {
  let lastIndex = transactions.transaction.length
  return transactions.transaction[lastIndex - 1].tst_id + 1;
};

exports.deleteTransaction = async (transactionID) => {
  let found = await transactions.transaction.find(find => find.tst_id == transactionID)
  if (!found) {
    return false
  }
  transactions.transaction = await transactions.transaction.filter(find => find.tst_id != transactionID)
  return transactions.transaction
}

exports.editTransaction = async (req) => {
  const { scientific_name, characteristic, foundsource, date , tst_id} = req;
  let found = await transactions.transaction.find(find => find.tst_id == tst_id)
  if (!found) {
    return false
  }
  found.scientific_name = scientific_name
  found.characteristic = characteristic
  found.date = date
  found.foundsource = foundsource
  return found
}
