import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ModulosAcessos } from './modulos-acessos';

describe('ModulosAcessos', () => {
  let service: ModulosAcessos;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ModulosAcessos);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve chamar o endpoint /modulos-menu', () => {
    const responseMock = [{ codigo: 'ADMIN' }];

    service.getModulosMenu().subscribe((response) => {
      expect(response).toEqual(responseMock);
    });

    const req = httpMock.expectOne('http://localhost:8081/modulos-menu');
    expect(req.request.method).toBe('GET');
    req.flush(responseMock);
  });
});
