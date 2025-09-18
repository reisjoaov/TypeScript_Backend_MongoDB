export class CriarUsuarioDto {
    id: number;
    nome: string;
    ativo: boolean = true;
    saldo?: bigint = 12n;
    NumeroDoc?: number;
    senha?: string;
    sobrenome?: string;

    constructor(id: number, nome: string, ativo: boolean, saldo?: bigint, sobrenome?: string) {
        //this.id = Math.round(Math.random() * 100);
        this.id = id;
        this.nome = nome;
        this.ativo = ativo;
        this.saldo = saldo;
        this.senha = 'minha senha';
        this.sobrenome = sobrenome;
    }
}