import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CursoDisciplinaHabilidade } from '../curso-disciplina-habilidade/curso-disciplina-habilidade';

@Injectable()
export class CursoDisciplinaHabilidadeService {

  private cursoDisciplinaHabilidadeRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getCursoDisciplinaHabilidades() {
    return this.http.get(this.cursoDisciplinaHabilidadeRoot.concat('curso-disciplina-habilidade/'));
  }

  showOneCursoDisciplinaHabilidade(id: number)
  {
    return this.http.get(this.cursoDisciplinaHabilidadeRoot.concat(`curso-disciplina-habilidade/${id}/`));
  }

  createCursoDisciplinaHabilidade(cursoDisciplina_id: number, habilidade_id: number) {
    return this.http.post(this.cursoDisciplinaHabilidadeRoot.concat('curso-disciplina-habilidade/'), { cursoDisciplina_id, habilidade_id });
  }

  deleteCursoDisciplinaHabilidade(id: number) {
    return this.http.delete(this.cursoDisciplinaHabilidadeRoot.concat(`curso-disciplina-habilidade/${id}/`));
  }
}
