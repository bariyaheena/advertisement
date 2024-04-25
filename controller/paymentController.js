const axios = require('axios');
const moment = require('moment');
const paymentService = require('../services/paymentServices');
const { message, statusCode } = require('../utils/message');
const { sendInvoiceEmail } = require('../utils/nodemailer');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');


const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.SECRETKEY_ID
});

const initiatePayment = async (req, res) => {
  const { amount, booked_id } = req.body;

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
    console.error('Error initiating payment:', error);
    return res.status(500).json({ error: 'Failed to initiate payment' });
  }
}
const createPayment = async (req, res) => {
  try {
    const { amount, booked_id, orderId, razorpay_payment_id, slot_id } = req.body;
    if (!req.body.slot_id) {
      return res.status(statusCode.badRequest).json({ message: 'slot id is require', statuscode: statusCode.badRequest, status: false });
    }

    if (amount < 1) {
      return res.status(statusCode.badRequest).json({ message: 'Amount must be at least INR 1.00', statuscode: statusCode.badRequest, status: false });
    }

    const taxPercentage = 0.05;
    const taxAmount = amount * taxPercentage;
    const totalAmount = amount + taxAmount;

    const query = { booked_id: booked_id }
    const existingPayment = await paymentService.findPayment(query);
    if (existingPayment) {
      return res.status(statusCode.badRequest).json({ message: 'Payment with this booked_id already exists', statuscode: statusCode.badRequest, status: false });
    }
    const payment = {
      razorpay_payment_id,
      orderId: orderId || uuidv4(),
      amount,
      totalAmount,
      taxAmount,
      booked_id,
      slot_id
    }
    const savePayment = await paymentService.createPayment(payment)
    if (savePayment) {
      return res.status(statusCode.success).json({ message: "Create payment successful", statuscode: statusCode.success, status: true, data: savePayment });
    }
  } catch (error) {
    console.log(error);
    return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statuscode: statusCode.badRequest, status: false });

  }
}

const mailsend = async (req, res) => {
  try {
    const query = { booked_id: req.body.booked_id };

    const get_all_payment = await paymentService.get_all_payment(query);

    const totalPayment = await paymentService.get_all_payment()
    const nextInvoiceNumber = `#AVV${String(totalPayment.length).padStart(3, '0')}`;
    if (get_all_payment.length === 0) {
      return res.status(statusCode.Invalid).json({ error: 'Payment not found', status: false });
    }
    const payment = get_all_payment[0];
    const clientEmail = payment.booked_id.client_id.email;
    const adminEmail = 'admin@ahmedabadvisibilityventures.com';

    const emailAddresses = [clientEmail, adminEmail];
    const { orderId, amount, booked_id, totalAmount, taxAmount } = payment;
    const paymentDetails = {
      orderId,
      amount,
      booked_id,
      totalAmount,
      taxAmount,
      nextInvoiceNumber,
    };
    await sendInvoiceEmail(emailAddresses, paymentDetails);

    return res.status(statusCode.success).json({ message: 'Invoice email sent successfully', status: true, data: paymentDetails });
  } catch (error) {
    return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
  }
}

const get_payment_list = async (req, res) => {
  try {
    const getData = await paymentService.get_all_payment();
    if (getData && getData.length > 0) {
      return res.status(statusCode.success).json({
        message: "Payment data retrieved successfully",
        statusCode: statusCode.success,
        status: true,
        data: getData
      });
    } else {
      return res.status(200).json({
        message: "No payment data found",
        statusCode: 200,
        status: false
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statuscode: statusCode.badRequest, status: false });
  }
}
const get_Total_Amount = async (req, res) => {
  try {
    const query = {
      slot_id: req.body.slot_id
    }
    const saveData = await paymentService.get_all_payment(query);
    if (saveData && saveData.length > 0) {
      const totalAmount = saveData.reduce((sum, payment) => sum + payment.totalAmount, 0);
      return res.status(statusCode.success).json({
        message: "Payment data retrieved successfully",
        statusCode: statusCode.success,
        status: true,
        totalPayment: totalAmount
      });
    } else {
      return res.status(200).json({
        message: "No payment data found",
        statusCode: 200,
        status: false
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statuscode: statusCode.badRequest, status: false });
  }
}

const revenue = async (req, res) => {
  try {
    const query = { slot_id: req.body.slot_id }
    const saveData = await paymentService.find_booked_id_Payment(query);
    if (saveData && saveData.length > 0) {
      const amount = saveData.reduce((sum, payment) => sum + payment.amount, 0);
      return res.status(statusCode.success).json({
        message: "Payment data retrieved successfully",
        statusCode: statusCode.success,
        status: true,
        data: saveData,
        Amount: amount
      });
    } else {
      return res.status(statusCode.success).json({
        message: "No payment data found",
        statusCode: statusCode.success,
        status: false
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statuscode: statusCode.badRequest, status: false });
  }
}

const tax = async (req, res) => {
  try {
    const query = { slot_id: req.body.slot_id }
    const saveData = await paymentService.find_booked_id_Payment(query);
    if (saveData && saveData.length > 0) {
      const taxAmount = saveData.reduce((sum, payment) => sum + payment.taxAmount, 0);
      return res.status(statusCode.success).json({
        message: "Payment data retrieved successfully",
        statusCode: statusCode.success,
        status: true,
        // data: saveData,
        taxAmount: taxAmount
      });
    } else {
      return res.status(statusCode.success).json({
        message: "No payment data found",
        statusCode: statusCode.success,
        status: false,
        taxAmount: null
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statuscode: statusCode.badRequest, status: false });
  }
}

module.exports = {
  initiatePayment,
  createPayment,
  get_payment_list,
  mailsend,
  get_Total_Amount,
  revenue,
  tax
};
