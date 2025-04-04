import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBoardComponent } from './review-board.component';

describe('ReviewBoardComponent', () => {
  let component: ReviewBoardComponent;
  let fixture: ComponentFixture<ReviewBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
