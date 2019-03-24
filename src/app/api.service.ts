import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objetivo } from './objetivo';

@Injectable()
export class ApiService {

  private apiRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }


  getObjetivos() {
    return this.http.get(this.apiRoot.concat('objetivo/'));
  }

  showOneObjetivo(id: number)
  {
    return this.http.get(this.apiRoot.concat(`objetivo/${id}/`));
  }

  createObjetivo(title: string, description: string) {
    return this.http.post(
      this.apiRoot.concat('objetivo/'),
      { title, description }
    );
  }

  updateObjetivo(id: number, title: string, description: string)
  {
    return this.http.put(this.apiRoot.concat(`objetivo/${id}/`), {title, description})
  }

  deleteObjetivo(id: number) {
    return this.http.delete(this.apiRoot.concat(`objetivo/${id}/`));
  }
}

