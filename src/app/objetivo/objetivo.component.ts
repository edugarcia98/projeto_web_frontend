import { Component, OnInit } from '@angular/core';
import { ObjetivoService } from './objetivo.service'
import { Objetivo } from './objetivo'

@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.component.html',
  styleUrls: ['./objetivo.component.css']
})
export class ObjetivoComponent implements OnInit {

  items: Objetivo[];
  error: any;
  selectedObjetivo;

  constructor(private api: ObjetivoService) {
    this.selectedObjetivo = {id: -1, title: '', description: ''};
  }

  ngOnInit() {
    this.api.getObjetivos().subscribe(
      (items: Objetivo[]) => this.items = items,
      (error: any) => this.error = error
    );
  }

  add(itemTitle: string, itemDescription: string) {
    this.api.createObjetivo(itemTitle, itemDescription).subscribe(
      (item: Objetivo) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteObjetivo(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  objetivoClicked(objetivo: Objetivo)
  {
    this.api.showOneObjetivo(objetivo.id).subscribe(
      (item: Objetivo) => {
        this.selectedObjetivo = item;
      }
    );
  }

  update(id: number, title: string, description: string)
  {
    this.api.updateObjetivo(id, title, description).subscribe(
      (item: Objetivo) => {
        item.title = title;
        item.description = description;
      }
    );
    location.reload();
  }_
}
