// Application here
const graphqlHTTP = require(`express-graphql`);
const express = require(`express`);
const { graphql } = require(`graphql`);
const cors = require(`cors`);

const omdbSchema = require(`./schema/schema`);

const app = express();

app.use(cors({
  origin: `http://localhost:3000`
}));
app.use(`/graphql`, graphqlHTTP({
  schema: omdbSchema,
}));

app.listen(3030, () => console.log(`Running server on port 3030`));
