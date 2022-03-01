const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require(`graphql`);

const fetch = require(`node-fetch`);
const SearchType = require(`./search_type`); // Config tree is Schema -> Type (List) -> Result (Item)

const url = `http://www.omdbapi.com/?apikey=`;

function fetchSearch(apiKey, searchTerm) {
  return fetch(`${url}${apiKey}&s=${searchTerm}`).then(res => {
    return res.json();
  });
}

const queryType = new GraphQLObjectType({
  name: `RootQuery`,
  fields: {
    search: {
      type: SearchType,
      args: { // Name of our parameters in GraphQL query
        apiKey: { type: GraphQLString },
        searchTerm: { type: GraphQLString },
        // TODO pagination
      },
      resolve: (root, args) => fetchSearch(args.apiKey, args.searchTerm),
    },
  },
});

const omdbSchema = new GraphQLSchema({
  query: queryType,
});

module.exports = omdbSchema;
