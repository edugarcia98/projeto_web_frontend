import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { Objetivo } from '../objetivo/objetivo';

export interface CursoDisciplinaObjetivo {
    id: number;
    cursoDisciplina_id: number;
    objetivo_id: number;
    cursoDisciplina: CursoDisciplina;
    objetivo: Objetivo;
}
