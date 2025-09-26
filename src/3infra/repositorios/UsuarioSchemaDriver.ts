import { ObjectId } from 'bson';

export type UsuarioSchemaDriver = {
    _id: ObjectId;
    id: number;
    nome: string;
    ativo: boolean;
    saldo?: bigint;
    contato?: { [key: string]: unknown; };
    KAMV?: number;
};
