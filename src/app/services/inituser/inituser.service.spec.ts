import { TestBed } from '@angular/core/testing';

import { InituserService } from './inituser.service';

describe('InituserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InituserService = TestBed.get(InituserService);
    expect(service).toBeTruthy();
  });
});
