const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat
} = graphql;
const Product = mongoose.model("products")
const ProductType = new GraphQLObjectType({
  name: "ProductType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    weight: { type: GraphQLInt },
    cost: {type: GraphQLFloat},
    category: {
        type: require("./category_type"),
        resolve(parentValue) {
          return Product.findById(parentValue.id)
            .populate("category")
            .then(res => res.category);
        }
    }
  })
});


module.exports = ProductType;
