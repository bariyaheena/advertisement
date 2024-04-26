const clientModal = require('../modals/clientModal');

const addClient = async(data) => {
 const createClient = await clientModal.create(data);
 return createClient;
}

const findClients = async(query)=>{
    const findData = await clientModal.find(query);
    return findData
}
const updateClient = async(query,dataToUpdate)=>{
    const findData = await clientModal.findOneAndUpdate(query, dataToUpdate, { new: true });
    return findData
}

const deleteClient = async(query) => {
    const deleteClient = await clientModal.findOneAndDelete(query);
    return deleteClient
}

module.exports={    
    addClient,
    findClients ,
    updateClient,
    deleteClient
}