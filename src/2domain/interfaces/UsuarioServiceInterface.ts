import { Usuario } from '../../1entidades/Usuario';
import { AtualizarUsuarioDTO } from '../dtos/AtualizarUsuarioDTO';
import { CriarUsarioDTO } from '../dtos/CriarUsarioDTO';
import { ViewUsuarioDTO } from '../dtos/ViewUsuarioDTO';

export default interface UsuarioServiceInterface {

    buscarId(id: number): Promise<ViewUsuarioDTO>;

    buscarTodos(): Promise<ViewUsuarioDTO[]>;

    criarUsuario(dadosUsuario: CriarUsarioDTO): Promise<Usuario[]>;

    atualizarUsuarioParcial(id: number, dadosAtualizacao: Partial<AtualizarUsuarioDTO>): ViewUsuarioDTO;

    substituirUsuario(id: number, dadosCompletos: Usuario): ViewUsuarioDTO;

    deletarUsuario(id: number): Promise<boolean>;
    // eslint-disable-next-line semi
}