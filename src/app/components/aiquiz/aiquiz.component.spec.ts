import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiquizComponent } from './aiquiz.component';

describe('AiquizComponent', () => {
  let component: AiquizComponent;
  let fixture: ComponentFixture<AiquizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiquizComponent]
    });
    fixture = TestBed.createComponent(AiquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
