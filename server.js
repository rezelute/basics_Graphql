const express = require("express");
const expressGraphQl = require("express-graphql");
const schema = require("./schema");
// const graphql = require('graphql');
const app = express();
const cors = require("cors");


app.use(
  '/graphql',
  expressGraphQl({
    schema: schema ,
    graphiql: true
  }),
);

app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{console.log(`server started on port: ${PORT}`);});