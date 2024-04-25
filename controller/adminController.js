const adminService = require('../services/adminServices');
const validation = require('../utils/validation');
const token = require('../utils/token');
const { message, statusCode } = require('../utils/message');


const adminRegister = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(statusCode.badRequest).json({ message: message.commonMessage.emailIsRequired, status: statusCode.badRequest });
        }
        if (!req.body.password) {
            return res.status(statusCode.badRequest).json({ message: message.commonMessage.passwordRequired, status: statusCode.badRequest });
        }

        const data = {
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        }
        const saveData = await adminService.createAdmin(data)
        return res.status(statusCode.success).json({ message: "register successfull", status: statusCode.success, data: saveData });
    } catch (error) {
        console.log(error)
        return res.json({ message: message.commonMessage.serverError })
    }
}


const adminLogin = async (req, res) => {
    if (!req.body.email) {
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.emailIsRequired, statuscode: statusCode.badRequest, status: false });
    }
    if (!req.body.password) {
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.passwordRequired, statuscode: statusCode.badRequest, status: false });
    }

    const passwordValidation = validation.isValidPassword(req.body.password);
    if (passwordValidation === false) {
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.isPasswordValidate, statuscode: statusCode.badRequest, status: false });
    }

    const mailValidate = validation.isValidEmail(req.body.email);
    if (mailValidate === false) {
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.isEmailValidate, statstatuscodeus: statusCode.badRequest, status: false });
    }

    try {
        const query = { email: req.body.email }
        const existsAdmin = await adminService.findAdmin(query);
        
        if (!existsAdmin[0]) {
            return res.status(statusCode.notFound).json({ message: message.admin.userNotExists, statuscode: statusCode.notFound, status: false });
        }

        const Token = await token.generateToken({ existsAdmin });

        const data = {
            _id: existsAdmin[0]._id,
            name: existsAdmin[0].name,
            email: existsAdmin[0].email,
            token: Token
        }

        return res.status(statusCode.success).json({ message: message.admin.loginSuccess, status: statusCode.success, status: true, data: data });

    } catch (err) {
        console.log('error', err);
        return res.json({ message: message.commonMessage.serverError, status: false })
    }
}

module.exports = {
    adminLogin,
    adminRegister
}