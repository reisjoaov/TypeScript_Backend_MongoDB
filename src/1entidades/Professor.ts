import { Usuario } from "./Usuario";

// DRY - Dont repeat yourself

export class Professor extends Usuario {
    private tipo: string = 'Professor';
    private supervisor?: string;

    constructor(
        id: number,
        nome: string,
        ativo: boolean,
        saldo?: bigint,
        sobrenome?: string,
        supervisor?: string
    ) {
        super(id, nome, ativo, saldo, sobrenome);
        this.supervisor = supervisor;
    }

    organizarAulas(): void {
        console.log('Ministrar aulas');
    }

}
