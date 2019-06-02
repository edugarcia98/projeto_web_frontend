import { Objetivo } from 'src/app/objetivo/objetivo';
import { Register } from '../user/register/register';

export interface Curso {
    id: number;
    title: string;
    description: string;
    coordenador_id: number;
    coordenador: Register;
}
