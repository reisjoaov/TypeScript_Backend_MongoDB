import { Usuario } from "./Usuario";


export type ViewUsuarioDTO = Omit<Usuario, 'senha'>;
