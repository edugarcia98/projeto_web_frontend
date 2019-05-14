import { CursoDisciplina } from '../curso-disciplina/curso-disciplina'

export interface Turma {
    id: number;
    codigo: string;
    semestre: string;
    recursos: string;
    cursoDisciplina_id: number;
    cursoDisciplina: CursoDisciplina;
}
