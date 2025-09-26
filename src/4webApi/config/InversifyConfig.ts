import { Container } from 'inversify';
//import UsuarioRepositorioInterface from '../../2domain/interfaces/UsuarioRepositorioInterface';
//import UsuarioRepositorio from '../../3infra/repositorios/UsuarioRepositorio';
import UsuarioController from '../controllers/UsuariosController';
import UsuarioServiceInterface from '../../2domain/interfaces/UsuarioServiceInterface';
import UsuarioService from '../../2domain/services/UsuarioService';
import UsuarioRepositorioInterface from '../../2domain/interfaces/UsuarioAsyncRepositorioInterface';
// import UsuarioRepositorio from '../../3infra/repositorios/UsuarioAsyncRepositorio';
//import UsuarioMongoRepositorio from '../../3infra/repositorios/UsuarioAsyncMongoRepositorio';
import UsuarioMongooseRepositorio from '../../3infra/repositorios/UsuarioAsyncMongooseRepositorio';
import DBModels from '../../3infra/repositorios/DBModels';

const container = new Container();

container
    .bind<DBModels>('DBModels')
    .to(DBModels).inRequestScope();
container
    .bind<UsuarioRepositorioInterface>('UsuarioRepositorio')
    .to(UsuarioMongooseRepositorio).inRequestScope();
container
    .bind<UsuarioServiceInterface>('UsuarioService')
    .to(UsuarioService).inRequestScope();
container
    .bind<UsuarioController>('UsuarioController')
    .to(UsuarioController).inRequestScope();

export default container;