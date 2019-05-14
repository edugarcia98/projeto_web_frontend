import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';

export interface MetodologiaEnsino {
    id: number;
    description: string;
    cursoDisciplina_id: number;
    cursoDisciplina: CursoDisciplina;
}
