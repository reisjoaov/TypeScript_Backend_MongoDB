import { Schema } from 'mongoose';

export const ContatoSchema: Schema = new Schema({
    email: { type: String, require: false },
    telefone: { type: String, require: false },
    website: { type: String, require: false },
});
