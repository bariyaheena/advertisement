const pageService = require('../services/pageServices');
const { message, statusCode } = require('../utils/message');
const moment = require('moment');

const createPage = async (req, res) => {
    try {
        const findSlot = await pageService.findpage();

        if (!req.body.pageDate) {
            return res.status(statusCode.badRequest).json({ message: "page date is required", statuscode: statusCode.badRequest, status: false });
        }

        const parsedDate = moment(req.body.pageDate, 'DD-MM-YYYY', true);
        if (!parsedDate.isValid()) {
            return res.status(statusCode.badRequest).json({ message: "Invalid date format", statuscode: statusCode.badRequest, status: false });
        }
        const formattedDate = parsedDate.format('YYYY-MM-DD');
        const data = {
            page: findSlot.length + 1,
            pageDate: formattedDate,
            status: req.body.status,
        };
        const saveSlot = await pageService.createpage(data);
        return res.status(statusCode.success).json({ message: "Create page successful", statuscode: statusCode.success, status: true, data: saveSlot });
    } catch (error) {
        console.log(error);
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statuscode: statusCode.badRequest, status: false });
    }
};


const pageList = async (req, res) => {
    try {
        const findData = await pageService.findpage()
        return res.status(statusCode.success).json({ message: "find all slots", statuscode: statusCode.success, status: true, data: findData })

    } catch (error) {
        console.log(error)
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statuscode: statusCode.badRequest, status: false })
    }
}
const booked_page = async (req, res) => {
    try {
        const falseData = await pageService.findpage();
        const falseCount = falseData.length;

        const trueQuery = { status: true };
        const trueData = await pageService.findpage(trueQuery);
        const trueCount = trueData.length;

        const totalCount = trueCount + falseCount;
        const truePercentage = (trueCount / totalCount) * 100;
        const falsePercentage = (falseCount / totalCount) * 100;

        return res.status(statusCode.success).json({ 
            message: "Find all slots", 
            statuscode: statusCode.success, 
            status: true, 
            totalCount:totalCount,
            truePercentage: truePercentage,
            falsePercentage: falsePercentage
        });

    } catch (error) {
        console.log(error);
        return res.status(statusCode.badRequest).json({ 
            message: message.commonMessage.serverError, 
            statuscode: statusCode.badRequest, 
            status: false 
        });
    }
}

const findOnepage = async (req, res) => {
    try {
        const query = { _id: req.query._id }
        const findData = await pageService.findOnepage(query)
        return res.status(statusCode.success).json({ message: "find all slots", statuscode: statusCode.success, status: true, data: findData })

    } catch (error) {
        console.log(error)
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statuscode: statusCode.badRequest, status: false })
    }
}

const deletepage = async (req, res) => {
    try {
        const query = { _id: req.body._id }
        const deleteData = await pageService.deletepage(query)
        return res.status(statusCode.success).json({ message: "delete slot successfull", statuscode: statusCode.success, status: true, data: deleteData })

    } catch (error) {
        console.log(error)
        return res.status(statusCode.badRequest).json({ message: message.commonMessage.serverError, statuscode: statusCode.badRequest, status: false })
    }
}



module.exports = {
    createPage,
    pageList,
    booked_page,
    findOnepage,
    deletepage
}


