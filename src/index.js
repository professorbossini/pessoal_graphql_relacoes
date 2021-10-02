import { v4 as uuidv4 } from 'uuid';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import a from './resolvers/Query';
import b from './resolvers/Mutation';
import c from './resolvers/Livro';
import d from './resolvers/Pessoa';
import e from './resolvers/Comentario';
import Subscription from './resolvers/Subscription'

// const typeDefs = `

// `;
const pubSub = new PubSub()
const resolvers = {
  Query: a,
  Mutation: b,
  Subscription,
  Livro: c,
  Pessoa: d,
  Comentario: e,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {db, pubSub},
});

server.start(
  {
    port: 4200,
  },
  () => console.log('Servidor em execução')
);
