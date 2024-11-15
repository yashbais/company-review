
const { shortUniquId } = require("../sharedCode/config/requireConfig").requireConfig;
const cosmosDBUtils = require("../sharedCode/CosmosDBUtils");
const GlobalConstants = require("../sharedCode/GlobalConstants");
const dateUtils = require("../sharedCode/utils/DateUtils");

module.exports = async function (context, req) {
    let responseMessage = { data: {} };

    try {

        const { companyName, companyFoundedOn, location, city } = req.body

        if (companyName && companyFoundedOn && location && city) {

            const uniqueID = new shortUniquId({ length: 5 });
            const dateCreated = dateUtils.dateCreated()
            const data = {
                companyName, companyFoundedOn, location, city,
                companyId : uniqueID(),
                dateCreated,
                reviews : []
            }

            const companyData = await cosmosDBUtils.executeCreateQuery(cosmosDBUtils.cosmosContainer.Company, data);
            if (companyData) {
                responseMessage.data = data
                responseMessage.statusCode = GlobalConstants.GlobalConstant.SUCCESS_STATUS.Code;
                responseMessage.message = GlobalConstants.GlobalConstant.SUCCESS_STATUS.Message;
            } else {
                responseMessage.statusCode = GlobalConstants.GlobalConstant.SOMETHING_WENT_WRONG_ERROR.Code;
                responseMessage.message = GlobalConstants.GlobalConstant.SOMETHING_WENT_WRONG_ERROR.Message;
            }


        } else {
            responseMessage.statusCode = GlobalConstants.GlobalConstant.REQUIRED_INPUT_DATA_MISSING.Code;
            responseMessage.message = GlobalConstants.GlobalConstant.REQUIRED_INPUT_DATA_MISSING.Message;
        }

    } catch (error) {
        responseMessage.statusCode = GlobalConstants.GlobalConstant.INTERNAL_SERVER_ERROR.Code;
        responseMessage.message = GlobalConstants.GlobalConstant.INTERNAL_SERVER_ERROR.Message;

    }

    context.res = {
        body: responseMessage
    };
}