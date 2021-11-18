'use strict';

const BaseSubscriptionModel = require("../../../../models/base-models/base_subscription_model");
const fdkBillingHelper = require("../../../helpers/fdk_billing");
const { InterfaceError }= require("../../../../helpers/errors");

describe("Base Subscription model", () => {

    beforeEach(async () => {
        this.fdk_billing_instance = await fdkBillingHelper();
    });

    it("Base class instance creation fail", async () => {
        let baseSubscriptionInstance = null;
        let creationFailed = false;
        try {
            baseSubscriptionInstance = new BaseSubscriptionModel(null);
        }
        catch(err) {
            if (err instanceof InterfaceError) {
                creationFailed = true;
            }
        }
        expect(baseSubscriptionInstance).toBeNull();
        expect(creationFailed).toBeTrue();
    });
});