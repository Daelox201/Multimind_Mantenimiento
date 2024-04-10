import { TestBed } from '@angular/core/testing';

import { AdivinanzaService } from './adivinanza.service';

describe('AdivinanzaService', () => {
  let service: AdivinanzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdivinanzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
