import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubOrgDetailsComponent } from './sub-org-details.component';

describe('SubOrgDetailsComponent', () => {
  let component: SubOrgDetailsComponent;
  let fixture: ComponentFixture<SubOrgDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubOrgDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubOrgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
