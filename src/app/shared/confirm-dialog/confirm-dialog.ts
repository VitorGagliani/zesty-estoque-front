import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm-cadastro-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, NgIf],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.scss'],
})
export class ConfirmCadastroDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmCadastroDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {titulo?: string, nome?: string, descricao?: string }
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
