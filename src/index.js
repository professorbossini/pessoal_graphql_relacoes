import { v4 as uuidv4 } from 'uuid';
import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import a from './resolvers/Query';
import b from './resolvers/Mutation';
import c from './resolvers/Livro';
import d from './resolvers/Pessoa';
import e from './resolvers/Comentario';

// const typeDefs = `

// `;
console.log(a)
const resolvers = {
  Query: a,
  Mutation: b,

  Livro: c,
  Pessoa: d,
  Comentario: e,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {db},
});

server.start(
  {
    port: 4200,
  },
  () => console.log('Servidor em execução')
);
