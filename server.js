const express = require("express");
const expressGraphQl = require("express-graphql");
const schema = require("./schema");

const app = express();



app.use(
  '/graphql',
  expressGraphQl({
    schema: schema ,
    graphiql: true,
  }),
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{console.log(`server started on port: ${PORT}`);});