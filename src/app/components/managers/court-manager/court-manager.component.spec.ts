import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtManagerComponent } from './court-manager.component';

describe('CourtManagerComponent', () => {
  let component: CourtManagerComponent;
  let fixture: ComponentFixture<CourtManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
