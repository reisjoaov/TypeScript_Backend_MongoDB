import { Usuario } from '../../1entidades/Usuario';

export type CriarUsarioDTO = Omit<Usuario, 'id'>;