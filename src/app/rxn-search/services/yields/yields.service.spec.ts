import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from './../../../../environments/environment.prod';
import { YieldsService } from './yields.service';
const ruids = [
  '76b95985e1344b3b8ac6d1e3c89aad8e_3',
  '76b95985e1344b3b8ac6d1e3c89aad8e_2',
  '9db6933f9d23412eb839d124e8abf648'
];
const dummyData = [
  { ruid: '76b95985e1344b3b8ac6d1e3c89aad8e_2', yield: 25.75 },
  { ruid: '9db6933f9d23412eb839d124e8abf648', yield: 39.56 },
  { ruid: '76b95985e1344b3b8ac6d1e3c89aad8e_3', yield: 15.08 }
];
describe('YieldService', () => {
  let service: YieldsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YieldsService]
    });
    service = TestBed.get(YieldsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service).toBeTruthy();
    service.getYields(ruids).subscribe(data => {
      expect(data).toBe(dummyData);
    });
    const request = httpMock.expectOne(environment.yields);
    expect(request.request.method).toBe('POST');
    request.flush(dummyData);
  });
  it('should return an error', () => {
    service.getYields(ruids).subscribe(
      data => {},
      err => {
        expect(err.status).toEqual(500, 'status');
      }
    );
    const req = httpMock.expectOne(environment.yields);
    const emsg = 'Internal Server Error';
    req.flush(emsg, { status: 500, statusText: 'error' });
  });
});
