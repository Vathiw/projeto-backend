const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30 }); // TTL 30 segundos
const tokenBlacklist = new NodeCache({ stdTTL: 3600 }); // tokens inválidos por 1 hora

module.exports = {
  cache,
  tokenBlacklist
};
