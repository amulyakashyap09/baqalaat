const CheckoutModel = require("../models/checkout");
const HttpStatus = require('http-status-codes');
const inventory = require('../datasets/data.json');


// this function calculates the total price with discount offered
module.exports.checkout = (cartItems) => {
    try {
        const total = new CheckoutModel(cartItems);
        return {
            "code": HttpStatus.OK,
            "result": { "total": total.calculate() },
            "error": null
        }
    } catch (e) {
        return {
            "code": HttpStatus.INTERNAL_SERVER_ERROR,
            "result": null,
            "error": e
        }
    }
}


// this function list the all items present in the db
module.exports.inventory = () => {
    return {
        "code": HttpStatus.OK,
        "result": { "items": inventory },
        "error": null
    }
}