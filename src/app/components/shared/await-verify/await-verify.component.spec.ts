import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitVerifyComponent } from './await-verify.component';

describe('AwaitVerifyComponent', () => {
  let component: AwaitVerifyComponent;
  let fixture: ComponentFixture<AwaitVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwaitVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwaitVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
