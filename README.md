# Checkout

### Directory Structure

- `bin` - server specific configs like port, host
- `controllers` - contains sanitization steps, triggering models to calculate
- `datasets` - contains data of items, discount details, etc
- `models` - contains classes & functions to calculate logic
- `routes` - contain route files

### Logic

We have to make a system where anytime new discount criteria should be injected and be effective as immediate. So, I've created a file called `discount.json` under directory `datasets`, which contains the discount % which can be applied on or above minimum quntity specified.

We as business owner can define any discount, which at the end of the day has to be converted into mathematical form to be implemented. I'll take two examples given in the assignment.

- The marketing department believes in 2-for-1 promotions (buy two of the same product, get one free), and would like for there to be a 2-for-1 special on `VOUCHER` items.
__so in above example, if user buys 2 gets 1 free, mathematically we are offering discount of 33.33% on 3 qty.__
- The CFO insists that the best way to increase sales is with discounts on bulk purchases
(buying x or more of a product, the price of that product is reduced), and demands that if you
buy 3 or more `TSHIRT` items, the price per unit should be 19.00$.
__So, in above example we are selling tshirt at 20$ but if bought more than or equal to 3, then tshrit price becomes 19$. Here, if we see mathematically, we offered 5% discount to the user if he buys more >= 3 tshirts.__

So, at the end of the day we have to convert business discount to the mathematical formulae and implement in the code.

### Start The Server
- `clone or download the git folder`
- `npm install`
- `cd baqalaat`
- `npm start`
- __Curl the below given api's to see the output, also you can change input to see different output.__

### API

#### List all items `/checkout/inventory`
This api list all items present in our dataset.

###### Request Sample
```
curl --location --request GET 'localhost:3000/checkout/inventory'
```
###### Response:
```
{
    "items": {
        "VOUCHER": {
            "code": "VOUCHER",
            "name": "Baqalaat Voucher",
            "price": 5
        },
        "TSHIRT": {
            "code": "TSHIRT",
            "name": "Baqalaat T-Shirt",
            "price": 20
        },
        "MUG": {
            "code": "MUG",
            "name": "Baqalaat Coffee Mug",
            "price": 7.5
        }
    }
}
```

#### Calculate total based on items present in the cart `/checkout/total`
This api takes string input in request query, splits the items into array, calculate and returns total
###### Request Sample
```
curl --location --request GET 'localhost:3000/checkout/total?items=VOUCHER,TSHIRT,MUG'
```
###### Response
```
{
    "total": 32.5
}
```