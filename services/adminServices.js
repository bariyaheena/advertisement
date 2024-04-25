const adminModal = require('../modals/adminModal');

const createAdmin = async (data) => {
    const admin = await adminModal.create(data);
    return admin
}

const findAdmin = async (query) => {
    const findData = await adminModal.find(query);
    return findData
}

module.exports = {
    createAdmin,
    findAdmin
}