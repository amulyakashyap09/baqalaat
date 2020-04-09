const express = require('express');
const router = express.Router();
const checkoutController = require("../controllers/checkout");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET products listing. */

router.get('/inventory', function(req, res, next) {
    const result = checkoutController.inventory(req.body.cartItems);
    if (result.error){
	    res.status(result.code).send(result.error);
    }else {
    	res.status(result.code).send(result.result);
    }
});

/* GET total of items in the carts. */

router.get('/total', function(req, res, next) {
    const result = checkoutController.checkout(req.query);
    if (result.error){
    	console.error("e : ", result.error)
	    res.status(result.code).send(result.error);
    }else {
    	res.status(result.code).send(result.result);
    }
});

module.exports = router;
