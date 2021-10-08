const { setupBilling, OrmType } = require("../../index");
const { dbConnection } = require("./setup_db");

module.exports = (settings) => {
    return setupBilling({
        extension_id: "API_KEY",
        db_connection: dbConnection,
        collection_name: {
            plan: "test_plan",
            subscription: "test_subscription"
        },
        orm_type: OrmType.MONGOOSE,
        ...settings
    });
};