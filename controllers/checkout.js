const CheckoutModel = require("../models/checkout");
const HttpStatus = require('http-status-codes');
const inventory = require('../datasets/data.json');


// this function calculates the total price with discount offered
module.exports.checkout = (payload) => {
    try {
        const cartItems = payload.items.split(",");
        let result = null,
            code = HttpStatus.OK,
            err = null;

        // input validation
        
        if (Array.isArray(cartItems) && cartItems.length) {
            const total = new CheckoutModel(cartItems);
            result = { "total": total.calculate() };
        } else {
            code = HttpStatus.BAD_REQUEST
            err = "Invalid input, please refer to README.md"
        }

        return {
            "code": code,
            "result": result,
            "error": err
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
