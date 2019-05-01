import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aula } from './aula';

@Injectable()
export class AulaService {

  private aulaRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getAulas() {
    return this.http.get(this.aulaRoot.concat('aula/'));
  }

  showOneAula(id: number)
  {
    return this.http.get(this.aulaRoot.concat(`aula/${id}/`));
  }

  createAula(semana: number, data: Date, tipo: string, conteudo: string, turma_id: number) {
    return this.http.post(this.aulaRoot.concat('aula/'), { semana, data, tipo, conteudo, turma_id });
  }

  updateAula(id: number, semana: number, data: Date, tipo: string, conteudo: string, turma_id: number)
  {
    return this.http.put(this.aulaRoot.concat(`aula/${id}/`), {semana, data, tipo, conteudo, turma_id});
  }

  deleteAula(id: number) {
    return this.http.delete(this.aulaRoot.concat(`aula/${id}/`));
  }
}
