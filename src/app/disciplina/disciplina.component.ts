
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
  ]
  tipoDiscSelecionado: TipoDisc;
  error: any;
  selectedDisciplina;
  creditos: Number[] = [
    1,2,3,4,5,6,7,8,9,10
  ]

  constructor(private api: DisciplinaService) {
    this.selectedDisciplina = {id: -1, title: '', tipo: ''};
  }

  ngOnInit() {
    this.api.getDisciplinas().subscribe(
      (items: Disciplina[]) => this.items = items,
      (error: any) => this.error = error
    );
  }

  add(itemTitle: string){
    this.api.createDisciplina(itemTitle, this.tipoDiscSelecionado.id ).subscribe(
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

  objetivoClicked(disciplina: Disciplina)
  {
    this.api.showOneDisciplina(disciplina.id).subscribe(
      (item: Disciplina) => {
        this.selectedDisciplina = item;
      }
    );
  }

 
}
