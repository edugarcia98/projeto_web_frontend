import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { Competencia } from '../competencia/competencia';

export interface CursoDisciplinaCompetencia {
    id: number;
    cursoDisciplina_id: number;
    competencia_id: number;
    cursoDisciplina: CursoDisciplina;
    competencia: Competencia;
}
