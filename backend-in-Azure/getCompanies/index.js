require("../sharedCode/config/requireConfig").requireConfig;
const cosmosDBUtils = require("../sharedCode/CosmosDBUtils");
const cosmosDBQueries = require("../sharedCode/CosmosDBQueries");
const GlobalConstants = require("../sharedCode/GlobalConstants");
const {  COMPANY_CONTAINER } = require("../sharedCode/config/envConfig").envConfig;


module.exports = async function (context, req) {
    let responseMessage = { data: {} };

    try {

        let SQL_GET_COMPANY = await cosmosDBQueries.getListCompanies(COMPANY_CONTAINER);
        const companies = await cosmosDBUtils.executeGetQuery(cosmosDBUtils.cosmosContainer.Company, SQL_GET_COMPANY);

        if (companies) {
            responseMessage.data = companies
            responseMessage.statusCode = GlobalConstants.GlobalConstant.SUCCESS_STATUS.Code;
            responseMessage.message = GlobalConstants.GlobalConstant.SUCCESS_STATUS.Message;
        } else {
            responseMessage.data = []
            responseMessage.statusCode = GlobalConstants.GlobalConstant.DATA_NOT_AVAILABLE.Code;
            responseMessage.message = GlobalConstants.GlobalConstant.DATA_NOT_AVAILABLE.Message;
        }

    } catch (error) {
        responseMessage.data = []
        responseMessage.statusCode = GlobalConstants.GlobalConstant.INTERNAL_SERVER_ERROR.Code;
        responseMessage.message = GlobalConstants.GlobalConstant.INTERNAL_SERVER_ERROR.Message;

    }

    context.res = {
        body: responseMessage
    };
}