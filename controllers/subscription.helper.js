'use strict';

module.exports = (config, models) => {

    const {
        subscriptionModel,
        planModel
    } = models;

    async function getActiveSubscription(companyId) {
        companyId = Number(companyId);
        const sellerSubscription = await subscriptionModel.getActiveSubscription(companyId);

        if (!sellerSubscription) {
            return null;
        }
        return sellerSubscription;
    };

    async function subscribePlan(companyId, clusterId, planId, platformClient, callbackUrl) {
        companyId = Number(companyId);
        const plan = await planModel.getPlanById(planId);
        let response = await platformClient.billing.createSubscriptionCharge({
            extensionId: config.extension_id,
            body: {
                name: plan.name,
                line_items: [
                    {
                        name: plan.name,
                        term: plan.tagline,
                        price: {
                            amount: plan.price.amount,
                            currency_code: plan.price.currency
                        },
                        pricing_type: plan.pricing_type || 'recurring',
                        recurring: {
                            interval: plan.interval
                        }
                    }
                ],
                return_url: callbackUrl
            }
        });
        await subscriptionModel.createSubscription(
            companyId,
            planId,
            response.subscription._id,
            clusterId,
        );
        return {
            platform_subscription_id: response.subscription._id,
            redirect_url: response.confirm_url
        }
    };

    async function updateSubscriptionStatus(companyId, platformSubscriptionId, platformClient) {
            let success = false;
            let message = "";
            companyId = Number(companyId);
            const sellerSubscription = await subscriptionModel.getSubscriptionByPlatformId(platformSubscriptionId, companyId);
            const existingSubscription = await subscriptionModel.getActiveSubscription(companyId);
            if (!sellerSubscription) {
                return {
                    success: success,
                    seller_subscription: sellerSubscription,
                    message: `Subscription not found with id ${platformSubscriptionId}`
                }
            }
            const platformSubscriptionData = await platformClient.billing.getSubscriptionCharge({
                "extensionId": config.extension_id,
                "subscriptionId": sellerSubscription.platform_subscription_id.toString()
            });
            if (!platformSubscriptionData) {
                return {
                    success: success,
                    seller_subscription: sellerSubscription,
                    message: `Subscription not found on Fynd Platform with id ${platformSubscriptionId}`
                }
            }
            sellerSubscription.status = platformSubscriptionData.status;
            if (sellerSubscription.status === 'active') {
                await subscriptionModel.activateSubscription(sellerSubscription.id, sellerSubscription.platform_subscription_id);
                if (existingSubscription) {
                    await subscriptionModel.cancelSubscription(existingSubscription.id);
                }
                success = true;
                message = "Subscription activated";
            }
            else {
                // for now remove subscription entry as it was not accepted
                await subscriptionModel.removeSubscription(sellerSubscription.id);
                message = "Subscription request is declined by user";
            }
            return {
                success: success,
                seller_subscription: sellerSubscription,
                message: message
            };
    };

    async function getActivePlans(companyId) {
        const plans = await planModel.getActivePlans(companyId);
        return { 
            plans: plans 
        };
    }

    return {
        getActivePlans,
        subscribePlan,
        getActiveSubscription,
        updateSubscriptionStatus
    };
};