import { Component, OnInit } from '@angular/core';
import { ObjetivoService } from 'src/app/objetivo/objetivo.service';
import { Objetivo } from 'src/app/objetivo/objetivo';
import { CompetenciaService } from 'src/app/competencia/competencia.service';
import { Competencia } from 'src/app/competencia/competencia';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
