import { Schema } from 'mongoose';

export const LivroSchema: Schema = new Schema({
    nome: {type: String, require: true},
    autores: [{type: Schema.Types.ObjectId, ref: 'User'}],
});