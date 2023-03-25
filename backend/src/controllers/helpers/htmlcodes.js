const HTML_CODES = {
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const getStatusCode = (param) => HTML_CODES[param];

module.exports = {
  getStatusCode,
};