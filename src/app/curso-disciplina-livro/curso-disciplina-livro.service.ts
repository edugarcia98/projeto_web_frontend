import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CursoDisciplinaLivro } from './curso-disciplina-livro';

@Injectable()
export class CursoDisciplinaLivroService {

  private cursoDisciplinaLivroRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getCursoDisciplinaLivros() {
    return this.http.get(this.cursoDisciplinaLivroRoot.concat('curso-disciplina-livro/'));
  }

  showOneCursoDisciplinaLivro(id: number)
  {
    return this.http.get(this.cursoDisciplinaLivroRoot.concat(`curso-disciplina-livro/${id}/`));
  }

  createCursoDisciplinaLivro(cursoDisciplina_id: number, livro_id: number) {
    return this.http.post(this.cursoDisciplinaLivroRoot.concat('curso-disciplina-livro/'), { cursoDisciplina_id, livro_id });
  }

  deleteCursoDisciplinaLivro(id: number) {
    return this.http.delete(this.cursoDisciplinaLivroRoot.concat(`curso-disciplina-livro/${id}/`));
  }
}
