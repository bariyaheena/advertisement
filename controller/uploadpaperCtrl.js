const uploadPaperService = require('../services/uploadPaperService');
const { message, statusCode } = require('../utils/message');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
// const moment = require('moment')
const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    }
});

// const uploadPaper = async (req, res) => {
//     try {
//         if (!Array.isArray(req.files['uploadpaper'])) {
//             return res.status(404).json({
//                 message: 'No uploadpaper files provided or invalid format',
//                 status: 404,
//             });
//         }

//         const uploadImages = req.files['uploadpaper'];

//         const uploadpaperFolder = ''; // Empty string to indicate root folder

//         const uploadpaper = [];
//         const timestamp = new Date().getTime();
//         for (let i = 0; i < uploadImages.length; i++) {
//             const uploadImage = uploadImages[i];
//             const uploadpaperName = `${timestamp}_${i + 1}_uploadpaper.pdf`;
//             uploadpaper.push(uploadpaperName);

//             const filePath = `${uploadpaperName}`; // File path without any folder name, indicating root folder
//             await fs.promises.writeFile(filePath, uploadImage.buffer);
//         }
//         const formattedDate = moment(req.body.date).format('YYYY-MM-DD');

//         const update = {
//             uploadpaper: uploadpaper,
//             date: formattedDate, 
//         }; 

//         const query = {
//             date: formattedDate
//         };

//         const saveImage = await uploadPaperService.saveImage(update, query.date);
//         console.log(update);
//         console.log(query);

//         if (saveImage) {
//             return res.status(statusCode.success).json({ message: "upload image success", status: true, data: saveImage });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
//     }
// };

// const uploadPaper = async (req, res) => {
//     try {
//         if ( !Array.isArray(req.files['uploadpaper'])) {
//             return res.status(404).json({
//                 message: 'No uploadpaper files provided or invalid format',
//                 status: 404,
//             });
//         }

//         const uploadImages = req.files['uploadpaper'];

//         const uploadpaperFolder = 'uploadnewsPaper'

//         const uploadpaper = [];
//         const timestamp = new Date().getTime();
//         for (let i = 0; i < uploadImages.length; i++) {
//             const uploadImage = uploadImages[i];
//             const uploadpaperName = `${timestamp}_${i + 1}_uploadpaper.pdf`;
//             uploadpaper.push(uploadpaperName);
//             const uploadpaperParams = {
//                 Bucket: process.env.S3_BUCKET_NAME,
//                 Key: `${uploadpaperFolder}/${uploadpaperName}`,
//                 Body: uploadImage.buffer
//             };
//             await s3Client.send(new PutObjectCommand(uploadpaperParams));
//         }
//         const formattedDate = moment(req.body.date).format('YYYY-MM-DD');

//         const update = {
//             uploadpaper: uploadpaper,
//             date: formattedDate, 
//         }; 

//         const query = {
//             date:formattedDate
//         }
//         const saveImage = await uploadPaperService.saveImage(update,query);
//         console.log(update)
//         console.log(query)
//         if (saveImage) {
//             return res.status(statusCode.success).json({ message: "upload image success", status: true, data: saveImage });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
//     }
// };

const uploadPaper = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(statusCode.Invalid).json({
                message: 'No uploadpaper file provided or invalid format',
                statusCode: statusCode.Invalid,
                status:false
            });
        }

        const uploadImage = req.file;
        if (!uploadImage.originalname.endsWith('.pdf')) {
            return res.status(statusCode.Invalid).json({
                message: 'Invalid file format. Only PDF files are allowed.',
                statusCode: statusCode.Invalid,
                status:false
            });
        }

        const uploadpaperFolder = 'uploadnewsPaper';

        const timestamp = new Date().getTime();
        const uploadpaperName = `${timestamp}_uploadpaper.pdf`;

        const uploadpaperParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${uploadpaperFolder}/${uploadpaperName}`,
            Body: uploadImage.buffer
        };

        await s3Client.send(new PutObjectCommand(uploadpaperParams));

        const update = {
            uploadpaper: uploadpaperName,
        }

        const query = {
        _id: req.body._id,
        };

        const saveImage = await uploadPaperService.saveImage(update, query);
        if (saveImage) {
            return res.status(statusCode.success).json({ message: "upload image success", status: true, data: saveImage });
        }
    } catch (error) {
        console.log(error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
};



module.exports = { uploadPaper }