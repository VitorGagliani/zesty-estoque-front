import { Component, signal } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProdutoInternoGrid, ProdutosService } from '../../core/services/produtos.service';
import { MatDialog } from '@angular/material/dialog';
import { Grid, GridColumn} from '../../shared/grid/grid';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatIconModule, RouterLink, Grid],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class Produtos {

  produtos = signal<ProdutoInternoGrid[]>([]);

    constructor(private readonly produtosService: ProdutosService, private readonly dialog: MatDialog) {}

    carregarGrid(){
      this.produtosService.gridInterno().subscribe((produtos) => {
        this.produtos.set(produtos);
      });
    }

    ngOnInit(): void {
      this.carregarGrid();
    }

  selected = signal('');

    columns: GridColumn[] = [
    { key: 'id', label: 'Código' },
    { key: 'nome', label: 'Nome' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'unidade', label: 'Unidade' },
    { key: 'acao', label: '' },
  ];

  get itens(): ProdutoInternoGrid[] {
    return this.produtos();
  }

}
