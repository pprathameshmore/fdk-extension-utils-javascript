'use strict';

const { InterfaceError } = require("../../helpers/errors");

class BasePlanModel {
    constructor(model) {
        if(this.constructor === BasePlanModel) {
            throw new InterfaceError(`Instance can't be made of abstract class`);
        }
    }

    async getActivePlans(companyId) {
        throw new InterfaceError(`Not implemented`);
    }

    async getPlanById(planId) {
        throw new InterfaceError(`Not implemented`);
    }
}

module.exports = BasePlanModel;