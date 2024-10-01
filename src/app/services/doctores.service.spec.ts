import { TestBed } from '@angular/core/testing';

import { DoctoresService } from './doctores.service';

describe('DoctoresService', () => {
  let service: DoctoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
