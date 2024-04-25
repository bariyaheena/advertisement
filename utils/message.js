const message = {
    commonMessage: {
        serverError:'intenal server error',
        emailIsRequired: 'Email is required!',
        passwordRequired:"password is required!",
        isPasswordValidate:"password is not valid!",
        isEmailValidate: 'Email is not valid!',
        mobile:'mobile number is required!',
        isMObilevalidation:"mobile number is not valid!",
        name:'name is required!',
        location:'location is required!',
        inquiry:"inquiry is required!"
    },
    client:{
        clientSuccess:'client add successfull',
        findAllClient:'find all clients!',
        updateClient:'update client successfull',
        deleteClient:'delete client successfull'
    },
    admin:{
        userNotExists:"admin is not exists",
        loginSuccess:"admin login successfull"
    },
    inquiry:{
        inquiryfind:'find all inquirys',
        inquiryNotfind:'not find inquirys',
        inquirysuccess:'inquiry added successfull',
        otpsend:'otp send successfull',

    },
    otp:{
        invalidOtp:'Invalid OTP',
        notFindotp:'OTP not find',
        verifySuccess:'OTP verification successful'
    }
}

const statusCode = {
    success: 200,
    created: 201,
    notFound: 404,
    badRequest: 500,
    unAuthorized: 401,
    Invalid:201
};

module.exports = {
    message,
    statusCode
};
