import { TestBed } from '@angular/core/testing';

import { CursoObjetivoService } from './curso-objetivo.service';

describe('CursoObjetivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoObjetivoService = TestBed.get(CursoObjetivoService);
    expect(service).toBeTruthy();
  });
});
