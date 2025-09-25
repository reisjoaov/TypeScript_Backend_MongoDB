import { UsuarioSchemaDriver } from './UsuarioSchema';
import { Usuario } from '../../1entidades/Usuario';
import UsuarioRepositorioInterface from '../../2domain/interfaces/UsuarioAsyncRepositorioInterface';
import 'reflect-metadata';
import { injectable } from 'inversify';
import dotenv from 'dotenv';
import { Collection, MongoClient, MongoServerError, ObjectId, ServerApiVersion } from 'mongodb';
import BdException from '../../2domain/exceptions/BdException';

dotenv.config();

const jsonSchema = {
    $jsonSchema: {
    bsonType: 'object',
    required: [
      '_id',
      'ativo',
      'id',
      'nome'
    ],
    properties: {
      _id: {
        bsonType: 'objectId'
      },
      ativo: {
        bsonType: 'bool'
      },
      id: {
        bsonType: 'int'
      },
      nome: {
        bsonType: 'string'
      },
      senha: {
        bsonType: 'string'
      }
    }
  }
};

@injectable()
export default class UsuarioMongoRepositorio implements UsuarioRepositorioInterface {
    private uri: string;
    constructor (        
            private dbname: string = 'tsmongo',
            private collectionName: string = 'users',
    ){
        this.uri = process.env.MONGO_DB_KEY ?? '';
        this.collectionName = 'users';
        this.createCollectionWithValidation().catch(console.error);
    }

    async createCollectionWithValidation() {
        const client = new MongoClient(this.uri);
        await client.connect();
        const db = client.db(this.dbname);

        try {
            await db.createCollection(this.collectionName, {
                validator: {
                    $jsonSchema: jsonSchema
                }
            });
            console.info('Collection criada com validações!');
        } catch (e) {
            if (e instanceof MongoServerError && e.message.includes('already exists')) {
                console.info(`Collection ${this.collectionName} não foi criada, pois já existe.`);
            } else {
                throw e;
            }
        } finally {
            await client.close();
        }
    }
        
    // async updateCollectionValidation() {
    //     const client = new MongoClient(this.uri);
    //     await client.connect();
    //     const db = client.db (this.dbname);
        
    //     await db.command({
    //         collMod: this.collectionName,
    //         validator: {
    //             $jsonSchema: jsonSchema
    //         },
    //     validationLevel: 'strict'
    //     // pode ser "moderate" se quiser menos restrição            
    //     });
    
    // console.log('Collection validation updated!'); await client.close();
    // }

    private async getCollectionAndClient(): Promise<{
        collection: Collection<UsuarioSchemaDriver>,
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
            const collection = db.collection<UsuarioSchemaDriver>(this.collectionName);
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

    public async getUsuarios(): Promise<UsuarioSchemaDriver[]> {
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

    public async getUsuarioPorId(id: number): Promise<UsuarioSchemaDriver | undefined> {
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

    public async criarUsario(usuario: Usuario): Promise<UsuarioSchemaDriver[]> {
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
            } as UsuarioSchemaDriver;
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
    public async atualizarUsuarioParcial(id: number, dadosAtualizados: Partial<Usuario>): Promise<UsuarioSchemaDriver | undefined> {
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
    public async substituirUsuario(id: number, dadosCompletos: Usuario): Promise<UsuarioSchemaDriver | undefined> {
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