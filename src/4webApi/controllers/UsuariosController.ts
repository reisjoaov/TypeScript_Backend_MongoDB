import { Router, Request, Response, NextFunction } from 'express';
import { Usuario } from '../../1entidades/Usuario';
import { validationResult } from 'express-validator';
import BadRequestException from '../../2domain/exceptions/BadRequestException';
import UsuarioServiceInterface from '../../2domain/interfaces/UsuarioServiceInterface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { AtualizarUsuarioDTO } from '../../2domain/dtos/AtualizarUsuarioDTO';
import { CriarUsarioDTO } from '../../2domain/dtos/CriarUsarioDTO';

@injectable()
class UsuarioController {
    private readonly usuarioService: UsuarioServiceInterface;
    public router: Router = Router();

    constructor(
        @inject('UsuarioService')
        usuarioService: UsuarioServiceInterface,
    ) {
        this.usuarioService = usuarioService;
    }

    public async buscarUsuarios(req: Request, res: Response): Promise<void> {
        const response = await this.usuarioService.buscarTodos();
        res.json(response);
    }

    public async buscarUsuarioPorId(req: Request, res: Response): Promise<void> {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            throw new BadRequestException(erros.array());
        }
        const id = req.params.id;
        const usuarioDto = await this.usuarioService.buscarId(+id);
        res.status(200).json(usuarioDto);
    }

    public async criarUsuario(req: Request, res: Response): Promise <void> {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            throw new BadRequestException(erros.array());
        }
        const dadosUsuario: CriarUsarioDTO = req.body;
        const usuarios = await this.usuarioService.criarUsuario(dadosUsuario);

        res.status(201).json(usuarios);
    }

    public async atualizarUsuarioParcial(req: Request, res: Response): Promise<void> {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).json({ erros: erros.array() });
            return;
        }

        const id = +req.params.id;
        const dadosAtualizacao: Partial<AtualizarUsuarioDTO> = req.body;

        const usuarioDto = await this.usuarioService.atualizarUsuarioParcial(id, dadosAtualizacao);

        res.status(200).json({
            mensagem: 'Usuário atualizado parcialmente com sucesso',
            usuario: usuarioDto
        });
    }

    // PUT - Substituição completa (substitui todos os campos)
    public async substituirUsuario(req: Request, res: Response): Promise<void> {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).json({ erros: erros.array() });
            return;
        }

        const id = +req.params.id;
        const dadosCompletos: Usuario = req.body;

        const usuarioDto = await this.usuarioService.substituirUsuario(id, dadosCompletos);

        res.status(200).json({
            mensagem: 'Usuário substituído com sucesso',
            usuario: usuarioDto
        });
    }

    public async deletarUsuarioPorId(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        if (!id) {
            res.json('Id não enviado!');
            return;
        }
        await this.usuarioService.deletarUsuario(+id);
        res.json('Usuario excluído com sucesso');
        return;
    }
}

export default UsuarioController;