'use strict';
class WebhookHandler {
    constructor(models) {
        this.model = models.subscriptionModel;
    }

    async handleExtensionSubscriptionUpdate(eventName, payload, companyId) {
        let success = false;
        let message = "";
        companyId = Number(companyId);
        const sellerSubscription = await this.model.getSubscriptionByPlatformId(payload._id, companyId);
        const existingSubscription = await this.model.getActiveSubscription(companyId);
        if (!sellerSubscription) {
            throw new Error(`Subscription not found with id ${payload._id}`);
        }
    
        let currentStatus = sellerSubscription.status;
        sellerSubscription.status = payload.status;
        
        if (currentStatus === 'pending' && sellerSubscription.status === 'active' ) {
            await this.model.activateSubscription(sellerSubscription.id, sellerSubscription.platform_subscription_id);
            if (existingSubscription) {
                await this.model.cancelSubscription(existingSubscription.id);
            }
            success = true;
            message = "Subscription activated";
        } else if (currentStatus === 'pending' && sellerSubscription.status === 'declined') {
            await this.model.removeSubscription(sellerSubscription.id);
            success = true;
            message = "Subscription request is declined by user";
        } else if (currentStatus === 'active' && sellerSubscription.status === 'cancelled') {
            await this.model.updateSubscription(sellerSubscription);
            success = true;
            message = "Subscription is cancelled by user";
        }
    };
}

module.exports = {
    WebhookHandler
}