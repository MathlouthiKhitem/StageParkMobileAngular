import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeZoneComponent } from './liste-zone.component';

describe('ListeZoneComponent', () => {
  let component: ListeZoneComponent;
  let fixture: ComponentFixture<ListeZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
