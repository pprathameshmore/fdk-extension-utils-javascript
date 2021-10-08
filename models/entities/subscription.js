class Subscription {
    constructor(obj) {
        this.id = (obj.id || obj._id).toString();
        this.company_id = obj.company_id;
        this.status = obj.status;
        this.platform_subscription_id = obj.platform_subscription_id.toString();
        this.activated_on = obj.activated_on instanceof Date? obj.activated_on.toISOString(): obj.activated_on;
        this.cancelled_on = obj.cancelled_on instanceof Date? obj.cancelled_on.toISOString(): obj.cancelled_on;
        this.created_at = obj.created_at instanceof Date? obj.created_at.toISOString(): obj.created_at;
        this.updated_at = obj.updated_at instanceof Date? obj.updated_at.toISOString(): obj.updated_at;
        this.meta = obj.meta;
    }
}

module.exports = Subscription;