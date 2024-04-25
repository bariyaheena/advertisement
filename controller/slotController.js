const slotServices = require('../services/slotServices');
const { message, statusCode } = require('../utils/message');
const moment = require('moment');

const createSlot = async (req, res) => {
    try {

        const parsedDate = moment(req.body.date, 'DD-MM-YYYY', true);
        if (!parsedDate.isValid() || parsedDate.isBefore(moment(), 'day')) {
            return res.status(statusCode.Invalid).json({ message: "Invalid date", statuscode: statusCode.Invalid, status: false });
        }
        const formattedDate = parsedDate.format('YYYY-MM-DD');
        const query = { date: formattedDate }

        const existingSlot = await slotServices.findSlot(query);
        if (!existingSlot || existingSlot.length === 0) {
            const data = {
                date: formattedDate
            }
            const saveData = await slotServices.createSlot(data)
            if (saveData) {
                return res.status(statusCode.success).json({ message: "slot added successfull", status: true, data: saveData });
            }
        } else {
            return res.status(statusCode.Invalid).json({ message: "Slot already exists for this date", statuscode: statusCode.Invalid, status: false });

        }

    } catch (error) {
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
}

const findSlot = async (req, res) => {
    try {
        const currentDate = moment().startOf('day');
        const query = { date: { $gte: currentDate } };
        const findData = await slotServices.findSlot(query);
        if (findData) {
            return res.status(statusCode.success).json({ message: "find slot successfull", status: true, data: findData });
        }
    } catch (error) {
        console.log(error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
}

const editSlot = async (req, res) => {
    try {
        const query = { _id: req.body._id }
        const editData = await slotServices.editSlot(query)
        if (editData) {
            return res.status(statusCode.success).json({ message: "find slot successfull", status: true, data: editData });
        }
    } catch (error) {
        console.log(error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
}

const updateSlot = async (req, res) => {
    try {
        const update = {
            date: req.body.date,
            page1: req.body.page1,
            page2: req.body.page2,
            page3: req.body.page3,
            page4: req.body.page4,
            status: req.body.status,
        }
        const parsedDate = moment(req.body.date, 'YYYY-MM-DD', true);
        if (!parsedDate.isValid() || parsedDate.isBefore(moment(), 'day')) {
            return res.status(statusCode.Invalid).json({ message: "Invalid date", statuscode: statusCode.Invalid, status: false });
        }
        const query = { _id: req.body._id }
        const updateData = await slotServices.updateSlot(query, update)
        if (updateData) {
            return res.status(statusCode.success).json({ message: "update slot successfull", status: true, data: updateData });
        }
    } catch (error) {
        console.log(error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
}

const deleteSlot = async (req, res) => {
    try {
        const query = { _id: req.body._id }
        const deleteData = await slotServices.deleteSlot(query)
        if (deleteData) {
            return res.status(statusCode.success).json({ message: "delete slot successfull", status: true, data: deleteData });
        }
    } catch (error) {
        console.log(error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
}

const check_page_avaibility = async (req, res) => {
    try {
        const parsedDate = moment(req.body.date, 'DD-MM-YYYY', true);
        if (!parsedDate.isValid()) {
            return res.status(statusCode.Invalid).json({ message: "Invalid date", statuscode: statusCode.Invalid, status: false });
        }
        const formattedDate = parsedDate.format('YYYY-MM-DD');
        const query = { date: formattedDate }
        const findSlot = await slotServices.editSlot(query)
        if (findSlot) {
            return res.status(statusCode.success).json({ message: "find slot successfull", status: true, data: findSlot });
        }
    } catch (error) {
        console.log(error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
}

const pastSlotlist = async(req,res) =>{
    try {
        const currentDate = new Date();
        
        const formattedCurrentDate = moment(currentDate).format('YYYY-MM-DD');
        
        const query = { date: { $lt: formattedCurrentDate } };
        
        const findSlots = await slotServices.findSlot(query);
        if (findSlots.length > 0) {
            return res.status(statusCode.success).json({ message: "Found slots successfully", status: true, data: findSlots });
        } else {
            return res.status(statusCode.notFound).json({ message: "No slots found before the current date", status: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
}



module.exports = {
    createSlot,
    findSlot,
    updateSlot,
    deleteSlot,
    editSlot,
    check_page_avaibility,
    pastSlotlist
}