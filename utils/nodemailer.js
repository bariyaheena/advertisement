const nodemailer = require('nodemailer');
const moment = require('moment');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendOTPMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: params.to,
      subject: 'inquiry OTP',
      html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <p style="margin-bottom: 30px;">Please enter OTP and add inquiry</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
     </div>
      `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};



const sendInvoiceEmail = async (clientEmail, paymentDetails) => {
  const { amount, booked_id, totalAmount, taxAmount,nextInvoiceNumber,orderId} = paymentDetails;
  const parsedDate = moment(booked_id.createAt, 'DD-MM-YYYY', true);
  const formattedDate = parsedDate.format('DD-MM-YYYY');
  try {

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: clientEmail,
      subject: 'Invoice for Your Purchase',
      html: `<!DOCTYPE html>
     <html lang="en">
     
     <head>
         <title>Bootstrap Example</title>
         <meta charset="utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1">
         <style>
             body {
                 margin: 20px;
                 padding: 0;
                 background-color: #eee;
                 font-family: Arial, sans-serif;
             }
     
             table {
                 width: 100%;
                 max-width: 600px;
                 /* Adjust as needed */
                 border-collapse: collapse;
             }
     
             table,
             th,
             td {
                 border: 1px solid #ddd;
             }
     
             th,
             td {
                 padding: 10px;
                 text-align: left;
             }
     
             .text-end {
                 text-align: right;
             }
     
             .btn {
                 display: inline-block;
                 padding: 8px 12px;
                 text-decoration: none;
                 background-color: #007bff;
                 color: #fff;
                 border-radius: 4px;
             }
         </style>
     </head>
     
     <body>
         <div
             style="margin: 0 auto; max-width: 700px; background-color: #fff; border-radius: 1rem; box-shadow: 0 20px 27px 0 rgba(0,0,0,0.05);">
             <div style="padding: 10px;">
                 <table style="width: 100%; max-width: 700px; margin: 0 auto; border-collapse: collapse;">
                     <tr>
                         <td>
                             <h4>AHMEDABAD VISIBILITY VENTURES</h4>
                             <p>
                                 406, 4th floor Asiatic Business Center Office 406 Mithakhadi, above HDFC bank, Off CG Road,
                                 380009
                             </p>
                             <p>GST NO: 24FAGPS7416R2ZU</p>
                         </td>
                         <td>
                             <h1 style="color: rgb(12, 12, 97);">INVOICE</h1>
                         </td>
                     </tr>
                     <tr>
                         <td style="vertical-align: top; width: 50%; text-align: right; padding-left: 10px;">
                             <table style="float: right; border: none;">
     
                                 <tr>
                                     <th style="font-size: 15px; margin-bottom: 5px; border: none;">Invoice No:</th>
     
                                     <td style="margin: 5px 0; border: none;">${nextInvoiceNumber}</td>
     
                                 </tr>
                                 <tr>
                                     <th style="font-size: 15px; margin-bottom: 5px; border: none;">Invoice Date:</th>
                                     <td style="margin: 5px 0; border: none;">${formattedDate}</td>
     
                                 </tr>
                                 <tr>
                                     <th style="font-size: 15px; margin-bottom: 5px; border: none;">Order Id:</th>
                                     <td style="margin: 5px 0; border: none;">${orderId}</td>
     
                                 </tr>
     
                             </table>
                         </td>
                     </tr>
                     <tr style="background-color: rgb(154, 152, 152);">
                         <th style="padding: 0px;">
                             <p style="font-size: 16px; padding: none;">Billed From:</p>
                         </th>
                         <th style="padding: 0px;">
                             <p style="font-size: 16px; ;">Billed To:</p>
                         </th>
                     </tr>
                     <tr>
                         <td>
                             <p>AHMEDABAD VISIBILITY VENTURES</p>
                         </td>
                         <td style="vertical-align: top; width: 50%; padding-right: 10px;">
                             <h5 style="font-size: 15px; margin-bottom: 5px;">${booked_id.client_id.name}</h5>
                             <p style="margin: 5px 0;">${booked_id.client_id.email}</p>
                             <p style="margin: 5px 0;">${booked_id.client_id.mobile}</p>
                             <p style="margin: 5px 0;">${booked_id.client_id.location}</p>
                             <p style="margin: 5px 0;">${booked_id.client_id.GST_No}</p>
                         </td>
                     </tr>
                 </table>
     
                 <div style="margin-top: 20px;">
                     <table style="width: 100%; max-width: 700px; margin: 0 auto; border-collapse: collapse;">
                         <thead>
                             <tr style="background-color: rgb(28, 28, 119); color: white;">
                                 <th style="width: 70px;">No.</th>
                                 <th>Item</th>
                                 <th>ads's size</th>
                                 <th>Price</th>
                                 <th>Quantity</th>
                                 <th class="text-end" style="width: 120px;">Total</th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr>
                                 <td>01</td>
                                 <td>
                                 ${booked_id.ads_id.unique_id}
                                 </td>
                                 <td>
                                 ${booked_id.ads_id.pageSize}
                              </td>
                                 <td>₹${amount}</td>
                                 <td>1</td>
                                 <td class="text-end">₹${amount}</td>
                             </tr>
                             <tr>
                                 <td colspan="5" class="text-end">Sub Total</td>
                                 <td class="text-end">₹${amount}</td>
                             </tr>
                             <tr>
                                 <td colspan="5" class="text-end">Tax</td>
                                 <td class="text-end">₹${taxAmount}</td>
                             </tr>
                             <tr>
                                 <td colspan="5" class="text-end"><strong>Total</strong></td>
                                 <td class="text-end"><strong>₹${totalAmount}</strong></td>
                             </tr>
                         </tbody>
                     </table>
                     <div style="margin-top: 20px; text-align: center;">
                         <p>Powered By:</p>
                         <img src="https://qgbimages.s3.ap-south-1.amazonaws.com/logoImage.png" width="30%">
                     </div>
                 </div>
             </div>
         </div>
     </body>
     
     </html>`

    };

    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};



module.exports = {
  sendOTPMail,
  sendInvoiceEmail
}