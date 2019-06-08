import { Component, OnInit, Input } from '@angular/core';
import { ObjetivoService } from 'src/app/objetivo/objetivo.service';
import { Objetivo } from 'src/app/objetivo/objetivo';
import { CompetenciaService } from 'src/app/competencia/competencia.service';
import { Competencia } from 'src/app/competencia/competencia';
import { AuthService } from './user/login/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) 
  {

  }

  ngOnInit() {
  }
}