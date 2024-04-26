const pageModal = require('../modals/pageModal');

const createpage = async(data)=>{
    const addData = await pageModal.create(data);
    return addData
}

const findpage = async(query)=>{
    const findData = await pageModal.find(query);
    return findData
}
const findOnepage = async(query)=>{
    const findData = await pageModal.findOne(query);
    return findData
}
const deletepage = async (query) =>{
 const findData = await pageModal.findOneAndDelete(query);
 return findData
}

module.exports={
    createpage,
    findpage,
    findOnepage,
    deletepage  
}