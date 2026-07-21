import { Component, signal } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatIconModule, RouterLink],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class Produtos {


  selected = signal('');

}
