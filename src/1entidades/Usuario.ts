import { publicDecrypt } from 'crypto';
import Livro from './Livro';
import ContatoVO from './VO/ContatoVO';

export class Usuario {
    id: number;
    nome: string;
    ativo: boolean = true;
    contato: ContatoVO = {};
    saldo?: bigint = 12n;
    NumeroDoc?: number;
    senha?: string;
    sobrenome?: string;
    livros: Livro[] = [];
    
    constructor(
        id: number,
        nome: string,
        ativo: boolean,
        contato: ContatoVO,
        livros: Livro[],
        saldo?: bigint,
        sobrenome?: string
    ) {
        this.id = id;
        this.nome = nome;
        this.ativo = ativo;
        this.contato = contato;
        this.livros = livros;
        this.saldo = saldo;
        this.senha = 'minha senha';
        this.sobrenome = sobrenome;
    }
}