import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBoardComponent } from './service-board.component';

describe('ServiceBoardComponent', () => {
  let component: ServiceBoardComponent;
  let fixture: ComponentFixture<ServiceBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
