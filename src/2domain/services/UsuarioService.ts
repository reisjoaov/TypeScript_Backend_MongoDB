import { Usuario } from '../../1entidades/Usuario';
import NotFoundException from '../exceptions/NotFoundExpection';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import UsuarioRepositorioInterface from '../interfaces/UsuarioAsyncRepositorioInterface';
import { AtualizarUsuarioDTO } from '../dtos/AtualizarUsuarioDTO';
import { CriarUsarioDTO } from '../dtos/CriarUsarioDTO';
import { ViewUsuarioDTO } from '../dtos/ViewUsuarioDTO';
import UsuarioServiceInterface from '../interfaces/UsuarioServiceInterface';

@injectable()
export default class UsuarioService implements UsuarioServiceInterface {
    private readonly usuarioRepositorio: UsuarioRepositorioInterface;

    constructor(
        @inject('UsuarioRepositorio')
        usuarioRepositorio: UsuarioRepositorioInterface
    ) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    public async buscarId(id: number): Promise<ViewUsuarioDTO>{
        const usuario = await this.usuarioRepositorio.getUsuarioPorId(id);
        if (!usuario) {
            throw new NotFoundException('Usuario não encontrado');
        }

        const usuarioDto: ViewUsuarioDTO = {
            id: usuario.id,
            nome: usuario.nome,
            ativo: usuario.ativo,
            NumeroDoc: usuario.KAMV,
        };

        return usuarioDto;
    }

    public async buscarTodos(): Promise <ViewUsuarioDTO[]> {
        const usuarios = await this.usuarioRepositorio.getUsuarios();
        return usuarios.map(usuario => ({
            id: usuario.id,
            nome: usuario.nome,
            ativo: usuario.ativo,
            NumeroDoc: usuario.KAMV,
        } as ViewUsuarioDTO));
    }

    public async criarUsuario(dadosUsuario: CriarUsarioDTO): Promise<Usuario[]>{
        const usuarios = await this.usuarioRepositorio.getUsuarios();
        const idsExistentes = usuarios.map(usuario => usuario.id);
        const novoId = Math.max(...idsExistentes) + 1;

        const novoUsuario = new Usuario(
            novoId,
            dadosUsuario.nome,
            dadosUsuario.ativo,
            dadosUsuario.saldo
        );

        await this.usuarioRepositorio.criarUsario(novoUsuario);
        return await  this.usuarioRepositorio.getUsuarios();
    }

    public async atualizarUsuarioParcial(id: number, dadosAtualizacao: Partial<AtualizarUsuarioDTO>): Promise<ViewUsuarioDTO>{
        if (Object.keys(dadosAtualizacao).length === 0) {
            // TODO: tratar para badrequest
            throw new Error('Pelo menos um campo deve ser enviado para atualização');
        }

        const usuario = await this.usuarioRepositorio.atualizarUsuarioParcial(id, dadosAtualizacao);

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return {
            id: usuario.id,
            nome: usuario.nome,
            ativo: usuario.ativo,
            NumeroDoc: usuario.KAMV,
        };
    }

    public async substituirUsuario(id: number, dadosCompletos: Usuario): Promise<ViewUsuarioDTO>{
        const usuario = await this.usuarioRepositorio.substituirUsuario(id, dadosCompletos);

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return {
            id: usuario.id,
            nome: usuario.nome,
            ativo: usuario.ativo,
            NumeroDoc: usuario.KAMV,
        };
    }

    public async deletarUsuario(id: number): Promise<boolean>{
        const usuario = this.usuarioRepositorio.getUsuarioPorId(id);
        if (!usuario) {
            throw new NotFoundException('Usuario não encontrado');
        }
        return this.usuarioRepositorio.deletarUsuario(id);
    }
}