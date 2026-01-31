import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        { provide: Router, useValue: mockRouter }
      ]
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve realizar GET genérico', () => {
    const mockResponse = { data: 'teste' };
    service.getGeneric('test').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve realizar POST genérico', () => {
    const body = { name: 'Teste' };
    const mockResponse = { id: 1, ...body };

    service.postGeneric('test', body).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('deve realizar PUT genérico', () => {
    const body = { name: 'Atualizado' };
    const mockResponse = { id: 1, ...body };

    service.putGeneric('test/1', body).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('deve realizar PATCH genérico', () => {
    const body = { status: true };
    const mockResponse = { id: 1, ...body };

    service.patchGeneric('test/1', body).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('deve realizar DELETE genérico', () => {
    const mockResponse = { success: true };

    service.deleteGeneric('test/1').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('deve redirecionar para /login ao receber 401', () => {
    service.getGeneric('test').subscribe({
      next: () => fail('deveria falhar'),
      error: err => {
        expect(err.status).toBe(401);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });
});
