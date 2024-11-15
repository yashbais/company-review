exports.getListCompanies = (COMPANY_CONTAINER) => {
    return querySpec = {
        query: "SELECT * FROM " + COMPANY_CONTAINER,
        parameters: [],
    }
}

exports.getSingleCompany = (COMPANY_CONTAINER,companyId) => {
    return querySpec = {
        query: "SELECT * FROM " + COMPANY_CONTAINER  + " c WHERE c.companyId = @companyId",
        parameters: [
            {
                name: "@companyId",
                value: companyId
            }
        ],
    }
}