import { Usuario } from "./Usuario";


export class Diretor extends Usuario {
    private tipo: string = 'Diretor';
    organizarAulas() {
        console.log('Escolhe a emenda do curso');
    }
}
