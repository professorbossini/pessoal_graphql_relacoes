import {
    v4 as uuidv4
   } from "uuid";
export default {
  inserirPessoa(parent, args, ctx, info) {
    const pessoa = {
      id: uuidv4(),
      nome: args.pessoa.nome,
      idade: args.pessoa.idade,
    };
    ctx.db.pessoas.push(pessoa);
    return pessoa;
  },
  removerPessoa(parent, args, ctx, info) {
    const indice = ctx.db.pessoas.findIndex((p) => {
      return p.id === args.id;
    });
    if (indice < 0) throw new Error('Pessoa não existe!');

    //removendo a pessoa (opera in place)
    //devolve coleção com itens removidos
    const removido = ctx.db.pessoas.splice(indice, 1)[0];
    //removendo livros da pessoa
    ctx.db.livros = ctx.db.livros.filter((livro) => {
      const remover = livro.autor === args.id;
      //removendo comentários de cada livro
      ctx.db.comentarios = ctx.db.comentarios.filter((c) => {
        return remover && c.livro !== livro.id;
      });

      return !remover;
    });
    //remove comentários que a pessoa fez
    ctx.db.comentarios = ctx.db.comentarios.filter((c) => c.autor !== args.id);
    return removido;
  },
  inserirLivro(parent, args, ctx, info) {
    const autorExiste = ctx.db.pessoas.some(
      (pessoa) => pessoa.id === args.livro.autor
    );
    if (!autorExiste) throw new Error('Autor não existe');
    const livro = {
      id: uuidv4(),
      titulo: args.livro.titulo,
      edicao: args.livro.edicao,
      autor: args.livro.autor,
    };
    ctx.db.livros.push(livro);
    return livro;
  },
  removerLivro(parent, args, ctx, info) {
    const indice = ctx.db.livros.findIndex((l) => l.id === args.id);
    if (indice < 0) throw new Error('Livro não existe');
    const removido = ctx.db.livros.splice(indice, 1)[0];
    ctx.db.comentarios = ctx.db.comentarios.filter((c) => {
      return c.livro !== args.id;
    });
    return removido;
  },
  inserirComentario(parent, args, ctx, info) {
    const autorExiste = ctx.db.pessoas.some(
      (p) => p.id === args.comentario.autor
    );
    const livroExiste = ctx.db.livros.some(
      (l) => l.id === args.comentario.livro
    );
    if (!autorExiste || !livroExiste)
      throw new Error('Autor e/ou livro inexistente(s)');
    const comentario = {
      id: uuidv4(),
      texto: args.comentario.texto,
      nota: args.comentario.nota,
      livro: args.comentario.livro,
      autor: args.comentario.autor,
    };
    ctx.db.comentarios.push(comentario);
    return comentario;
  },
  removerComentario(parent, args, ctx, info) {
    const indice = ctx.db.comentarios.findIndex((c) => c.id === args.id);
    if (indice < 0) throw new Error('Comentário não existe!');
    return comentarios.splice(indice, 1)[0];
  },
};
