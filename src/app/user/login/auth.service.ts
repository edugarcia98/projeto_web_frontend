import { Injectable, EventEmitter } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { Register } from '../register/register';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticado: boolean = false;

  constructor(private registerApi: RegisterService,
              private router: Router) 
  {

  }

  fazerLogin(email: string, password: string)
  {
    this.registerApi.getRegisters().subscribe
    (
      (items: Register[]) =>
      {
        items.forEach
        (
          (item: Register) =>
          {
            if(item.email == email && item.password == password)
            {
              this.usuarioAutenticado = true;
              this.router.navigate(['/curso']);
            }
            else
            {
              this.usuarioAutenticado = false;
            }
          }
        );
      }
    )
  }
}