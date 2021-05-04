/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Rides_listComponent } from './rides_list.component';

describe('Rides_listComponent', () => {
  let component: Rides_listComponent;
  let fixture: ComponentFixture<Rides_listComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Rides_listComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Rides_listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
