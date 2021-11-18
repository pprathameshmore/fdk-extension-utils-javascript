'use strict';
// require('../init');
// global mock import should be always first to work mocking.
// const globalMock = require("./mocks/global.mock");

const logger = require("./utils/logger");

const db = require("./helpers/setup_db");
const mongoose = require("mongoose");

beforeAll(async () => {
    logger.info("beforeAll:started");
    //jasmine.addMatchers(jsonSchemaMatcher);
    logger.info("beforeAll:completed");
    // done();
}, 50000);

afterAll(async () => {
    logger.info("afterAll:started");
    // globalMock.restore();
    await db.clearData();
    await mongoose.disconnect();
    logger.info("afterAll:completed");
    // done();
}, 20000);