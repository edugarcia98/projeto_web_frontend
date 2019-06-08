import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';
import { AuthService } from './auth.service';
import { Register } from '../register/register';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Register;

  constructor(private authService: AuthService) 
  { 

  }

  ngOnInit() { }

  login(email: string, password: string)
  {
    this.authService.fazerLogin(email, password);
  }

}
