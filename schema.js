const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');
const axios = require("axios");

// DATA
// const customers = [
//   { id: `1`, name: `John Doe`, email: `john.doe@gmail.com`, age: 35 },
//   { id: `2`, name: `Steve Smith`, email: `steve.doe@gmail.com`, age: 12 },
//   { id: `3`, name: `Sarah williams`, email: `sara.doe@gmail.com`, age: 45 },
// ]


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

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    AddCustomer: {
      type: CustomerType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(p, args) {
        return axios
          .post(`http://localhost:3000/customers/`, {
            name: args.name,
            email: args.email,
            age: args.age,
          })
          .then(res => {
            return res.data;
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    }
  }
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
        console.log(`http://localhost:3000/customers/${args.id}`);
        //return customers.find(x => x.id === args.id);
        return axios
          .get(`http://localhost:3000/customers/${args.id}`)
          .then(res => {
            return res.data;
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    },
    Customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/customers`)
          .then(res => res.data);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
})