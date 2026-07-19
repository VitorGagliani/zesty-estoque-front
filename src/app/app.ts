import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {
  ModulosAcessos,
  ModuloMenuItem
} from './core/services/modulos-acessos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  protected readonly title = signal('zesty-estoque');

  modulos: ModuloMenuItem[] = [];

  constructor(private readonly modulosAcessos: ModulosAcessos) {}

  ngOnInit(): void {
    this.modulosAcessos.getModulosMenu().subscribe({
      next: (dados: ModuloMenuItem[]) => {
        this.modulos = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar módulos:', erro);
      }
    });
  }
}
