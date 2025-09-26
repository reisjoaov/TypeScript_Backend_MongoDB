import { Router } from 'express';
import { body, param, } from 'express-validator';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import UsuarioController from '../controllers/UsuariosController';

@injectable()
class UsuariosRoutes {
    public router: Router = Router();
    constructor(
        @inject('UsuarioController')
        private usuarioController: UsuarioController,
    ) {
        this.routeGet();
        this.routeGetbyId();
        this.routePost();
        this.routePatch();
        this.routePut();
        this.routeDelete();
    }

    private routeGet() {
        this.router.get('/',
        this.usuarioController
        .buscarUsuarios
        .bind(this.usuarioController));
    }
    
    private routeGetbyId() {
        this.router.get('/:id',
        [
            param('id').isNumeric().withMessage('O id deve ser numérico')
        ],
        this.usuarioController
        .buscarUsuarioPorId
        .bind(this.usuarioController));
    }

    private routePost() {
        this.router.post('/',
        [
            body('nome')
                .exists().withMessage('O campo nome é obrigatório')
                .isString().withMessage('O campo nome deve ser um texto'),
            body('ativo')
                .exists().withMessage('O campo ativo é obrigatório')
                .isBoolean().withMessage('O campo ativo deve ser um boolean')
        ],
        this.usuarioController.criarUsuario.bind(this.usuarioController));
    }

    private routePatch(){
        this.router.patch('/:id',
        [
            param('id').isNumeric().withMessage('O id deve ser numérico'),
            // Validações opcionais para PATCH - campos podem ou não estar presentes
            body('nome').optional().isString().withMessage('O campo nome deve ser um texto'),
            body('ativo').optional().isBoolean().withMessage('O campo ativo deve ser um boolean'),
            body('saldo').optional().isNumeric().withMessage('O campo saldo deve ser numérico')
        ],
        this.usuarioController.atualizarUsuarioParcial.bind(this.usuarioController));
    }

    private routePut(){
        this.router.put('/:id',
        [
            param('id').isNumeric().withMessage('O id deve ser numérico'),
            // Validações obrigatórias para PUT - todos os campos devem estar presentes
            body('nome')
                .exists().withMessage('O campo nome é obrigatório')
                .isString().withMessage('O campo nome deve ser um texto'),
            body('ativo')
                .exists().withMessage('O campo ativo é obrigatório')
                .isBoolean().withMessage('O campo ativo deve ser um boolean'),
            body('saldo')
                .exists().withMessage('O campo saldo é obrigatório')
                .isNumeric().withMessage('O campo saldo deve ser numérico')
        ],
        this.usuarioController.substituirUsuario.bind(this.usuarioController));
    }

    private routeDelete(){
        this.router.delete('/:id',
        [
            param('id').isNumeric().withMessage('O id deve ser numérico'),
        ],
        this.usuarioController.deletarUsuarioPorId.bind(this.usuarioController));
    }
}

export default UsuariosRoutes;