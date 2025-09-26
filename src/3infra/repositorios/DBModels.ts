import { injectable } from 'inversify';
import mongoose, { Model } from 'mongoose';
import { Usuario } from '../../1entidades/Usuario';
import { LivroSchema, UsuarioSchema } from './UsuarioSchema';
import 'reflect-metadata';
import Livro from '../../1entidades/Livro';

@injectable()
class DBModels {
  public get userModels(): Model<Usuario> {
    const UserModel = mongoose.model<Usuario>('User', UsuarioSchema);
    return UserModel;
  }
  public get livroModels(): Model<Livro> {
    const LivroModel = mongoose.model<Livro>('Books', LivroSchema);
    return LivroModel;
  }
}

export default DBModels;