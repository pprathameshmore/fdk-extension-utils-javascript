'use strict';

const { InterfaceError } = require("../../helpers/errors");

class BaseSubscriptionModel{
    constructor(connection, collectionName) {
        
        throw InterfaceError("Not implemeneted");
    }
 
    async getActiveSubscription(companyId) {
        throw InterfaceError("Not implemeneted");
    }
 
    async getSubscriptionById(subscriptionId) {
        throw InterfaceError("Not implemeneted");
    }
 
    async getSubscriptionByPlatformId(platformSubscriptionId, companyId) {
        throw InterfaceError("Not implemeneted");
    }
 
    async createSubscription(companyId, planId, platformSubscriptionId) {
        throw InterfaceError("Not implemeneted");
    }
 
    async updateSubscription(subscription) {
        throw InterfaceError("Not implemeneted");
    }
 
    async removeSubscription(subscriptionId) {
        throw InterfaceError("Not implemeneted");
    }
 
    async activateSubscription(subscriptionId, platformSubscriptionId) {
        throw InterfaceError("Not implemeneted");
    }
 
    async cancelSubscription(subscriptionId) {
        throw InterfaceError("Not implemeneted");
    }
}
 
module.exports = SubscriptionModel;