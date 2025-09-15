import { Usuario } from '../../1entidades/Usuario';

export type ViewUsuarioDTO = Omit<Usuario, 'senha'>;