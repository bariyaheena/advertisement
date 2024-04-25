const successStory_Services = require('../services/successStory_Service');
const { message, statusCode } = require('../utils/message');
const Razorpay = require('razorpay');


const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.SECRETKEY_ID
});


const initiatePayment = async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "order_rcptid_11",
            payment_capture: 1
        };

        const response = await razorpay.orders.create(options);
        if (response) {
            return res.status(statusCode.success).json({ message: 'Payment initiate successful ', statuscode: statusCode.success, status: true, data: response });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Failed to initiate payment' });
    }
}

const bookingForStory = async (req, res) => {
    try {
        const taxPercentage = 0.05;
        const taxAmount = req.body.amount * taxPercentage;
        const totalAmount = req.body.amount + taxAmount;
        const data = {
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            location: req.body.location,
            amount: req.body.amount,
            totalAmount: totalAmount,
            taxAmount: taxAmount
        }
        const saveData = await successStory_Services.bookingForStory(data)
        if (saveData) {
            return res.status(statusCode.success).json({ message: "booking successful", status: true, data: saveData });
        } else {
            return res.status(statusCode.badRequest).json({ message: "booking fail", status: false });
        }

    } catch (error) {
        console.log(error)
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
}

const update_Payment_Status = async (req, res) => {
    try {
        const { _id, orderId } = req.body

        const updateResult = await successStory_Services.updatestatus({ _id: _id }, { payment_Status: true, orderId: orderId });

        if (updateResult) {
            return res.status(statusCode.success).json({ message: "Payment status updated successfully", status: true });
        } else {
            return res.status(statusCode.badRequest).json({ message: "Failed to update payment status", status: false });
        }
    } catch (error) {
        console.error("Error updating payment status:", error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, success: false });
    }
}

const preBooking_list = async (req, res) => {
    try {
        const findData = await successStory_Services.findData();

        if (findData) {
            return res.status(statusCode.success).json({ message: "find pre booking data", status: true, data: findData });
        } else {
            return res.status(statusCode.badRequest).json({ message: "Failed to find booking dat", status: false });
        }
    } catch (error) {
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, success: false });
    }
}

module.exports = {
    bookingForStory,
    initiatePayment,
    update_Payment_Status,
    preBooking_list
}
