function omit(object, paths) {
    return Object.fromEntries(Object.entries(object).filter((key)=>!paths.includes(key)));
}

module.exports = {
    omit
}