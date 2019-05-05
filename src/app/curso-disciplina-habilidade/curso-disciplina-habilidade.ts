import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { Habilidade } from '../habilidade/habilidade';

export interface CursoDisciplinaHabilidade {
    id: number;
    cursoDisciplina_id: number;
    habilidade_id: number;
    cursoDisciplina: CursoDisciplina;
    habilidade: Habilidade;
}
