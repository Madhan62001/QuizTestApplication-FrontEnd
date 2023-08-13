import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsboardComponent } from './dsboard.component';

describe('DsboardComponent', () => {
  let component: DsboardComponent;
  let fixture: ComponentFixture<DsboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DsboardComponent]
    });
    fixture = TestBed.createComponent(DsboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
