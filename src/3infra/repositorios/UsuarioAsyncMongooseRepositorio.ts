import { UsuarioSchemaDriver } from './UsuarioSchema';
import { Usuario } from '../../1entidades/Usuario';
import UsuarioRepositorioInterface from '../../2domain/interfaces/UsuarioAsyncRepositorioInterface';
import 'reflect-metadata';
import { injectable } from 'inversify';
import dotenv from 'dotenv';
import { Collection, MongoClient, MongoServerError, ObjectId, ServerApiVersion } from 'mongodb';
import BdException from '../../2domain/exceptions/BdException';

dotenv.config();

@injectable()
export default class UsuarioMongooseRepositorio implements UsuarioRepositorioInterface {
    getUsuarios(): Promise<UsuarioSchemaDriver[]> {
        throw new Error('Method not implemented.');
    }
    getUsuarioPorId(id: number): Promise<UsuarioSchemaDriver | undefined> {
        throw new Error('Method not implemented.');
    }
    criarUsario(usuario: Usuario): Promise<UsuarioSchemaDriver[]> {
        throw new Error('Method not implemented.');
    }
    deletarUsuario(id: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    atualizarUsuarioParcial(id: number, dadosAtualizados: Partial<Usuario>): Promise<UsuarioSchemaDriver | undefined> {
        throw new Error('Method not implemented.');
    }
    substituirUsuario(id: number, dadosCompletos: Usuario): Promise<UsuarioSchemaDriver | undefined> {
        throw new Error('Method not implemented.');
    }
    
}