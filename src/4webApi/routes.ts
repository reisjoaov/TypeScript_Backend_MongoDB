import { Router } from 'express';
import container from './config/InversifyConfig';
import LivroController from './controllers/LivroController';
import UsuariosRoutes from './routes/UsuariosRoutes';

const routes = Router();

const usuarioRoutes = container.get<UsuariosRoutes>('UsuariosRoutes');
const livroController = container.get<LivroController>('LivroController');

// Test Driven Design
routes.use('/usuarios', usuarioRoutes.router);
routes.use('/livros', livroController.router);

export default routes;