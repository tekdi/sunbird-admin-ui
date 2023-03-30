import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbUserManagementComponent } from './sb-user-management.component';

describe('SbUserManagementComponent', () => {
  let component: SbUserManagementComponent;
  let fixture: ComponentFixture<SbUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbUserManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SbUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
