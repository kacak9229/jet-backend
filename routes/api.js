/* Module dependecies */
const router = require('express').Router();
const Product = require('../models/product');

router.route('/products')
    // An endpoint to lists the products with pagination details
    .get((req, res, next) => {
        const perPage = 10;
        const page = req.query.page
        // Find all the products and limit the products
        // Based on the page query
        Product
            .find()
            .skip(perPage * page)
            .limit(perPage)
            .exec((err, products) => {
                if (err) {
                    return next(err);
                }

                Product.count().exec((err, count) => {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        status: "OK",
                        message: "200",
                        products: products,
                        pages: Math.ceil(count / perPage )
                    });
                });
            });
    })
    // An endpoint to inserts new product.
    .post((req, res) => {
        try {
            const product = new Product();
            product.title = req.body.title;
            product.description = req.body.description;
            product.save()

            res.json({
                success: "OK",
                message: "Successfully added the product"
            });
        } catch (err) {
            res.json({
                success: "Failed",
                message: "Cannot create a new product"
            });
        }
    })
    // An endpoint to update an existing product.
    .put((req, res) => {
        Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, product) => {
            if (err) {
                res.json({
                    success: "Failed",
                    message: "Cannot update this product"
                })
            }
            res.json({ 
                success: "OK",
                message: "Succesfully update this product",
                product: product
            });
        });
    })
    // An endpoint to remove a product.
    .delete((req, res) => {
        Product.remove({ _id: req.body.id }, (err) => {
           if (err) {
            res.json({
                success: "Failed",
                message: "Cannot delete this product"
            })
           }

        });
    })

module.exports = router