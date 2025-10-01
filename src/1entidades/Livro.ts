import { ObjectId } from 'mongoose';

class Livro {
  constructor(
    public nome?: string,
    public autores?: ObjectId[], // string para salvar o objectId no formato string
    public _id?: string,
  ) { }
}

export default Livro;