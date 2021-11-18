module.exports = (connection, collectioName, ormType) => {
    const { planModel, subscriptionModel } = require(`./${ormType}/`)(connection, collectioName);
    return {
        planModel,
        subscriptionModel
    }
}