import 'reflect-metadata';
import { inject, injectable } from 'inversify'; 
import LivroServiceInterface from '../interfaces/LivroServiceInterface';
import LivroRepositorioInterface from '../interfaces/LivroRepositorioInterface';
import Livro from '../../1entidades/Livro';
import NotFoundException from '../exceptions/NotFoundExpection';


@injectable()
export default class LivroService implements LivroServiceInterface {
    private readonly livroRepositorio: LivroRepositorioInterface;

    constructor(
        @inject('LivroRepositorio')
        livroRepositorio: LivroRepositorioInterface
    ) {
        this.livroRepositorio = livroRepositorio;
    }

    async buscarTodos(): Promise<(Livro | undefined)[]> {
        return await this.livroRepositorio.buscarTodos();
    }
    
    async criar(livro: Livro): Promise<Livro> {
        return await this.livroRepositorio.criar(livro);
    }

    async deletar(id: string): Promise<void> {
        const deletado = await this.livroRepositorio.deletar(id);
        if (deletado) return;
        throw new NotFoundException('Livro não encontrado');
    }
}