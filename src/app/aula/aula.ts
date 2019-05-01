import { Turma } from '../turma/turma';

export interface Aula {
    id: number;
    semana: number;
    data: Date;
    tipo: string;
    conteudo: string;
    turma_id: number;
    turma: Turma;
}

export interface TipoAula {
    id: string;
    title: string;
}
