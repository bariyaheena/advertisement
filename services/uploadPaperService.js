const slotModal = require('../modals/slotModal');

const saveImage = async (update, query) => {
    try {
        const saveData = await slotModal.findOneAndUpdate(
            { _id: query },
            update,
            { new: true }
        );
        return saveData;
    } catch (error) {
        console.error('Error saving image:', error);
        throw error;
    }
};

module.exports = {
    saveImage
};
