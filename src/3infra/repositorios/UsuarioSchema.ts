import mongoose, { Schema } from 'mongoose';
import { Usuario } from '../../1entidades/Usuario';

export type UsuarioSchemaDriver = {
    id: number,
    nome: string,
    ativo: boolean,
    saldo?: bigint,
    contato?: { [key: string]: unknown },
    KAMV?: number
}

const UsuarioSchema: Schema = new Schema({
    id: {type: Number, require: true, unique: true},
    nome: {type: String, require: true},
    ativo: {type: Boolean, default: true},
    saldo: {type: Number, require: false}
});

export const UserModel = mongoose.model<Usuario>('User', UsuarioSchema);