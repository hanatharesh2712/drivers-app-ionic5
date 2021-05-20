/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MobileValidationComponent } from './mobile-validation.component';

describe('MobileValidationComponent', () => {
  let component: MobileValidationComponent;
  let fixture: ComponentFixture<MobileValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
