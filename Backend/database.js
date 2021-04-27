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