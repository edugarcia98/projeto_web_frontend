import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from './register';

@Injectable()
export class RegisterService {

  private registerRoot = 'http://localhost:8000/';
  
  constructor(private http: HttpClient) { }

  createRegister(usuario: string, password: string, email: string) {
    return this.http.post(this.registerRoot.concat('register/'), {usuario, password, email});
  }
}
