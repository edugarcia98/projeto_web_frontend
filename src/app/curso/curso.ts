import { Objetivo } from 'src/app/objetivo/objetivo'

export interface Curso {
    id: number;
    title: string;
    description: string;
    objetivos: Objetivo[];
}
