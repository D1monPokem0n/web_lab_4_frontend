import { TestBed } from '@angular/core/testing';

import { PointsContainerService } from './points-container.service';

describe('PointsContainerService', () => {
  let service: PointsContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointsContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
