import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

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
    NgForOf,
    NgIf,
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
  protected readonly currentPageTitle = signal('Zesty Estoque');

  modulos: ModuloMenuItem[] = [];

  expandedModules: Record<string, boolean> = {};

  private readonly filhosPorModulo: Record<string, ModuloMenuItem[]> = {
    produtos: [
      { codigo: 'cardapio', nome: 'Cardápio' },
      { codigo: 'produtos', nome: 'Produtos' }
    ]
  };

  constructor(
    private readonly modulosAcessos: ModulosAcessos,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentPageTitle.set(this.getTitleFromRoute(this.activatedRoute.root));
      });

    this.currentPageTitle.set(this.getTitleFromRoute(this.activatedRoute.root));

    this.modulosAcessos.getModulosMenu().subscribe({
      next: (dados: ModuloMenuItem[]) => {
        this.modulos = dados.map((modulo) => ({
          ...modulo,
          filhos: modulo.filhos ?? this.filhosPorModulo[modulo.codigo.toLowerCase()]
        }));
      },
      error: (erro) => {
        console.error('Erro ao carregar módulos:', erro);
      }
    });
  }

  toggleFilhos(codigo: string): void {
    const chave = codigo.toLowerCase();
    this.expandedModules[chave] = !this.expandedModules[chave];
  }

  isExpanded(codigo: string): boolean {
    return !!this.expandedModules[codigo.toLowerCase()];
  }

  private getTitleFromRoute(route: ActivatedRoute | null): string {
    let currentRoute = route;
    let title = 'Zesty Estoque';

    while (currentRoute) {
      const routeTitle = currentRoute.snapshot.data['title'];
      if (routeTitle) {
        title = routeTitle;
      }
      currentRoute = currentRoute.firstChild;
    }

    return title;
  }
}
