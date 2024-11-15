const CosmosClientInterface = require("@azure/cosmos").CosmosClient;
const { DATABASE, DB_ENDPOINT, DB_AUTHKEY, COMPANY_CONTAINER } = require("../sharedCode/config/envConfig").envConfig;
const cosmosClient = new CosmosClientInterface({ endpoint: DB_ENDPOINT, key: DB_AUTHKEY, consistencyLevel: "Session" });

exports.cosmosContainer = {
    Company: cosmosClient.database(DATABASE).container(COMPANY_CONTAINER),
};

exports.executeGetQuery = async (container, getQuerySpec) => {
    try {
        const { resources: results } = await container.items.query(getQuerySpec).fetchAll();
        return results;
    } catch (error) {
        return error;
    }
};

exports.executeCreateQuery = async (container, data) => {
    try {
        const { resource: createResponse } = await container.items.create(data);
        return createResponse;
    } catch (error) {
        return error;
    }
};

exports.executeUpdateQuery = async (container, data) => {
    try {
        const { resource: updateResponse } = await container.items.upsert(data);
        return updateResponse;
    } catch (error) {
        return error;
    }
};
