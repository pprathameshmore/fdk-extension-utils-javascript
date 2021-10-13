## Fdk Billing Javascript library

Easy integration of billing flow of Fynd Platform Extensions. This library will help in managing subscriptions for a Fynd Platform Extension. It will handle db activities and communicating with Fynd Platform for fetching subscription status.

#### How to use it? 

Initiate library instance using `setupBilling` method. Instance will provide certain methods which updates database on your extension.

##### Setup

```javascript
const { setupBilling } = require("fdk-billing-javascript");
const dbConnection = require("mongoose");

const fdkBillingInstance = setupBilling({
        extension_id: <API_KEY>,
        db_connection: dbConnection, // db connection instance
        collection_name: {
            plan: "plans",
            subscription: "seller_subscriptions"
        },
        orm_type: OrmType.MONGOOSE
    });

```

> `collection_name` contains name of collection/table which will be created when setup is done. 

#### How to create plans?

To create a new plan or update existing plans, `planModel` can be used exposed under `fdkBillingInstance`.

``` javascript
const { setupBilling, Plan } = require("fdk-billing-javascript");

const fdkBillingInstance = = setupBilling({
    ...
});
const newPlan = new Plan({
    ...
});
await fdkBillingInstance.planModel.createPlan(newPlan);

```

#### Available methods

##### getActivePlans

```javascript

async function getActivePlans(companyId) {
    ...
}

```
Returns: [[Plan](#Plan)]

It will fetch plans which are marked as active. `companyId` parameter is optional here. If passed only plans available for specific company will be returned.

---
##### subscribePlan

```javascript

async function subscribePlan(companyId, planId, platformClient, callbackUrl) {
    ...
}

```
Returns: [Subscription](#Subscription)

> Here `callbackUrl` parameter refers to redirect url after seller approves or declines extension charges. Usually it should be post api route used to call `updateSubscriptionStatus` method.

---
##### getActiveSubscription

```javascript

async function getActiveSubscription(companyId) {
    ...
}

```

Returns: [Subscription](#Subscription)

 It will return active subscription for a company.
 > Returns `null` if no active subscription is present for company.

---
##### updateSubscriptionStatus

```javascript

async function updateSubscriptionStatus(companyId, platformSubscriptionId, platformClient) {
    ...
}

```

Returns: [Subscription](#Subscription)

It will update subscription status on your database by fetching latest status from Fynd Platform subscription. 

>Status of subscription on Fynd Platform and subscription entry on your extension database should always match. Manual status updates are discouraged.

#### Models

##### [Plan](#Plan)

| Properties | Type | Description |
|-------|-----------|-------------|
| id | string | Unique plan id |
| name | string | Public name of plan |
| tagline | string | One line description of plan |
| company_id | [number] | Specific company list allowed for plan |
| is_active | boolean | True if plan is active |
| price | [Price](#price) | Price info for plan |
| features | [string] | List of features |
| yearly_plan | boolean | True if plan is for yearly subscription |
| created_at | string | ISO Date string when subscription is created |
| updated_at | string | ISO Date string when subscription is last modified |
| meta | object | Basic javascript object |


##### [Price](#Price)

| Properties | Type | Description |
|-------|-----------|-------------|
| amount | number | Price amount |
| currency | string | ISO 4217 Currency code |


##### [Subscription](#Subscription)

| Properties | Type | Description |
|-------|-----------|-------------|
| id | string | Unique subscription id |
| company_id | number | Subscribed company id |
| status | string | Current status of subscription |
| platform_subscription_id | string | Subscription id on Fynd Platform side |
| activated_on | string | ISO Date string when subscription is activated |
| cancelled_on | string | ISO Date string when subscription is cancelled |
| status | string | Current status of subscription |
| created_at | string | ISO Date string when subscription is created |
| updated_at | string | ISO Date string when subscription is last modified |
| meta | object | Basic javascript object |
