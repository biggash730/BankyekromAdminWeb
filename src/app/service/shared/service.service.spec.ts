import { TestBed } from '@angular/core/testing';

import { ServiceRequestsService } from './service.service';

describe('ServiceRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceRequestsService = TestBed.get(ServiceRequestsService);
    expect(service).toBeTruthy();
  });
});
