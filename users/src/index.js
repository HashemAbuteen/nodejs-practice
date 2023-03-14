const path = require("path");
const dataDir = path.resolve(__dirname, "../data");
const usersPath = dataDir + "/users.json";

const fs = require("fs");
const { stringify } = require("querystring");

function getUsersArray() {
  const users = fs.readFileSync(usersPath, { encoding: "utf-8", flag: "r" });
  return JSON.parse(users);
}

function storeUsersArray(users) {
  if (!Array.isArray(users)) {
    console.log("Users must be an array");
    return;
  }
  fs.writeFile(usersPath, JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function createUser(user) {
  if (!user.name || !user.email) {
    throw new Error("a user must have a name and an email");
  }
  user.id = require("uniqid")();
  const users = getUsersArray();
  users.push(user);

  storeUsersArray(users);
}

function getUser(userId) {
  const users = getUsersArray();
  const user = users.find((user) => user.id === userId);
  if (!user) {
    console.log("there is no such user with id " + userId);
  }
  return user;
}

function updateUser(userId, updates) {
  user = getUser(userId);
  let updatedUsers;
  if (!user) {
    console.log("there is no such user to update");
  } else {
    const updatedUser = { ...user, ...updates };
    const users = getUsersArray();
    updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return updatedUser;
      }
      return user;
    });
    storeUsersArray(updatedUsers);
  }
}

function deleteUSer(userId) {
  const users = getUsersArray();
  const indexToRemove = users.findIndex((user) => user.id === userId);
  if (indexToRemove >= 0) {
    users.splice(indexToRemove, 1);
  }
  storeUsersArray(users);
}

deleteUSer("11qqxcgf8lf827lpi");
