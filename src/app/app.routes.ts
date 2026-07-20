import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'produtos',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/produtos/produtos').then(m => m.Produtos)
      },
      {
        path: 'cardapio',
        loadComponent: () => import('./components/cardapio/cardapio').then(m => m.Cardapio)
      },
      {
        path: 'produtos',
        loadComponent: () => import('./components/produtos/produtos').then(m => m.Produtos)
      }
    ]
  }
];
