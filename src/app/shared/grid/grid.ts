import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface GridColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [NgForOf, MatTableModule],
  templateUrl: './grid.html',
  styleUrls: ['./grid.scss'],
})
export class Grid {
  @Input() columns: GridColumn[] = [];
  @Input() itens: any[] = [];

  get displayedColumns(): string[] {
    return this.columns.map(column => column.key);
  }
}
