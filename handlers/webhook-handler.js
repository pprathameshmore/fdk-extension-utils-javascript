'use strict';
class WebhookHandler {
    constructor(models) {
        this.model = models;
    }

    async handleExtensionSubscriptionUpdate(eventName, payload, companyId) {
        companyId = Number(companyId);
        const sellerSubscription = await this.model.subscriptionModel.getSubscriptionByPlatformId(payload._id, companyId);
        const existingSubscription = await this.model.subscriptionModel.getActiveSubscription(companyId);
        if (!sellerSubscription) {
            throw new Error(`Subscription not found with id ${payload._id}`);
        }
    
        let currentStatus = sellerSubscription.status;
        sellerSubscription.status = payload.status;
        
        if (currentStatus === 'pending' && sellerSubscription.status === 'active' ) {
            await this.model.subscriptionModel.activateSubscription(sellerSubscription.id, sellerSubscription.platform_subscription_id);
            if (existingSubscription) {
                await this.model.subscriptionModel.cancelSubscription(existingSubscription.id);
            }
        } else if (currentStatus === 'pending' && sellerSubscription.status === 'declined') {
            await this.model.subscriptionModel.removeSubscription(sellerSubscription.id);
        } else if (currentStatus === 'active' && sellerSubscription.status === 'cancelled') {
            await this.model.subscriptionModel.updateSubscription(sellerSubscription);
        }
    };
}

module.exports = {
    WebhookHandler
}