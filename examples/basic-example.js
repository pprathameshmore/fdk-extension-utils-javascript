'use strict';

const express = require('express');
const { setupBilling, OrmType } = require("fdk-extension-utils-javascript");
const mongooseConnection = mongoose.createConnection("mongodb://localhost:27017"); // ORM connection object

let FDKBilling = setupBilling({
    extension_id: "",
    db_connection: mongooseConnection, 
    collection_name: {
        plan: "plans",
        subscription: "seller_subscriptions"
    },
    orm_type: OrmType.MONGOOSE
});


const subscriptionRouter = express.Router({mergeParams: true});

// get list of active plans for pricing page
subscriptionRouter.get("/plans", async (req, res, next) => {
    try {
        const plans = await FDKBilling.getActivePlans();
        res.json({plans: plans});
    }
    catch(err) {
        next(err);
    }
});

// get active subscription for company
subscriptionRouter.get("/subscription", async (req, res, next) => {
    try {
        const { params } = req;
        const activeSubscription = await FDKBilling.getActiveSubscription(Number(params.company_id));
        res.json(activeSubscription);
    }
    catch(err) {
        next(err);
    }
});

// start subscription process for a company
subscriptionRouter.post("/subscription/:plan_id", async (req, res, next) => {
    try {
        const { params, platformClient } = req;
        let callbackUrl = `${config.BROWSER_CONFIG.HOST_MAIN_URL}/company/${params.company_id}/subscription_status`;
        const subscriptionMeta = await FDKBilling.subscribePlan(params.company_id, params.plan_id, platformClient, callbackUrl);
        res.json(subscriptionMeta);
    }
    catch(err) {
        next(err);
    }
});

// update subscription status from Fynd Platform side for company after user consent
subscriptionRouter.post("/subscription/:platform_subscription_id/status", async (req, res, next) => {
    try {
        const { params, platformClient } = req;
        const subscriptionMeta = await FDKBilling.updateSubscriptionStatus(params.company_id, params.platform_subscription_id, platformClient);
        if(!subscriptionMeta.success) {
            return res.status(400).json({"message": subscriptionMeta.message});
        }
        res.json(subscriptionMeta.seller_subscription);
    }
    catch(err) {
        next(err);
    }
});

module.exports = subscriptionRouter;
