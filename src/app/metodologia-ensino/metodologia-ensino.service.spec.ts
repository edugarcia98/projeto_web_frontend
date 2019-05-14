import { TestBed } from '@angular/core/testing';

import { MetodologiaEnsinoService } from './metodologia-ensino.service';

describe('MetodologiaEnsinoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetodologiaEnsinoService = TestBed.get(MetodologiaEnsinoService);
    expect(service).toBeTruthy();
  });
});
