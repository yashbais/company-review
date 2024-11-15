
const { shortUniquId } = require("../sharedCode/config/requireConfig").requireConfig;
const cosmosDBUtils = require("../sharedCode/CosmosDBUtils");
const GlobalConstants = require("../sharedCode/GlobalConstants");
const cosmosDBQueries = require("../sharedCode/CosmosDBQueries");
const dateUtils = require("../sharedCode/utils/DateUtils");
const {  COMPANY_CONTAINER } = require("../sharedCode/config/envConfig").envConfig;

module.exports = async function (context, req) {
    let responseMessage = { data: {} };

    try {

        const { fullName, subject, reviewText, rating, companyId } = req.body

        if (fullName && subject && reviewText && rating && companyId) {

            let SQL_GET_COMPANY = await cosmosDBQueries.getSingleCompany(COMPANY_CONTAINER, companyId);
            const [singleCompany] = await cosmosDBUtils.executeGetQuery(cosmosDBUtils.cosmosContainer.Company, SQL_GET_COMPANY);

            if(singleCompany){

                const uniqueID = new shortUniquId({ length: 5 });
                const dateCreated = dateUtils.dateCreated()

                const data = {
                    fullName, subject, reviewText, rating ,
                    dateCreated ,
                    reviewId : uniqueID()
                }

                singleCompany.reviews.push(data)

                const companyData = await cosmosDBUtils.executeUpdateQuery(cosmosDBUtils.cosmosContainer.Company, singleCompany);
                if (companyData) {
                    responseMessage.data = data
                    responseMessage.statusCode = GlobalConstants.GlobalConstant.SUCCESS_STATUS.Code;
                    responseMessage.message = GlobalConstants.GlobalConstant.SUCCESS_STATUS.Message;
                } else {
                    responseMessage.statusCode = GlobalConstants.GlobalConstant.SOMETHING_WENT_WRONG_ERROR.Code;
                    responseMessage.message = GlobalConstants.GlobalConstant.SOMETHING_WENT_WRONG_ERROR.Message;
                }
    
            }else{
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