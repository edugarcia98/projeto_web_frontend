import { Curso } from '../curso/curso';
import { Objetivo } from '../objetivo/objetivo';

export interface CursoObjetivo {
    id: number;
    curso: Curso;
    objetivo: Objetivo;
}
