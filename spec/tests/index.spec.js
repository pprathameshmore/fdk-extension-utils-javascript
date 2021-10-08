'use strict';

const { setupBilling } = require("../../index");
const { dbConnection } = require("../helpers/setup_db");



describe("Setup Billing function verifications", () => {

    it("Missing initial config", async () => {
        let errorMsg = "";
        try {
            setupBilling()
        }
        catch(err) {
            errorMsg = err.message;
        }
        
        expect(errorMsg).toBe("Missing config for setup");
    });

    it("Missing Extension Id", async () => {
        let errorMsg = "";
        try {
            setupBilling({})
        }
        catch(err) {
            errorMsg = err.message;
        }
        
        expect(errorMsg).toBe("`extension_id` is required");
    });

    it("Missing db connection", async () => {
        let errorMsg = "";
        try {
            setupBilling({
                extension_id: "API_KEY"
            })
        }
        catch(err) {
            errorMsg = err.message;
        }
        
        expect(errorMsg).toBe("`db_connection` is required");
    });

    it("Invalid collection_name", async () => {
        let errorMsg = "";
        try {
            setupBilling({
                extension_id: "API_KEY",
                db_connection: dbConnection
            })
        }
        catch(err) {
            errorMsg = err.message;
        }
        expect(errorMsg).toBe("`collection_name` is required");

        try {
            setupBilling({
                extension_id: "API_KEY",
                db_connection: dbConnection,
                collection_name: {}
            })
        }
        catch(err) {
            errorMsg = err.message;
        }
        expect(errorMsg).toBe("`collection_name.plan` is required");

        try {
            setupBilling({
                extension_id: "API_KEY",
                db_connection: dbConnection,
                collection_name: {plan: "test_plan"}
            })
        }
        catch(err) {
            errorMsg = err.message;
        }
        expect(errorMsg).toBe("`collection_name.subscription` is required");
    });
    
    it("Non supported orm type", async () => {
        let errorMsg = "";
        try {
            setupBilling({
                extension_id: "API_KEY",
                db_connection: dbConnection,
                collection_name: {plan: "test_plan", subscription: "test_subscription"},
                orm_type: "abc"
            })
        }
        catch(err) {
            errorMsg = err.message;
        }
        
        expect(errorMsg).toBe("`orm_type` value is invalid. Allowed values are: mongoose");
    });

});