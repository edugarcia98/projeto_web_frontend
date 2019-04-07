import { TestBed } from '@angular/core/testing';

import { CursoDisciplinaService } from './curso-disciplina.service';

describe('CursoDisciplinaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoDisciplinaService = TestBed.get(CursoDisciplinaService);
    expect(service).toBeTruthy();
  });
});
