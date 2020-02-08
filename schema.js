const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

// DATA
const customers = [
  { id: `1`, name: `John Doe`, email: `john.doe@gmail.com`, age: 35 },
  { id: `2`, name: `Steve Smith`, email: `steve.doe@gmail.com`, age: 12 },
  { id: `3`, name: `Sarah williams`, email: `sara.doe@gmail.com`, age: 45 },
]

//Customer type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

//Root query
const rootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    Customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentVal, args) {
        return customers.find(x => x.id === args.id);
      }
    },
    Customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return customers
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
})