import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubSettingComponent } from './club-setting.component';

describe('ClubSettingComponent', () => {
  let component: ClubSettingComponent;
  let fixture: ComponentFixture<ClubSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
