'use strict';

const BasePlanModel = require("../../../../models/base-models/base_plan_model");
const fdkBillingHelper = require("../../../helpers/fdk_billing");
const { InterfaceError }= require("../../../../helpers/errors");

describe("Base Plan model", () => {

    beforeEach(async () => {
        this.fdk_billing_instance = await fdkBillingHelper();
    });

    it("Base class instance creation fail", async () => {
        let basePlanInstance = null;
        let creationFailed = false;
        try {
            basePlanInstance = new BasePlanModel(null);
        }
        catch(err) {
            if (err instanceof InterfaceError) {
                creationFailed = true;
            }
        }
        expect(basePlanInstance).toBeNull();
        expect(creationFailed).toBeTrue();
    });
});