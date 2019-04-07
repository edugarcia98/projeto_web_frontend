import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RegisterServiceService {

  private registerRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }


  getRegisters() {
    return this.http.get(this.registerRoot.concat('register/'));
  }

  showOneRegister(id: number)
  {
    return this.http.get(this.registerRoot.concat(`register/${id}/`));
  }

  createRegister(usuario: string, email: string, senha: string) {
    return this.http.post(
      this.registerRoot.concat('register/'),
      { usuario, email, senha }
    );
  }

  updateRegister(id: number, user: string, email: string, password: string)
  {
    return this.http.put(this.registerRoot.concat(`register/${id}/`), {user, email , password})
  }

  deleteRegister(id: number) {
    return this.http.delete(this.registerRoot.concat(`register/${id}/`));
  }
}
