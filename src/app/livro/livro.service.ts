import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livro, TipoLivro } from './livro'

@Injectable()
export class LivroService {

  private livroRoot = 'https://admfacens-web.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getLivros() {
    return this.http.get(this.livroRoot.concat('livro/'));
  }

  showOneLivro(id: number)
  {
    return this.http.get(this.livroRoot.concat(`livro/${id}/`));
  }

  createLivro(title: string, autor: string, bibliografia: string) {
    return this.http.post(this.livroRoot.concat('livro/'), { title, autor, bibliografia });
  }

  updateLivro(id: number, title: string, autor: string, bibliografia: string)
  {
    return this.http.put(this.livroRoot.concat(`livro/${id}/`), {title, autor, bibliografia});
  }

  deleteLivro(id: number) {
    return this.http.delete(this.livroRoot.concat(`livro/${id}/`));
  }
}
