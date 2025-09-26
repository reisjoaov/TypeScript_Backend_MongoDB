import { Livro } from '../../entidades/Livro';

interface LivroRepositorioInterface {
  buscarTodos(): Promise<(Livro | undefined)[]>;
  criar(livro: Livro): Promise<Livro>;
  deletar(id: string): Promise<boolean>;
}

export default LivroRepositorioInterface;