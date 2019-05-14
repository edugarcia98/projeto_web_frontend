import { TestBed } from '@angular/core/testing';

import { CursoDisciplinaLivroService } from './curso-disciplina-livro.service';

describe('CursoDisciplinaLivroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoDisciplinaLivroService = TestBed.get(CursoDisciplinaLivroService);
    expect(service).toBeTruthy();
  });
});
