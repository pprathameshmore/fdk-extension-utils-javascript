'use strict';

const fdkBillingHelper = require("../../../helpers/fdk_billing");
const { clearData } = require("../../../helpers/setup_db");
const planFixture = require("../../../fixtures/plan");
const ObjectId = require("mongoose").Types.ObjectId;
const Plan = require("../../../../models/entities/plan");

describe("Plan mongoose model", () => {

    beforeEach(async () => {
        this.fdk_billing_instance = await fdkBillingHelper();
    });

    afterEach(async () => {
        await clearData();
    });

    it("Get active plans for company", async () => {
        await this.fdk_billing_instance.planModel.model.create({
            ...planFixture,
            company_id: [1,2]
        });
        const data = await this.fdk_billing_instance.getActivePlans(2);
        expect(data.plans.length).toBeGreaterThan(0);
        expect(data.plans[0] instanceof Plan).toBeGreaterThan(0);
    });

    it("Get plan by id: Not found", async () => {
        const planId = ObjectId();
        const data = await this.fdk_billing_instance.planModel.getPlanById(planId);
        expect(data).toBeNull();
    });

    it("Create a new plan", async () => {
        const data = await this.fdk_billing_instance.planModel.createPlan({...planFixture});
        expect(data instanceof Plan).toBeTrue();
    });

    it("Update a existing plan", async () => {
        const dbPlan = await this.fdk_billing_instance.planModel.model.create({
            ...planFixture,
            company_id: [1,2]
        });
        const data = await this.fdk_billing_instance.planModel.updatePlan(dbPlan._id.toString(), {name: "Test plan"});
        expect(data instanceof Plan).toBeTrue();
        expect(data.name).toBe("Test plan");
    });
});