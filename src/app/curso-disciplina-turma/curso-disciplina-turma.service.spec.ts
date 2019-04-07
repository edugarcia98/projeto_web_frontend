import { TestBed } from '@angular/core/testing';

import { CursoDisciplinaTurmaService } from './curso-disciplina-turma.service';

describe('CursoDisciplinaTurmaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoDisciplinaTurmaService = TestBed.get(CursoDisciplinaTurmaService);
    expect(service).toBeTruthy();
  });
});
