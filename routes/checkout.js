const express = require('express');
const router = express.Router();
const checkoutController = require("../controllers/checkout");

/* GET products listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/inventory', function(req, res, next) {
    const result = checkoutController.inventory(req.body.cartItems);
    if (result.error){
	    res.status(result.code).send(result.error);
    }else {
    	res.status(result.code).send(result.result);
    }
});

router.get('/total', function(req, res, next) {
    const result = checkoutController.checkout(req.query.items.split(","));
    if (result.error){
    	console.error("e : ", result.error)
	    res.status(result.code).send(result.error);
    }else {
    	res.status(result.code).send(result.result);
    }
});

module.exports = router;