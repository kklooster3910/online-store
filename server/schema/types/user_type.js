const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLDate
} = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString},
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean}
  })
});

module.exports = UserType;
