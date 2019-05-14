import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CursoDisciplinaCompetencia } from '../curso-disciplina-competencia/curso-disciplina-competencia';

@Injectable()
export class CursoDisciplinaCompetenciaService {

  private cursoDisciplinaCompetenciaRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getCursoDisciplinaCompetencias() {
    return this.http.get(this.cursoDisciplinaCompetenciaRoot.concat('curso-disciplina-competencia/'));
  }

  showOneCursoDisciplinaCompetencia(id: number)
  {
    return this.http.get(this.cursoDisciplinaCompetenciaRoot.concat(`curso-disciplina-competencia/${id}/`));
  }

  createCursoDisciplinaCompetencia(cursoDisciplina_id: number, competencia_id: number) {
    return this.http.post(this.cursoDisciplinaCompetenciaRoot.concat('curso-disciplina-competencia/'), { cursoDisciplina_id, competencia_id });
  }

  deleteCursoDisciplinaCompetencia(id: number) {
    return this.http.delete(this.cursoDisciplinaCompetenciaRoot.concat(`curso-disciplina-competencia/${id}/`));
  }
}
