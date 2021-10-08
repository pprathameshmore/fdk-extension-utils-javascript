'use strict';
 
class BasePlanModel {
    constructor(connection, collectionName) {
        throw InterfaceError("Not implemeneted");
    }
 
    async getActivePlans(companyId) {
        throw InterfaceError("Not implemeneted");
    }
 
    async getPlanById(planId) {
        throw InterfaceError("Not implemeneted");
    }
 
    async createPlan(planData) {
        throw InterfaceError("Not implemeneted");
    }
 
    async updatePlan(planId, planData) {
        throw InterfaceError("Not implemeneted");
    }
}
 
module.exports = PlanModel;
