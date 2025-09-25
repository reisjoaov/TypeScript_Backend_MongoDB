import { Usuario } from '../../1entidades/Usuario';
import 'reflect-metadata';
import { injectable } from 'inversify';
import { UserModel } from './UsuarioSchema';
import UsuarioRepositorioInterface from '../../2domain/interfaces/UsuarioAsyncRepositorioInterface';

@injectable()
export default class UsuarioMongooseRepositorio implements UsuarioRepositorioInterface {
    constructor(){
    }

    async getUsuarios(): Promise<Usuario[]> {
        const users: Usuario[] = await UserModel.find();
        return users;
    }

    async getUsuarioPorId(id: number): Promise<Usuario | undefined> {
        const user = await UserModel.findOne({id}) ?? undefined;
        return user;
    }

    async criarUsario(usuario: Usuario): Promise<Usuario[]> {
        const user = await UserModel.create(usuario);
        return [user];
    }

    async deletarUsuario(id: number): Promise<boolean> {
        const results = await UserModel.deleteOne({id});
        return results.deletedCount > 0;
    }

    async atualizarUsuarioParcial(id: number, dadosAtualizados: Partial<Usuario>): Promise<Usuario | undefined> {
        const result = await UserModel.findOneAndUpdate({id}, dadosAtualizados, {new: true});
        return result ?? undefined;
    }

    async substituirUsuario(id: number, dadosCompletos: Usuario): Promise<Usuario | undefined> {
        const result = await UserModel.findOneAndUpdate({id}, dadosCompletos, {new: true});
        return result ?? undefined;
    }    
}