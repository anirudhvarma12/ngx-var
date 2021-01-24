import { TestBed } from '@angular/core/testing';

import { NgxVarService } from './ngx-var.service';

describe('NgxVarService', () => {
  let service: NgxVarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxVarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
