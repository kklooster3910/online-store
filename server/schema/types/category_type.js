const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Product = mongoose.model("products")
const Category = mongoose.model("categories")
const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: {
        type: new GraphQLList(require("./product_type")),
        resolve(parentValue) {
          return Category.allProducts(parentValue.id);
        }
    }
  })
});

module.exports = CategoryType;