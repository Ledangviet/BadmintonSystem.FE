import { TestBed } from '@angular/core/testing';

import { AzureBlobServiceService } from './azure-blob-service.service';

describe('AzureBlobServiceService', () => {
  let service: AzureBlobServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureBlobServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
