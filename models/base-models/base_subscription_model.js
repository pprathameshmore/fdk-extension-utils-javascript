'use strict';

const { InterfaceError } = require("../../helpers/errors");

class BaseSubscriptionModel {
    constructor(model) {
        if (this.constructor === BaseSubscriptionModel) {
            throw new InterfaceError(`Instance can't be made of abstract class`);
        }
    }

    async getActiveSubscription(companyId) {
        throw new InterfaceError(`Not implemented`);
    }

    async getSubscriptionById(subscriptionId) {
        throw new InterfaceError(`Not implemented`);
    }
    
    async getSubscriptionByPlatformId(platformSubscriptionId, companyId) {
        throw new InterfaceError(`Not implemented`);
    }

    async createSubscription(companyId, planId, platformSubscriptionId) {
        throw new InterfaceError(`Not implemented`);
    }

    async activateSubscription(subscriptionId, platformSubscriptionId) {
        throw new InterfaceError(`Not implemented`);
    }

    async cancelSubscription(subscriptionId) {
        throw new InterfaceError(`Not implemented`);
    }
}

module.exports = BaseSubscriptionModel;