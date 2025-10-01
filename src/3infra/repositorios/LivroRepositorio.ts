import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import DBModels from './DBModels';
import { Model } from 'mongoose';
import LivroRepositorioInterface from '../../2domain/interfaces/LivroRepositorioInterface';
import Livro from '../../1entidades/Livro';
import { Usuario } from '../../1entidades/Usuario';

@injectable()
export default class LivroRepositorio implements LivroRepositorioInterface {
    private livroModel: Model<Livro>;
    private userModel: Model<Usuario>;

    constructor( @inject('DBModels') dbModel: DBModels ){
        this.livroModel = dbModel.livroModels;
        this.userModel = dbModel.userModels;
    }
    
    async adicionarAutor(userId: number, bookData: Livro): Promise<Usuario | undefined> {
        const usuario = await this.userModel.findOne({id: userId});
        if (usuario){
            usuario.livros.push(bookData);
            await usuario.save();
            return await this.livroModel.findOneAndUpdate(
                {nome: bookData.nome},
                {$addToSet: {autores: usuario._id}},
                {upsert: true},
            ) ?? undefined;
        }
        return;
    }
    
    async buscarTodos(): Promise<(Livro | undefined)[]> {
        return this.livroModel.find().populate('autores');
    }

    async criar(livroDTO: Livro): Promise<Livro> {
        const livro = new this.livroModel(livroDTO);
        return await livro.save();
    }

    async deletar(id: string): Promise<boolean> {
        const resultado = await this.livroModel.deleteOne({_id: id});
        return resultado.deletedCount > 0;
    }
}