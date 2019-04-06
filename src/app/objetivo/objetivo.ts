import { Curso } from '../curso/curso';

export interface Objetivo{
    id: number;
    title: string;
    description: string;
    curso_id: number;
    curso: Curso;
}