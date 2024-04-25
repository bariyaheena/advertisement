const bcrypt = require('bcrypt');
const saltRound = Number(process.env.SALTROUND);

const generateHash = async(password) => {
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
}

const comparePassword = async(password, hashPassword) => {
    const matchPassword = await bcrypt.compare(password, hashPassword);

    return matchPassword;
}

module.exports = {
    generateHash,
    comparePassword
};
