import { Curso } from '../curso/curso';

export interface Competencia {
    id: number;
    title: string;
    description: string;
    curso_id: number;
    curso: Curso;
}
