import { TestBed } from '@angular/core/testing';

import { BookingMainService } from './booking-main.service';

describe('BookingMainService', () => {
  let service: BookingMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
