import { UsuarioSchemaDriver } from '../../3infra/repositorios/UsuarioSchema';
import { Usuario } from '../../1entidades/Usuario';

interface UsuarioRepositorioInterface {
    getUsuarios(): Promise<UsuarioSchemaDriver[]>;
    getUsuarioPorId(id: number): Promise<UsuarioSchemaDriver | undefined>;
    criarUsario(usuario: Usuario): Promise<UsuarioSchemaDriver[]>;
    deletarUsuario(id: number): Promise<boolean>;
    atualizarUsuarioParcial(id: number, dadosAtualizados: Partial<Usuario>): Promise<UsuarioSchemaDriver | undefined>;
    substituirUsuario(id: number, dadosCompletos: Usuario): Promise<UsuarioSchemaDriver | undefined>;
}

export default UsuarioRepositorioInterface;