//import { UserModel, UsuarioSchemaDriver } from './UsuarioSchema';
import { Usuario } from '../../1entidades/Usuario';
import UsuarioRepositorioInterface from '../../2domain/interfaces/UsuarioAsyncRepositorioInterface';
import 'reflect-metadata';
import { injectable } from 'inversify';
import dotenv from 'dotenv';
import { UserModel } from './UsuarioSchema';
//import { Collection, MongoClient, MongoServerError, ObjectId, ServerApiVersion } from 'mongodb';
//import BdException from '../../2domain/exceptions/BdException';

dotenv.config();

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
        throw new Error('Method not implemented.');
    }
    async deletarUsuario(id: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async atualizarUsuarioParcial(id: number, dadosAtualizados: Partial<Usuario>): Promise<Usuario | undefined> {
        throw new Error('Method not implemented.');
    }
    async substituirUsuario(id: number, dadosCompletos: Usuario): Promise<Usuario | undefined> {
        throw new Error('Method not implemented.');
    }

    
}