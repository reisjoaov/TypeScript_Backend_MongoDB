import { UsuarioSchema } from './UsuarioSchema';
import { Usuario } from '../../1entidades/Usuario';
import UsuarioRepositorioInterface from '../../2domain/interfaces/UsuarioAsyncRepositorioInterface';
import 'reflect-metadata';
import { injectable } from 'inversify';
import dotenv from 'dotenv';
import { Collection, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import BdException from '../../2domain/exceptions/BdException';

dotenv.config();

@injectable()
export default class UsuarioMongoRepositorio implements UsuarioRepositorioInterface {
    private uri: string;
    constructor (        
            private dbname: string = 'tsmongo',
            private collectionName: string = 'users',
    ){
        this.uri = process.env.MONGO_DB_KEY ?? '';
        this.collectionName = 'users';
    }

    private async getCollectionAndClient(): Promise<{
        collection: Collection<UsuarioSchema>,
        client: MongoClient
    }>{
        const client = new MongoClient(this.uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
                }
        });

        try {    
            await client.connect();
            const db = client.db(this.dbname);
            const collection = db.collection<UsuarioSchema>(this.collectionName);
            
            //Lembrar de fechar após usar => client.close();
            
            return {collection, client};

        } catch (error) {
            if (
                error instanceof Error
            ) {
                throw new BdException('Erro ao conectar ao Banco de Dados');
            }
            client.close();
            throw error;
        }
    }

    public async getUsuarios(): Promise<UsuarioSchema[]> {
        const {collection, client} = await this.getCollectionAndClient();
        try {
            const users = await collection
                .find({})
                .toArray();
            return users;
        } catch{
            throw new BdException('Erro ao buscar usuários no Banco de Dados');
        } finally {
            client.close();
        }
    }

    public async getUsuarioPorId(id: number): Promise<UsuarioSchema | undefined> {
        const {collection, client} = await this.getCollectionAndClient();
        try{
            const user = await collection.findOne({id: id});
            return user ?? undefined;
        } catch{
            throw new BdException('Erro ao buscar um usuário no Banco de Dados');
        } finally {
            client.close();
        }
    }

    public async criarUsario(usuario: Usuario): Promise<UsuarioSchema[]> {
        const {collection, client} = await this.getCollectionAndClient();
        const maiorId = await collection
            .find({})
            .sort({id:-1})
            .limit(1)
            .toArray();
        try{
            const novoUsuario = {
                _id: new ObjectId(),
                id: maiorId[0].id + 1,
                nome: usuario.nome,
                ativo: usuario.ativo            
            } as UsuarioSchema;
            collection.insertOne(novoUsuario);
            const users = await collection.find({}).toArray();
            return users;        
        } catch{
            throw new BdException('Erro ao buscar um usuário no Banco de Dados');
        } finally {
            client.close();
        }
    }

    public async deletarUsuario(id: number): Promise<boolean> {
        const { collection, client } = await this.getCollectionAndClient();
        try {
            const results = await collection.deleteOne ({id});
            return ( results.deletedCount > 0);
        } catch (e) {
            console.error(e);
            throw new BdException('Erro ao deletar um usuário no Banco de Dados');
        } finally {
            client.close();
        }
    }

    // PATCH - Atualização parcial (apenas campos fornecidos)
    public async atualizarUsuarioParcial(id: number, dadosAtualizados: Partial<Usuario>): Promise<UsuarioSchema | undefined> {
        const { collection, client } = await this.getCollectionAndClient();
        try {
            const dadosPadraoMongo = {
                $set: {
                    ...(dadosAtualizados.nome !== undefined && { nome: dadosAtualizados.nome }),
                    ...(dadosAtualizados.ativo !== undefined && { ativo: dadosAtualizados.ativo }),
                },
            };
            await collection.updateOne({ id }, dadosPadraoMongo);
            return this.getUsuarioPorId(id);
        } catch (e) {
            console.error(e);
            throw new BdException('Erro ao atualizar um usuário no Banco de Dados');
        } finally {
            client.close();
        }
    }

    // PUT - Substituição completa (todos os campos obrigatórios)
    public async substituirUsuario(id: number, dadosCompletos: Usuario): Promise<UsuarioSchema | undefined> {
        throw new Error('not implemented');
        // const bd = await this.acessoDB();
        // const usuarios = bd.users;
        // const indiceUsuario = usuarios.findIndex(user => user.id === id);

        // if (indiceUsuario === -1) {
        //     return undefined; // Usuário não encontrado
        // }

        // Substitui completamente o usuário com os novos dados
        // Mantém apenas o ID original e alguns campos que não devem ser alterados pelo usuário
        // const usuarioAtualizado: UsuarioSchema = {
        //     id,                           // ID original (não pode ser alterado)
        //     nome: dadosCompletos.nome,
        //     ativo: dadosCompletos.ativo,
        //     saldo: dadosCompletos.saldo,
        //     KAMV: usuarios[indiceUsuario].KAMV,  // Campo gerado pelo sistema, não alterável
        //     // Qualquer outro campo não enviado será removido/resetado
        // };

        // usuarios[indiceUsuario] = usuarioAtualizado;
        // bd.users = usuarios;

        // const sucesso = await this.reescreverBD(bd);
        // return sucesso ? usuarios[indiceUsuario] : undefined;
    }
}