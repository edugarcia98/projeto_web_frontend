import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { Turma } from './turma'

export interface CursoDisciplinaTurma {
    id: number;
    cursoDisciplina_id: number;
    turma_id: number;
    cursoDisciplina: CursoDisciplina;
    turma: Turma;
}
