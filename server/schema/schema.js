const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const mutations = require("./mutations");

// import that lovely Root Query you just finished up and create your new schema!
const query = require("./types/root_queries");

module.exports = new GraphQLSchema({
  query: query,
  mutation: mutations
});
