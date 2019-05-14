import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { Livro } from '../livro/livro';
import { Curso } from '../curso/curso';

export interface CursoDisciplinaLivro {
    id: number;
    cursoDisciplina_id: number;
    livro_id: number;
    cursoDisciplina: CursoDisciplina;
    livro: Livro;
}
