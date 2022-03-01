// Search Type will define the actual API response for a given request
// It uses search_result.js to define the object structure within the GraphQLList
const SearchResult = require(`./search_result`);

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
} = require(`graphql`);

const SearchType = new GraphQLObjectType({
  name: `SearchType`,
  fields: {
    totalResults: {
      type: GraphQLInt,
      resolve: (result) => result.totalResults,
    },
    movies: {
      type: GraphQLList(SearchResult),
      resolve: (result) => result.Search,
    },
  },
});

module.exports = SearchType;
