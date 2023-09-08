import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpasswordComponent } from './fpassword.component';

describe('FpasswordComponent', () => {
  let component: FpasswordComponent;
  let fixture: ComponentFixture<FpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FpasswordComponent]
    });
    fixture = TestBed.createComponent(FpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
