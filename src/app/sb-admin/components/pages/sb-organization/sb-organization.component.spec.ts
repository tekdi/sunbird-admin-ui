import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbOrganizationComponent } from './sb-organization.component';

describe('SbOrganizationComponent', () => {
  let component: SbOrganizationComponent;
  let fixture: ComponentFixture<SbOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SbOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
