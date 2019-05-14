import { TestBed } from '@angular/core/testing';

import { CursoDisciplinaObjetivoService } from './curso-disciplina-objetivo.service';

describe('CursoDisciplinaObjetivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoDisciplinaObjetivoService = TestBed.get(CursoDisciplinaObjetivoService);
    expect(service).toBeTruthy();
  });
});
