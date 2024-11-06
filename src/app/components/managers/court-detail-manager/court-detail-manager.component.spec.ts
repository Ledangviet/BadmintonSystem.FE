import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtDetailManagerComponent } from './court-detail-manager.component';

describe('CourtDetailManagerComponent', () => {
  let component: CourtDetailManagerComponent;
  let fixture: ComponentFixture<CourtDetailManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtDetailManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtDetailManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
