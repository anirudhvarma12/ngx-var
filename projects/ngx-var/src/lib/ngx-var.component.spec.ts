import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVarComponent } from './ngx-var.component';

describe('NgxVarComponent', () => {
  let component: NgxVarComponent;
  let fixture: ComponentFixture<NgxVarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxVarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
