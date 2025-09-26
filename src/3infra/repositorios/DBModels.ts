import { injectable } from 'inversify';
import mongoose, { Model } from 'mongoose';
import { Usuario } from '../../1entidades/Usuario';
import { UsuarioSchema } from './UsuarioSchema';
import 'reflect-metadata';

@injectable()
class DBModels {
  public get UserModels(): Model<Usuario> {
    const UserModel = mongoose.model<Usuario>('User', UsuarioSchema);
    return UserModel;
  }
}

export default DBModels;