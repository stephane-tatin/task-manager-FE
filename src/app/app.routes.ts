import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import(`./components/main-view/main-view.component`).then(
        (m) => m.MainViewComponent
      ),
  },
];
