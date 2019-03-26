import { Component, OnInit } from '@angular/core';
import { ObjetivoService } from 'src/app/objetivo/objetivo.service'
import { Objetivo } from 'src/app/objetivo/objetivo'

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
