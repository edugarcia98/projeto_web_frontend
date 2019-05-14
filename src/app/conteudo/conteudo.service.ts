import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conteudo } from './conteudo';

@Injectable()
export class ConteudoService {

  private conteudoRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getConteudos()
  {
    return this.http.get(this.conteudoRoot.concat('conteudo/'));
  }

  showOneConteudo(id: number)
  {
    return this.http.get(this.conteudoRoot.concat(`conteudo/${id}/`));
  }

  createConteudo(title: string, modulo: string, cursoDisciplina_id: number) {
    return this.http.post(this.conteudoRoot.concat('conteudo/'), {title, modulo, cursoDisciplina_id});
  }

  updateConteudo(id: number, title: string, modulo: string, cursoDisciplina_id: number)
  {
    return this.http.put(this.conteudoRoot.concat(`conteudo/${id}/`), {title, modulo, cursoDisciplina_id})
  }

  deleteConteudo(id: number) {
    return this.http.delete(this.conteudoRoot.concat(`conteudo/${id}/`));
  }
}
