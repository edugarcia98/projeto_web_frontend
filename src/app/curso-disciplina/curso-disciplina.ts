import { Curso } from '../curso/curso';
import { Disciplina } from '../disciplina/disciplina';

export interface CursoDisciplina {
    id: number;
    curso_id: number;
    disciplina_id: number;
    curso: Curso;
    disciplina: Disciplina;
}
