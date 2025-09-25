import path from 'path';
import { promises as fs } from 'fs';
import { DBSchema } from './DBSchema';
import { UsuarioSchemaDriver } from './UsuarioSchema';
import { Usuario } from '../../1entidades/Usuario';
import UsuarioRepositorioInterface from '../../2domain/interfaces/UsuarioAsyncRepositorioInterface';
import 'reflect-metadata';
import { injectable } from 'inversify';


@injectable()
export default class UsuarioRepositorio implements UsuarioRepositorioInterface {
    private caminhoArquivo: string;

    constructor(caminho: string = 'fakeBD.json') {
        this.caminhoArquivo = path.join(__dirname, caminho);
    }

    private async acessoDB(): Promise<DBSchema> {
        try {
            const bdPuro = await fs.readFile(this.caminhoArquivo, 'utf-8');
            return JSON.parse(bdPuro);
        } catch (error) {
            if (
                error instanceof Error &&
                'code' in error &&
                error?.code === 'ENOENT'
            ) {
                return { users: [] };
            }
            throw error;
        }
    }

    private async reescreverBD(DbAtualizado: DBSchema): Promise<boolean> {
        try {
            await fs.writeFile(this.caminhoArquivo, JSON.stringify(DbAtualizado, null, 2));
            return true;
        } catch (error) {
            console.error('Erro ao escrever no banco de dados:', error);
            return false;
        }
    }

    public async getUsuarios(): Promise<UsuarioSchemaDriver[]> {
        const bd = await this.acessoDB();
        return bd.users;
    }

    public async getUsuarioPorId(id: number): Promise<UsuarioSchemaDriver | undefined> {
        const usuarios = await this.getUsuarios();
        return usuarios.find(user => user.id === id);
    }

    public async criarUsario(usuario: Usuario): Promise<UsuarioSchemaDriver[]> {
        const usuarios = await this.getUsuarios();
        usuarios.push({ ...usuario });

        const bdAtualizado = await this.acessoDB();
        bdAtualizado.users = usuarios;

        await this.reescreverBD(bdAtualizado);
        return usuarios;
    }

    public async deletarUsuario(id: number): Promise<boolean> {
        const usuarios = await this.getUsuarios();
        const indiceUsuario = usuarios.findIndex(user => user.id === id);

        if (indiceUsuario === -1) {
            return false; // Usuário não encontrado
        }

        usuarios.splice(indiceUsuario, 1);
        const bdAtualizado = await this.acessoDB();
        bdAtualizado.users = usuarios;

        return await this.reescreverBD(bdAtualizado);
    }

    // PATCH - Atualização parcial (apenas campos fornecidos)
    public async atualizarUsuarioParcial(id: number, dadosAtualizados: Partial<Usuario>): Promise<UsuarioSchemaDriver | undefined> {
        const bd = await this.acessoDB();
        const usuarios = bd.users;
        const indiceUsuario = usuarios.findIndex(user => user.id === id);

        if (indiceUsuario === -1) {
            return undefined; // Usuário não encontrado
        }

        // Atualiza apenas os campos fornecidos, mantendo os existentes
        // O spread operator (...) preserva os valores originais e sobrescreve apenas os campos enviados
        usuarios[indiceUsuario] = {
            ...usuarios[indiceUsuario], // Mantém todos os campos existentes
            ...dadosAtualizados,        // Sobrescreve apenas os campos fornecidos
            id                          // Garante que o ID não seja alterado
        };

        bd.users = usuarios;
        const sucesso = await this.reescreverBD(bd);

        return sucesso ? usuarios[indiceUsuario] : undefined;
    }

    // PUT - Substituição completa (todos os campos obrigatórios)
    public async substituirUsuario(id: number, dadosCompletos: Usuario): Promise<UsuarioSchemaDriver | undefined> {
        const bd = await this.acessoDB();
        const usuarios = bd.users;
        const indiceUsuario = usuarios.findIndex(user => user.id === id);

        if (indiceUsuario === -1) {
            return undefined; // Usuário não encontrado
        }

        // Substitui completamente o usuário com os novos dados
        // Mantém apenas o ID original e alguns campos que não devem ser alterados pelo usuário
        const usuarioAtualizado: UsuarioSchemaDriver = {
            id,                           // ID original (não pode ser alterado)
            nome: dadosCompletos.nome,
            ativo: dadosCompletos.ativo,
            saldo: dadosCompletos.saldo,
            KAMV: usuarios[indiceUsuario].KAMV,  // Campo gerado pelo sistema, não alterável
            // Qualquer outro campo não enviado será removido/resetado
        };

        usuarios[indiceUsuario] = usuarioAtualizado;
        bd.users = usuarios;

        const sucesso = await this.reescreverBD(bd);
        return sucesso ? usuarios[indiceUsuario] : undefined;
    }

    // Método auxiliar para verificar se o arquivo do banco existe
    public async verificarArquivoBD(): Promise<boolean> {
        try {
            await fs.access(this.caminhoArquivo);
            return true;
        } catch {
            return false;
        }
    }

    // Método para inicializar o banco caso não exista
    public async inicializarBD(): Promise<boolean> {
        const existe = await this.verificarArquivoBD();
        if (!existe) {
            return await this.reescreverBD({ users: [] });
        }
        return true;
    }
}