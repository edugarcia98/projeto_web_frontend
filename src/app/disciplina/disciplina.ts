import { Register } from '../user/register/register';

export interface Disciplina  {
    id: number;
    title: string;
    tipo: string;
    creditos: number;
    ementa: string;
    professor_id: number;
    professor: Register;
}
