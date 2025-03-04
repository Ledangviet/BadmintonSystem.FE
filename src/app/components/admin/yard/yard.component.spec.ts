import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YardComponent } from './yard.component';

describe('YardComponent', () => {
  let component: YardComponent;
  let fixture: ComponentFixture<YardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
