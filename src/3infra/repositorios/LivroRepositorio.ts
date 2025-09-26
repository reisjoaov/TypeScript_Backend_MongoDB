import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import DBModels from './DBModels';
import { Model } from 'mongoose';
import LivroRepositorioInterface from '../../2domain/interfaces/LivroRepositorioInterface';
import Livro from '../../1entidades/Livro';

@injectable()
export default class LivroRepositorio implements LivroRepositorioInterface {
    private livroModel: Model<Livro>;    
    constructor( @inject('DBModels') dbModel: DBModels ){
        this.livroModel = dbModel.livroModels;
    }
    
    async buscarTodos(): Promise<(Livro | undefined)[]> {
        return this.livroModel.find();
    }

    async criar(livroDTO: Livro): Promise<Livro> {
        const livro = new this.livroModel(livroDTO);
        livro.save();
        return await livro.save();
    }

    async deletar(id: string): Promise<boolean> {
        const resultado = await this.livroModel.deleteOne({_id: id});
        return resultado.deletedCount > 0;
    }
}