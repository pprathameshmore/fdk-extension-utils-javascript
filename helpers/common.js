const { Connection } = require("mongoose");
const { OrmType } = require("./constants");

function omit(object, paths) {
    return Object.fromEntries(Object.entries(object).filter((key)=>!paths.includes(key)));
}

function getConnectionInstance(ormType) {
    return {
        [OrmType.MONGOOSE]: Connection
    }[ormType]
}

module.exports = {
    omit,
    getConnectionInstance
}