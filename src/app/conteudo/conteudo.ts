import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';

export interface Conteudo {
    id: number;
    title: string;
    modulo: string;
    cursoDisciplina_id: number;
    cursoDisciplina: CursoDisciplina;
}
