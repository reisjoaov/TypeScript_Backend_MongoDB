import { Container } from 'inversify';
//import UsuarioRepositorioInterface from '../../2domain/interfaces/UsuarioRepositorioInterface';
//import UsuarioRepositorio from '../../3infra/repositorios/UsuarioRepositorio';
import UsuarioController from '../controllers/UsuariosController';
import UsuarioServiceInterface from '../../2domain/interfaces/UsuarioServiceInterface';
import UsuarioService from '../../2domain/services/UsuarioService';
import UsuarioRepositorioInterface from '../../2domain/interfaces/UsuarioAsyncRepositorioInterface';
import UsuarioRepositorio from '../../3infra/repositorios/UsuarioAsyncRepositorio';

const container = new Container();

container
    .bind<UsuarioRepositorioInterface>('UsuarioRepositorio')
    .to(UsuarioRepositorio).inRequestScope();
container
    .bind<UsuarioServiceInterface>('UsuarioService')
    .to(UsuarioService).inRequestScope();
container
    .bind<UsuarioController>('UsuarioController')
    .to(UsuarioController).inRequestScope();

export default container;