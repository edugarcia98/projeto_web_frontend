import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CursoDisciplinaObjetivo } from './curso-disciplina-objetivo';

@Injectable()
export class CursoDisciplinaObjetivoService {

  private cursoDisciplinaObjetivoRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getCursoDisciplinaObjetivos() {
    return this.http.get(this.cursoDisciplinaObjetivoRoot.concat('curso-disciplina-objetivo/'));
  }

  showOneCursoDisciplinaObjetivo(id: number)
  {
    return this.http.get(this.cursoDisciplinaObjetivoRoot.concat(`curso-disciplina-objetivo/${id}/`));
  }

  createCursoDisciplinaObjetivo(cursoDisciplina_id: number, objetivo_id: number) {
    return this.http.post(this.cursoDisciplinaObjetivoRoot.concat('curso-disciplina-objetivo/'), { cursoDisciplina_id, objetivo_id });
  }

  deleteCursoDisciplinaObjetivo(id: number) {
    return this.http.delete(this.cursoDisciplinaObjetivoRoot.concat(`curso-disciplina-objetivo/${id}/`));
  }
}
