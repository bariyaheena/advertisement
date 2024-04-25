const bookedAdsServices = require('../services/bookedAdsServices');
const adsServices = require('../services/adsService');
const slotServices = require('../services/slotServices');
const pageModal = require('../modals/pageModal');
const adsModal = require('../modals/adsModal');
const { message, statusCode } = require('../utils/message');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

const moment = require('moment');
const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
  }
});

const bookedAds = async (req, res) => {
  try {
    const formattedDate = moment(req.body.slot_Date).format('YYYY-MM-DD');

    const data = {
      page_id: req.body.page_id,
      ads_id: req.body.ads_id,
      client_id: req.body.client_id,
      slot_id: req.body.slot_id,
      slot_Date: formattedDate
    }
    const adsBookedByclients = await bookedAdsServices.adsbooked(data);
    if (adsBookedByclients) {
      return res.status(statusCode.success).json({ message: message.client.adsBookedByclients, statusCode: statusCode.success, status: true, data: adsBookedByclients });
    }
  } catch (error) {
    return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statusCode: statusCode.badRequest, status: false })

  }
}

const findBokedAds = async (req, res) => {
  try {
    const query = {
      slot_id: req.body.slot_id
    }
    const find_Ads = await bookedAdsServices.findBooked_ads()
    if (find_Ads) {
      return res.status(statusCode.success).json({ message: "find all data", status: true, data: find_Ads })
    } else {
      return res.status(statusCode.Invalid).json({ message: "data not found", status: false, data: null })
    }
  } catch (error) {
    console.log(error)
    return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false })
  }
}
const booked_ads_for_chart = async (req, res) => {
  try {
    const totalAds = await adsServices.find_Ads()
    if (totalAds.length === 0) {
      return res.status(statusCode.badRequest).json({ message: "No ads found", status: false });
    } else {
   
        const querySlot = { slot_id: req.body.slot_id,payment_Status:true};
        const total_booked_Ads = await bookedAdsServices.findBooked_ads(querySlot);
        const percentage = Math.round(100 * (total_booked_Ads.length / totalAds.length));


      return res.status(statusCode.success).json({ message: "Found data successfully", status: true, data: percentage, });
    }
  } catch (error) {
    console.error(error);
    return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
  }
}
const uploadAdsImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        message: 'No uploadAdsImage file provided or invalid format',
        status: 404,
      });
    }
    const uploadImage = req.file;
    const uploadAdsImageFolder = 'AdsImage';
        const timestamp = new Date().getTime();
        const uploadAdsImageName = `${timestamp}_ads.jpg`;

    const uploadpaperParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${uploadAdsImageFolder}/${uploadAdsImageName}`,
      Body: uploadImage.buffer
    };
    await s3Client.send(new PutObjectCommand(uploadpaperParams));

    const query = {_id: req.body._id};
    const update = { image: uploadAdsImageName}
    const saveImage = await bookedAdsServices.updateImageById(query,update);
    if (saveImage) {
      return res.status(statusCode.success).json({ message: "upload image success", status: true, data: saveImage });
    }
  } catch (error) {
    console.log(error);
    return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
  }
}

const update_Payment_Status = async (req, res) => {
  try {
    const { booked_id } = req.body;

    const updateResult = await bookedAdsServices.updatestatus({ _id: booked_id }, { payment_Status: true });

    if (updateResult) {
      return res.status(statusCode.success).json({ message: "Payment status updated successfully", status: true });
    } else {
      return res.status(statusCode.badRequest).json({ message: "Failed to update payment status", status: false });
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    return res.status(statusCode.badRequest).json({ message: "Internal server error", success: false });
  }
}

module.exports = {
  findBokedAds,
  bookedAds,
  booked_ads_for_chart,
  uploadAdsImage,
  update_Payment_Status
}