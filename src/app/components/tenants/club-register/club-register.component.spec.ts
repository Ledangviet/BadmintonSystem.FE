import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubRegisterComponent } from './club-register.component';

describe('ClubRegisterComponent', () => {
  let component: ClubRegisterComponent;
  let fixture: ComponentFixture<ClubRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
