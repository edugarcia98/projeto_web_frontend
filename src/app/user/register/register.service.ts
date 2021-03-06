import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from './register';

@Injectable()
export class RegisterService {

  private registerRoot = 'https://admfacens-web.herokuapp.com/';
  
  constructor(private http: HttpClient) { }

  getRegisters()
  {
    return this.http.get(this.registerRoot.concat('register/'));
  }

  createRegister(usuario: string, password: string, email: string, tipo: string) {
    return this.http.post(this.registerRoot.concat('register/'), {usuario, password, email, tipo});
  }
}
