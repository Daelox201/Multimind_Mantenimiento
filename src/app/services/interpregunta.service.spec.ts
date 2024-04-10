import { TestBed } from '@angular/core/testing';

import { InterpreguntaService } from './interpregunta.service';

describe('InterpreguntaService', () => {
  let service: InterpreguntaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterpreguntaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
