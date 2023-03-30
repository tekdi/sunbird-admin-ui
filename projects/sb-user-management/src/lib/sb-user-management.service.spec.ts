import { TestBed } from '@angular/core/testing';

import { SbUserManagementService } from './sb-user-management.service';

describe('SbUserManagementService', () => {
  let service: SbUserManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbUserManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
