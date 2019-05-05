import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from './disciplina.service'
import { Disciplina } from './disciplina'
import { TipoDisc } from './tipo-disc'

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  items: Disciplina[];
  tipoDiscs : TipoDisc[] =[
    { id :'T', title : 'Teorica'},
    { id :'P', title : 'Pratica'}
  ];
  tipoDiscSelecionado: TipoDisc;
  error: any;
  selectedDisciplina;
  creditos: Number[] = [
    2,4,6,8
  ]
  selectedTipo = '';
  selectedCredito = 0;

  constructor(private api: DisciplinaService) {
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1};
  }

  ngOnInit() {
    this.api.getDisciplinas().subscribe(
      (items: Disciplina[]) => this.items = items,
      (error: any) => this.error = error
    );
  }

  add(itemTitle: string, itemEmenta: string){
    this.api.createDisciplina(itemTitle, this.selectedTipo, this.selectedCredito, itemEmenta).subscribe(
      (item: Disciplina) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteDisciplina(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  disciplinaClicked(disciplina: Disciplina)
  {
    this.api.showOneDisciplina(disciplina.id).subscribe(
      (item: Disciplina) => {
        this.selectedDisciplina = item;
      }
    );
  }

  update(id: number, title: string, tipo: string, credito: number, ementa: string)
  {
    this.api.updateDisciplina(id, title, tipo, credito, ementa).subscribe(
      (item: Disciplina) => {
        item.title = title;
        item.tipo = tipo;
        item.creditos = credito;
        item.ementa = ementa;
      }
    );
    location.reload();
  }
}