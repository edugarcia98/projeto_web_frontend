import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from './register.service';
import { Register } from 'src/app/register/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  items: Register[];
  private user: UserInterface = {
    name: '',
    email: '',
    password: ''
  };
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

  onRegister(form: NgForm): void {
    if (form.valid) {
      this.authService
        .registerUser(this.user.name, this.user.email, this.user.password)
        .subscribe(user => {
          this.authService.setUser(user);
          const token = user.id;
          this.authService.setToken(token);
          this.router.navigate(['/user/profile']);
          location.reload();
        },
        res => {
          this.msgError = res.error.error.details.messages.email;
          this.onIsError();
        });
    } else {
      this.onIsError();
    }

  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  add(name: string, email: string, password: string){
    this.api.createRegister(name, password, email).subscribe(
      (item: Register) => 
      {
        this.items.push(item);
        alert("Usuário cadastrado com sucesso!");
      }
    );
    location.reload();
  }
}
