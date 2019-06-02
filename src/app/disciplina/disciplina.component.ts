import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from './disciplina.service'
import { Disciplina } from './disciplina'
import { RegisterService } from '../user/register/register.service';
import { Register } from '../user/register/register';
import { TipoDisc } from './tipo-disc'

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  items: Disciplina[];
  professores: Register[];
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
  selectedProfessor = 0;

  constructor(private api: DisciplinaService,
              private apiRegister: RegisterService) {
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1};
    this.professores = [];
  }

  ngOnInit() {
    this.api.getDisciplinas().subscribe(
      (items: Disciplina[]) => this.items = items,
      (error: any) => this.error = error
    );

    this.apiRegister.getRegisters().subscribe(
      (items: Register[]) =>
      {
        items.forEach
        (
          (item: Register) =>
          {
            if(item.tipo == 'P')
              this.professores.push(item);
          }
        );
      }
    )
  }

  add(itemTitle: string, itemEmenta: string){
    this.api.createDisciplina(itemTitle, this.selectedTipo, this.selectedCredito, itemEmenta, this.selectedProfessor).subscribe(
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
    this.api.updateDisciplina(id, title, tipo, credito, ementa, this.selectedProfessor).subscribe(
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