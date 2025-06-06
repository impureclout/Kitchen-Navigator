const { v4: uuidv4 } = require('uuid');

const users = [];
const subscriptions = [];

module.exports = {
  users,
  subscriptions,
  generateUUID: uuidv4,
}; 