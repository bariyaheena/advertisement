const successStoryModal = require('../modals/successStoryModal');


const bookingForStory = async(data)=>{
    const saveData = await successStoryModal.create(data);
    return saveData
}
const updatestatus = async (query, update) => {
    const updateData = await successStoryModal.findOneAndUpdate(query, update, { new: true });
    return updateData
}
const findData = async(query) =>{
    const data = await successStoryModal.find(query);
    return data
}
module.exports = {
    bookingForStory,
    updatestatus,
    findData
};

