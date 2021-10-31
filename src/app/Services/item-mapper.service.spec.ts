import { TestBed } from '@angular/core/testing';

import { ItemMapperService } from './item-mapper.service';

describe('ItemMapperService', () => {
  let service: ItemMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
