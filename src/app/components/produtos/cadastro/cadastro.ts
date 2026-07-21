import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProdutosService, ProdutoCadastro } from '../../../core/services/produtos.service';
import { ConfirmCadastroDialog } from '../../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatButtonModule, NgForOf, MatDialogModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {

  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    tipoId: new FormControl(1, [Validators.required]),
    unidadeId: new FormControl(1, [Validators.required]),
    fornecedorId: new FormControl(null),
    estoqueMinimo: new FormControl(null),
    estoqueMaximo: new FormControl(null),
  });

  tipoOptions = [
    { value: 1, label: 'Insumo' },
    { value: 2, label: 'Embalagem' },
    { value: 3, label: 'Uso e Consumo' },
  ];

  unidadeOptions = [
    { value: 1, label: 'UN' },
    { value: 2, label: 'KG' },
    { value: 3, label: 'G' },
    { value: 4, label: 'L' },
    { value: 5, label: 'ML' },
  ];

  fornecedorOptions = [
    { value: 1, label: 'Fornecedor 1' },
  ];

  constructor(private readonly produtosService: ProdutosService, private readonly dialog: MatDialog) {}

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      const titulo = 'Erro';
      const descricao = 'Por favor, preencha todos os campos obrigatórios.';
      const dialog = this.dialog.open(ConfirmCadastroDialog, {
        data: { titulo, descricao },
        width: '420px'
      });

      dialog.afterClosed().subscribe((confirmed: boolean) => {
        if (!confirmed) {
          return;
        }
      });

      return;
    }

    const nome = this.form.get('nome')?.value;
    const titulo = 'Confirmar cadastro';
    const descricao = `Deseja cadastrar o produto ${nome?.toUpperCase()}?`;
    const dialogRef = this.dialog.open(ConfirmCadastroDialog, {
      data: { titulo, descricao },
      width: '420px'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return;
      }

      const produto: ProdutoCadastro = this.form.value as ProdutoCadastro;

      this.produtosService.criarProduto(produto).subscribe({
        next: (result: ProdutoCadastro) => {
          console.log('Produto cadastrado:', result);
          this.form.reset({ tipoId: 1, unidadeId: 1 });
        },
        error: (error: unknown) => {
          console.error('Erro ao cadastrar produto:', error);
        },
      });
    });
  }
}
