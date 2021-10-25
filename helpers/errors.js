class InterfaceError extends Error {
    constructor(message) {
        super(message);
    }
}

class EntityCastError extends Error {
    constructor(error) {
        super(error.details.map(err=>err.message).join(", "));
    }
}

module.exports = {
    InterfaceError,
    EntityCastError
};