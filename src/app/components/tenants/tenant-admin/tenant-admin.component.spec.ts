import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantAdminComponent } from './tenant-admin.component';

describe('TenantAdminComponent', () => {
  let component: TenantAdminComponent;
  let fixture: ComponentFixture<TenantAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
