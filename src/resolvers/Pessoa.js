export default {
  livros(parent, args, ctx, info) {
    return ctx.db.livros.filter((livro) => livro.autor === parent.id);
  },
  comentarios(parent, args, ctx, info) {
    return ctx.db.comentarios.filter(
      (comentario) => comentario.autor === parent.id
    );
  },
};
