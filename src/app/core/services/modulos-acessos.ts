import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ModuloMenuItem {
  codigo: string;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModulosAcessos {

  private readonly apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getModulosMenu(): Observable<ModuloMenuItem[]> {
    return this.http.get<unknown>(`${this.apiUrl}/modulos-menu`).pipe(
      map((response) => this.normalizarResposta(response))
    );
  }

  private normalizarResposta(response: unknown): ModuloMenuItem[] {
    if (Array.isArray(response)) {
      return response as ModuloMenuItem[];
    }

    if (response && typeof response === 'object') {
      const dados = response as Record<string, unknown>;

      if (Array.isArray(dados['content'])) {
        return dados['content'] as ModuloMenuItem[];
      }

      if (Array.isArray(dados['items'])) {
        return dados['items'] as ModuloMenuItem[];
      }

      if (Array.isArray(dados['data'])) {
        return dados['data'] as ModuloMenuItem[];
      }
    }

    return [];
  }
}
