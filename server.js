// var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String,
//     world(pickMyNums: [Int]): [Int]!
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () =>
//   {
//     return 'Hello world!';
//   },
//   world: ({ pickMyNums }) => { //args is destructured
//     let arrayer = [12, 3, 4, 5, 6];
//     // console.log([12, 3, 4, 5, 6].find(x=>x===12));
//     return (pickMyNums === undefined ? arrayer : arrayer.filter(function (item) {
//       return pickMyNums.includes(item);
//     }) )
//   }
// };

// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000);
// console.log('Running a GraphQL API server at http://localhost:4000/graphql');


const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema");
// const graphql = require('graphql');
const app = express();


app.use(
  '/graphql',
  expressGraphQL({
    schema: schema ,
    graphiql: true
  }),
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{console.log(`server started on port: ${PORT}`);});