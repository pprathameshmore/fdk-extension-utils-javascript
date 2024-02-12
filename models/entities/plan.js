
const Joi = require("joi");
const { PlanInterval, PricingType } = require("../../helpers/constants");
const { EntityCastError } = require("../../helpers/errors");

class Price {
    constructor(obj) {
        this.amount = obj.amount;
        this.currency = obj.currency;
    }
}

const priceSchema = Joi.object().keys({
    amount: Joi.number().required(),
    currency: Joi.string().required(),
});

const planSchema = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    tagline: Joi.string().required(),
    company_id: Joi.array().items(Joi.number()),
    is_active: Joi.boolean().required(),
    price: priceSchema,
    features: Joi.array().items(Joi.string()).required(),
    pricing_type: Joi.string().valid(...Object.values(PricingType)),
    interval: Joi.string().valid(...Object.values(PlanInterval)).required(),
    created_at: Joi.string(),
    updated_at: Joi.string(),
    meta: Joi.object(),
    cluster_id: Joi.string()
});

class Plan {
    constructor(obj) {
        this.id = (obj.id || obj._id).toString();
        this.name = obj.name;
        this.tagline = obj.tagline;
        this.company_id = obj.company_id;
        this.is_active = obj.is_active;
        this.price = obj.price? new Price(obj.price): obj.price;
        this.features = obj.features;
        this.pricing_type = obj.pricing_type || 'recurring';
        this.interval = obj.interval;
        this.created_at = obj.created_at instanceof Date? obj.created_at.toISOString(): obj.created_at;
        this.updated_at = obj.updated_at instanceof Date? obj.updated_at.toISOString(): obj.updated_at;
        this.meta = obj.meta;
        this.cluster_id = obj.cluster_id;
        this.validate();
    }
    validate(){
        const validateResult = planSchema.validate(this);
        if (validateResult.error) {
            throw new EntityCastError(validateResult.error)
        }
    }
}

module.exports = Plan;