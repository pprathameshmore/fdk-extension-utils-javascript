const PlanModel = require('./plan');
const SubscriptionModel = require('./subscription');
 
module.exports = (connection, collectionName) => {
    return {
        planModel: new PlanModel(connection, collectionName.plan),
        subscriptionModel: new SubscriptionModel(connection, collectionName.subscription)
    }
}
