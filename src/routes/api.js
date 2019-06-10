/* Module dependecies */
const router = require("express").Router();
const Product = require("../models/product");

router
  .route("/products")
  // An endpoint to lists the products with pagination details
  .get((req, res, next) => {
    const perPage = 10;
    const page = req.query.page;
    // Find all the products and limit the products
    // Based on the page query
    Product.find()
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
            status: true,
            message: "200",
            data: products,
            pages: Math.ceil(count / perPage)
          });
        });
      });
  })
  // An endpoint to inserts new product.
  .post((req, res) => {
    try {
      const product = new Product();
      product.title = req.body.title;
      product.price = req.body.price;
      product.description = req.body.description;
      product.save();

      res.json({
        success: true,
        message: "Successfully added the product",
        data: product
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Cannot create a new product"
      });
    }
  });

router
  .route("/products/:id")
  // An endpoint to update an existing product.
  .put((req, res) => {
    Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      },
      (err, product) => {
        if (err) {
          res.json({
            success: false,
            message: "Cannot update this product"
          });
        }
        res.json({
          success: true,
          message: "Succesfully update this product",
          data: product
        });
      }
    );
  })
  // An endpoint to remove a product.
  .delete((req, res) => {
    Product.findByIdAndRemove(
      {
        _id: req.params.id
      },
      err => {
        if (err) {
          res.json({
            success: false,
            message: "Cannot delete this product"
          });
        }
        res.json({
          success: true,
          message: "Deleted this product"
        });
      }
    );
  });

module.exports = router;
