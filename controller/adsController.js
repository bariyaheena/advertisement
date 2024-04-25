const adsService = require('../services/adsService');
const booked_Ads_service = require('../services/bookedAdsServices')
const pageService = require('../services/pageServices');
const { message, statusCode } = require('../utils/message');
const slotServices = require('../services/slotServices')
const bookedAdsServices  = require('../services/bookedAdsServices')

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    }
});


const createAds = async (req, res) => {
    try {
        const query = {
            page_id: req.body.page_id
        }
        const slotExists = await pageService.findpage(query);
        if (!slotExists) {
            return res.status(statusCode.badRequest).json({ message: "Slot not found", status: false });
        }

        const findData = await adsService.find_Ads()
        const numberOfAds = findData.length + 1;
        const uniqueId = `#ads${numberOfAds.toString().padStart(3, '0')}`;

        const data = {
            page_id: req.body.page_id,
            unique_id: uniqueId,
            pageSize: req.body.pageSize,
            price: req.body.price,
        }

        const saveAds = await adsService.create_Ads(data)
        if (saveAds) {
            return res.status(statusCode.success).json({ message: "ads added", status: true, data: saveAds })
        }
    } catch (error) {
        console.log(error)
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false })
    }
}

const find_Ads = async (req, res) => {
    try {
        const query = { page_id: req.body.page_id, date: req.body.slot_Date }
        const findData = await adsService.find_Ads(query)
        if (findData.length == 0) {
            return res.status(statusCode.badRequest).json({ message: "data not find", status: false })

        } else {
            return res.status(statusCode.success).json({ message: "find data successfull", status: true, data: findData })
        }
    } catch (error) {
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false })
    }
}

const Total_booked_Ads = async (req, res) => {
    try {
        const query = {payment_Status:true,slot_id:req.body.slot_id}
        const findData = await booked_Ads_service.findBooked_ads(query)
        if (findData.length == 0) {
            return res.status(200).json({ message: "data not find", status: false })

        } else {
            return res.status(statusCode.success).json({ message: "find data successfull", status: true, data: findData })
        }
    } catch (error) {
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false })
    }
}

const pending_ads = async (req, res) => {
    try {
        const { slot_id } = req.body;

        const totalAds = await adsService.find_Ads();
        if (totalAds.length === 0) {
            return res.status(statusCode.badRequest).json({ message: "No ads found", status: false });
        } else {
            const slotQuery = {_id:slot_id}
            const slot = await slotServices.editSlot(slotQuery);
            if (!slot) {
                return res.status(statusCode.badRequest).json({ message: "Slot not found", status: false });
            }
            const query = { slot_id: slot_id,payment_Status:true};
            const total_booked_Ads = await bookedAdsServices.findBooked_ads(query);
            const pending_Ads = totalAds.length - total_booked_Ads.length;

            return res.status(statusCode.success).json({ message: "Found data successfully", status: true, data: pending_Ads });
        }
    } catch (error) {
        console.error(error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
}

const find_Ads_With_Booking_Status = async (req, res) => {
    try {
        const query = {
            page_id: req.body.page_id,
            slot_Date: req.body.slot_Date
        };
        const findData = await adsService.find_Ads_With_Booking_Status(query);
        if (findData.length === 0) {
            return res.status(statusCode.badRequest).json({ message: "Data not found", status: false });
        } else {
            return res.status(statusCode.success).json({ message: "Find data successful", status: true, data: findData });
        }
    } catch (error) {
        console.error("Error finding ads:", error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, status: false });
    }
}

module.exports = {
    createAds,
    find_Ads,
    Total_booked_Ads,
    pending_ads,
    find_Ads_With_Booking_Status
}