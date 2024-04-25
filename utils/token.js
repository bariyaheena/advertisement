const Jwt = require('jsonwebtoken');

// Replace 'your-secret-key' with a secret key of your choice (keep this secret!)
const secretKey = process.env.SERECTKEY;

const generateToken = (payload) => {
//   const options = {
//     expiresIn: '1h' // Token expiration time
//   };
  return Jwt.sign(payload, secretKey);
  
}

module.exports = {
  generateToken
};
