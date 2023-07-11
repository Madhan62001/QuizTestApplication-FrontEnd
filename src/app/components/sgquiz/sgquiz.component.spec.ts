import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgquizComponent } from './sgquiz.component';

describe('SgquizComponent', () => {
  let component: SgquizComponent;
  let fixture: ComponentFixture<SgquizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SgquizComponent]
    });
    fixture = TestBed.createComponent(SgquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
