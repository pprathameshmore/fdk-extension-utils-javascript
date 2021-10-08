class Price {
    constructor(obj) {
        this.amount = obj.amount;
        this.currency = obj.currency;
    }
}
 
class Plan {
    constructor(obj) {
        this.id = (obj.id || obj._id).toString();
        this.name = obj.name;
        this.tagline = obj.tagline;
        this.company_id = obj.company_id;
        this.is_active = obj.is_active;
        this.price = obj.price? new Price(obj.price): obj.price;
        this.features = obj.features;
        this.yearly_plan = obj.yearly_plan;
        this.created_at = obj.created_at instanceof Date? obj.created_at.toISOString(): obj.created_at;
        this.updated_at = obj.updated_at instanceof Date? obj.updated_at.toISOString(): obj.updated_at;
        this.meta = obj.meta;
    }
}
 
module.exports = Plan;