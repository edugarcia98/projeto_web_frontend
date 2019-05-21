import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';

@Injectable()
export class CursoService {

  private cursoRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getCursos() {
    return this.http.get(this.cursoRoot.concat('curso/'));
  }

  showOneCurso(id: number)
  {
    return this.http.get(this.cursoRoot.concat(`curso/${id}/`));
  }

  createCurso(title: string, description: string, coordenador_id: number) {
    return this.http.post(this.cursoRoot.concat('curso/'), { title, description, coordenador_id });
  }

  updateCurso(id: number, title: string, description: string, coordenador_id: number)
  {
    return this.http.put(this.cursoRoot.concat(`curso/${id}/`), {title, description, coordenador_id});
  }

  deleteCurso(id: number) {
    return this.http.delete(this.cursoRoot.concat(`curso/${id}/`));
  }
}
