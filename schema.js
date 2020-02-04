const WarriorData = require ("./fake-data");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

//launch type
const WarriorType = new GraphQLObjectType({
  name: 'warrior',
  fields: () => ({
    id: {type: GraphQLID},
    fighting_style: {type: GraphQLString},
    clan: {type: GraphQLString}
  })
});

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Warrior: {
      type: WarriorType,
      args: {
        id: { GraphQLID }
      },
      resolve(parent, args) {
        return WarriorData.find(x=>x.id=== args.id);
      }
    }
  }
});

console.log(rootQuery);

module.exports = new GraphQLSchema({query: rootQuery});