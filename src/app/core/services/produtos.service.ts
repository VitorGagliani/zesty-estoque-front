import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ProdutoCadastro {
  nome: string;
  descricao: string;
  tipoId: number;
  unidadeId: number;
  fornecedorId?: number;
  estoqueMinimo?: number;
  estoqueMaximo?: number;
}


export interface ProdutoInternoGrid{
  nome: string;
  id: number;
  descricao: string;
  tipoId: number;
  tipo: string;
  unidadeId: number;
  unidade: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  criarProduto(produto: ProdutoCadastro): Observable<ProdutoCadastro> {
    return this.http.post<ProdutoCadastro>(`${this.apiUrl}/produtos`, produto);
  }

  gridInterno(): Observable<ProdutoInternoGrid[]> {
    return this.http.get<ProdutoInternoGrid[]>(`${this.apiUrl}/produtos/grid`);
  }
}
