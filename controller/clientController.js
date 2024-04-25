const clientService = require('../services/clientServices');
const { message, statusCode } = require('../utils/message');
const {isValidEmail} = require('../utils/validation')
const addClient = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            location: req.body.location,
            payment_type:req.body.payment_type,
            GST_No:req.body.GST_No
        }
        if (!isValidEmail(req.body.email)) {
            return res.status(statusCode.badRequest).json({ message: "Invalid email format", statusCode: statusCode.badRequest, status: false });
        }
        const addClient = await clientService.addClient(data); 
        if (addClient) {
            return res.status(statusCode.success).json({ message: message.client.clientSuccess, statusCode: statusCode.success, status: true, data:addClient})
        }
    } catch (error) {
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statusCode: statusCode.badRequest, status: false })
    }
}

const findAllClients = async (req, res) => {
    try {
        const findClients = await clientService.findClients()
        if (findClients) {
            return res.status(statusCode.success).json({ message: message.client.findAllClient, statusCode: statusCode.success, status: true, data: findClients })
        }
    } catch (error) {
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false })
    }
}


const findOneclient = async (req, res) => {
    try {
        const query = { _id: req.body._id }
        const findClient = await clientService.findClients(query)
        if (findClient) {
            return res.status(statusCode.success).json({ message: message.client.findAllClient, statusCode: statusCode.success, status: true, data: findClient })
        }
    } catch (error) {
        console.log(error)
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false })
    }
}

const updateClient = async (req, res) => {
    try {
        const query = { _id: req.body._id }
        const dataToUpdate = {
            name: req.body.name,
            email: req.body.email,
            location: req.body.location,
            mobile: req.body.mobile,
            payment_type:req.body.payment,
            GST_No:req.body.GST_No
        }
        const updateClient = await clientService.updateClient(query,dataToUpdate)
        if (updateClient) {
            return res.status(statusCode.success).json({ message: message.client.updateClient, statusCode: statusCode.success, status: true, data: updateClient })
        }
    } catch (error) {
        console.log(error)
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false })
    }
}

const deleteClient = async(req,res) =>{
    try {
        const query = { _id: req.body._id }
        const deleteClient = await clientService.deleteClient(query)
        if (deleteClient) {
            return res.status(statusCode.success).json({ message: message.client.deleteClient, statusCode: statusCode.success, status: true })
        }
    } catch (error) {
        console.log(error)
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false })
    }

}



module.exports = {
    addClient,
    findAllClients,
    findOneclient,
    updateClient,
    deleteClient
}