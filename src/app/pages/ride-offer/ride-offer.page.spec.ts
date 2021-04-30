/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RideOfferPage } from './ride-offer.page';

describe('RideOfferPage', () => {
  let component: RideOfferPage;
  let fixture: ComponentFixture<RideOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideOfferPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
