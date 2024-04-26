const slotModal = require('../modals/slotModal');

const createSlot = async(data)=>{
    const saveData = await slotModal.create(data);
    return  saveData
}

const findSlot = async(query)=>{
    const findData = await slotModal.find(query).sort({ date: 1 });
    return  findData
} 

const editSlot = async(query)=>{
    const findData = await slotModal.findOne(query);
    return  findData
}

const updateSlot = async(query, update)=>{
    const updateData = await slotModal.findOneAndUpdate(query, update);
        return updateData; 
}

const deleteSlot = async(query) =>{
    const deleteData = await slotModal.findOneAndDelete(query);
        return deleteData;
}

module.exports = {
    createSlot,
    findSlot,
    updateSlot,
    deleteSlot,
    editSlot
}