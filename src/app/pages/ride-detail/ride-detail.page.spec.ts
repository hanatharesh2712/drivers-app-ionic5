/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RideDetailPage } from './ride-detail.page';

describe('RideOfferPage', () => {
  let component: RideDetailPage;
  let fixture: ComponentFixture<RideDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideDetailPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
