import { TestBed } from '@angular/core/testing';

import { CreateinvitationService } from './createinvitation.service';

describe('CreateinvitationService', () => {
  let service: CreateinvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateinvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
