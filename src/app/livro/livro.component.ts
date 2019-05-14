import { Component, OnInit } from '@angular/core';
import { LivroService } from './livro.service';
import { Livro, TipoLivro } from './livro'; 

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {

  items: Livro[];
  tiposLivro: TipoLivro[] = 
  [
    { id: 'B', title: 'Básica' },
    { id: 'C', title: 'Complementar' }
  ];
  error: any;
  selectedLivro;
  selectedTipoLivro;

  constructor(private api: LivroService) {
    this.selectedLivro = {id: -1, title: '', autor: '', bibliografia: ''}
   }

  ngOnInit() {
    this.api.getLivros().subscribe(
      (items: Livro[]) => this.items = items,
      (error: any) => this.error = error
    );
  }

  add(itemTitle: string, itemAutor: string){
    this.api.createLivro(itemTitle, itemAutor, this.selectedTipoLivro ).subscribe(
      (item: Livro) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteLivro(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  livroClicked(livro: Livro)
  {
    this.api.showOneLivro(livro.id).subscribe(
      (item: Livro) => {
        this.selectedLivro = item;
      }
    );
  }

  update(id: number, title: string, autor: string, bibliografia: string)
  {
    this.api.updateLivro(id, title, autor, bibliografia).subscribe(
      (item: Livro) => {
        item.title = title;
        item.autor = autor;
        item.bibliografia = bibliografia;
      }
    );
    location.reload();
  }

}
