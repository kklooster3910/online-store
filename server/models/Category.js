// Category;
// Name;
// Products;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "products"
    }
  ]
});


CategorySchema.statics.allProducts = categoryId => {
  const Category = mongoose.model("categories")
  return Category.findById(categoryId) //looking for specific category
    .populate("products") // samething as  querying categoery(id: id){ product}
    .then( res => res.products) // category.products = array of category
}
module.exports = mongoose.model("categories", CategorySchema);
