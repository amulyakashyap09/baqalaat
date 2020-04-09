const inventory = require('../datasets/data.json');
const discounts = require('../datasets/discount.json');

module.exports = class Checkout {

    constructor(itemsInCart) {
        this._itemsInCart = itemsInCart;
    }

    calculate() {

        try {

            const qtyMap = {};
            const priceMap = {};
            let total = 0;
            const validItems = Object.keys(inventory);


            //count the items and map them

            for (let item of this._itemsInCart) {

                item = item.toUpperCase();
                if (validItems.indexOf(item) > -1) {
                    if (!(item in qtyMap)) {
                        qtyMap[item] = 1;
                    } else {
                        qtyMap[item] += 1;
                    }
                } else {
                    console.log("invalid item.toUpperCase() .. ", item)
                }
            }

            // calculate discount

            for (let [item, qty] of Object.entries(qtyMap)) {

                if (inventory[item]) {

                    if (discounts[item] && qty >= discounts[item].minQty) {
                        const originalPrice = qty * inventory[item].price;
                        const discountedPrice = (originalPrice * discounts[item].discount) / 100;
                        priceMap[item] = originalPrice - discountedPrice;
                        total += Math.round((priceMap[item] + Number.EPSILON) * 100) / 100;
                    } else {
                        total += qty * inventory[item].price;
                    }
                }
            }

            return total;

        } catch (e) {
            throw e;
        }
    }
}

// const output = new Checkout(["VOUCHER", "TSHIRT", "MUG"])
// const output = new Checkout(["VOUCHER", "TSHIRT", "VOUCHER", "VOUCHER"]);
// const output = new Checkout(["TSHIRT", "TSHIRT", "TSHIRT", "VOUCHER", "TSHIRT"]);
// const output = new Checkout(["VOUCHER", "TSHIRT", "VOUCHER", "VOUCHER", "MUG", "TSHIRT", "TSHIRT"]);
// console.log(output.calculate())