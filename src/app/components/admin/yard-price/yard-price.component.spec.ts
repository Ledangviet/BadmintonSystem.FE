import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YardPriceComponent } from './yard-price.component';

describe('YardPriceComponent', () => {
  let component: YardPriceComponent;
  let fixture: ComponentFixture<YardPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YardPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YardPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
