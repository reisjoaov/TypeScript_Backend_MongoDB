//import { UsuarioSchemaDriver } from '../../3infra/repositorios/UsuarioSchema';
import { Usuario } from '../../1entidades/Usuario';

interface UsuarioRepositorioInterface {
    getUsuarios(): Promise<Usuario[]>;
    getUsuarioPorId(id: number): Promise<Usuario | undefined>;
    criarUsario(usuario: Usuario): Promise<Usuario[]>;
    deletarUsuario(id: number): Promise<boolean>;
    atualizarUsuarioParcial(id: number, dadosAtualizados: Partial<Usuario>): Promise<Usuario | undefined>;
    substituirUsuario(id: number, dadosCompletos: Usuario): Promise<Usuario | undefined>;
}

export default UsuarioRepositorioInterface;