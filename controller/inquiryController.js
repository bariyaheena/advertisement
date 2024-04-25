const inquiryService = require('../services/inquiryService');
const { message, statusCode } = require('../utils/message');
const { sendOTPMail } = require('../utils/nodemailer');

function generateOTP(length = 6) {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
const addinquiry = async (req, res) => {
    if (!req.body.name) {
        return res.status(statusCode.notFound).json({ message: message.commonMessage.name, statusCode: statusCode.notFound, status: false })
    }
    if (!req.body.mobile) {
        return res.status(statusCode.notFound).json({ message: message.commonMessage.mobile, statusCode: statusCode.notFound, status: false })
    }
    if (!req.body.email) {
        return res.status(statusCode.notFound).json({ message: message.commonMessage.email, statusCode: statusCode.notFound, status: false })
    }
    if (!req.body.inquiry) {
        return res.status(statusCode.notFound).json({ message: message.commonMessage.inquiry, statusCode: statusCode.notFound, status: false })
    }
    const otp = generateOTP();
    try {
        const data = {
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            inquiry: req.body.inquiry,
            otp: otp
        }
        await sendOTPMail({
            to: data.email,
            OTP: otp,
        });
        const addInquiry = await inquiryService.addinquiry(data);
        
        if (addInquiry) {
            return res.status(statusCode.success).json({ message: message.client.inquirysuccess, statusCode: statusCode.success, status: true })
        }
    } catch (error) {
        // console.log(error)
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statusCode: statusCode.badRequest, status: false })
    }
}

const verifyOTP = async (req, res) => {
    try {
        if (!req.body || !req.body.otp) {
            return res.status(statusCode.badRequest).json({ message: "Invalid request body", status: false });
        }

        const query = { otp: req.body.otp }

        const findData = await inquiryService.findInquiry(query)
        if (!findData || findData.length === 0) {
            return res.status(statusCode.Invalid).json({ message: message.otp.invalidOtp, status: false });
        }

        const storedOTP = findData[0].otp
        if (!storedOTP) {
            return res.status(statusCode.Invalid).json({ message: 'otp is required', status: false });
        }
        
        if (query.otp === storedOTP) {
            await inquiryService.updateOtp(query)
            return res.status(statusCode.success).json({ message: message.otp.verifySuccess, status: true });
        } else {
            return res.status(statusCode.Invalid).json({ message: message.otp.invalidOtp, status: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
};


const findInquiry = async (req, res) => {
    try {
        const query = { isVerified: true }
        const findData = await inquiryService.findInquiry(query)
        if (findData) {
            return res.status(statusCode.success).json({ message: message.inquiry.inquiryfind, status: true, data: findData })
        }
    } catch (error) {
        // console.log(error)
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statusCode: statusCode.badRequest, status: false })
    }
}

module.exports = {
    verifyOTP,
    findInquiry,
    addinquiry
}


