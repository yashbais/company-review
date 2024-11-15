require("../sharedCode/config/requireConfig").requireConfig;
const cosmosDBUtils = require("../sharedCode/CosmosDBUtils");
const cosmosDBQueries = require("../sharedCode/CosmosDBQueries");
const GlobalConstants = require("../sharedCode/GlobalConstants");
const {  COMPANY_CONTAINER } = require("../sharedCode/config/envConfig").envConfig;


module.exports = async function (context, req) {
    let responseMessage = { data: {} };

    try {

        const { companyId} = req.query

        if (companyId ) {

            let SQL_GET_COMPANY = await cosmosDBQueries.getSingleCompany(COMPANY_CONTAINER, companyId);
            const [singleCompany] = await cosmosDBUtils.executeGetQuery(cosmosDBUtils.cosmosContainer.Company, SQL_GET_COMPANY);

            if (singleCompany) {
                responseMessage.data = singleCompany
                responseMessage.statusCode = GlobalConstants.GlobalConstant.SUCCESS_STATUS.Code;
                responseMessage.message = GlobalConstants.GlobalConstant.SUCCESS_STATUS.Message;
            } else {
                responseMessage.statusCode = GlobalConstants.GlobalConstant.DATA_NOT_AVAILABLE.Code;
                responseMessage.message = GlobalConstants.GlobalConstant.DATA_NOT_AVAILABLE.Message;
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