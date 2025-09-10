import { Usuario } from '../../1entidades/Usuario';

// DTO - Data Transfer Object

export type CriarUsarioDTO = Omit<Usuario, 'id'>;
