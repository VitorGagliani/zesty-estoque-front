import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'produtos',
    children: [
      {
        path: '',
        data: { title: 'Produtos' },
        loadComponent: () => import('./components/produtos/produtos').then(m => m.Produtos)
      },
      {
        path: 'cardapio',
        data: { title: 'Cardápio' },
        loadComponent: () => import('./components/cardapio/cardapio').then(m => m.Cardapio)
      },
      {
        path: 'novo',
        data: { title: 'Cadastro de produtos' },
        loadComponent: () => import('./components/produtos/cadastro/cadastro').then(m => m.Cadastro)
      },
      {
        path: 'produtos',
        data: { title: 'Produtos' },
        loadComponent: () => import('./components/produtos/produtos').then(m => m.Produtos)
      }
    ]
  }
];
