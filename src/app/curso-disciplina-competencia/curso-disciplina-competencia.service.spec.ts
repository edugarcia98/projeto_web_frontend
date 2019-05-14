import { TestBed } from '@angular/core/testing';

import { CursoDisciplinaCompetenciaService } from './curso-disciplina-competencia.service';

describe('CursoDisciplinaCompetenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoDisciplinaCompetenciaService = TestBed.get(CursoDisciplinaCompetenciaService);
    expect(service).toBeTruthy();
  });
});
