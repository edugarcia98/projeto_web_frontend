import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';
import { AuthService } from '../login/auth.service';
import { RegisterService } from './register.service';
import { Register, TipoUser } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  items: Register[];
  tiposUser: TipoUser[] =
  [
    { id: 'A', title: 'Administrador' },
    { id: 'C', title: 'Coordenador' },
    { id: 'P', title: 'Professor' }
  ]
  private user: UserInterface = {
    name: '',
    email: '',
    password: ''
  };
  selectedTipoUser;
  public isError = false;
  public msgError = '';

  constructor(private authService: AuthService,
    private router: Router,
    private location: Location,
    private api: RegisterService
    ) { 
      this.items = [];
    }

  ngOnInit() { }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  add(name: string, email: string, password: string){
    this.api.createRegister(name, password, email, this.selectedTipoUser).subscribe(
      (item: Register) => 
      {
        this.items.push(item);
        alert("Usuário cadastrado com sucesso!");
      }
    );
    location.reload();
  }
}