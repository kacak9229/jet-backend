/* Module dependecies */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Product Schema 
    - title , type is string,
    - description, type is string,
    - created, type is date,
*/
const ProductSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  created: Date
});

module.exports = mongoose.model("Product", ProductSchema);
