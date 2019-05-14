import { TestBed } from '@angular/core/testing';

import { CursoDisciplinaHabilidadeService } from './curso-disciplina-habilidade.service';

describe('CursoDisciplinaHabilidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoDisciplinaHabilidadeService = TestBed.get(CursoDisciplinaHabilidadeService);
    expect(service).toBeTruthy();
  });
});
