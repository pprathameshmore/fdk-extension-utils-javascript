'use strict';

const fdkBillingHelper = require("../../../helpers/fdk_billing");
const { clearData } = require("../../../helpers/setup_db");
const subscriptionFixture = require("../../../fixtures/subscription");
const ObjectId = require("mongoose").Types.ObjectId;
const Subscription = require("../../../../models/entities/subscription");
const { EntityCastError } = require("../../../../helpers/errors");

describe("Subscription mongoose model", () => {

    beforeEach(async () => {
        this.fdk_billing_instance = await fdkBillingHelper();
    });

    afterEach(async () => {
        await clearData();
    });

    it("Get subscription by id", async () => {
        const dbSubscription = await this.fdk_billing_instance.subscriptionModel.model.create({
            ...subscriptionFixture,
            plan_id: new ObjectId()
        });
        const data = await this.fdk_billing_instance.subscriptionModel.getSubscriptionById(dbSubscription._id.toString());
        expect(data instanceof Subscription).toBeTrue();
        expect(data.id).toBe(dbSubscription._id.toString());
    });

    it("Get subscription by id: Not found", async () => {
        const data = await this.fdk_billing_instance.subscriptionModel.getSubscriptionById((new ObjectId()).toString());
        expect(data).toBeNull();
    });

    it("Update subscription", async () => {
        await this.fdk_billing_instance.subscriptionModel.model.create({
            ...subscriptionFixture,
            plan_id: new ObjectId()
        });
        const data = await this.fdk_billing_instance.subscriptionModel.updateSubscription({...subscriptionFixture, meta: {"test_key": true}});
        expect(data instanceof Subscription).toBeTrue();
        expect(data.meta.test_key).toBeTrue();
    });

    it("Invalid subscription object error", async () => {
        let parsingFailed = false;
        try {
            let subscriptionInstance = new Subscription({
                ...subscriptionFixture,
                id: "abc",
                plan_id: 123
            });
        }
        catch(err) {
            if (err instanceof EntityCastError) {
                parsingFailed = true;
            }
        }
        expect(parsingFailed).toBeTrue();
    });
});