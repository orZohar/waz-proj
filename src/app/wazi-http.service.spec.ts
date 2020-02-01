import { TestBed } from '@angular/core/testing';

import { WaziHttpService } from './wazi-http.service';

describe('WaziHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaziHttpService = TestBed.get(WaziHttpService);
    expect(service).toBeTruthy();
  });
});
