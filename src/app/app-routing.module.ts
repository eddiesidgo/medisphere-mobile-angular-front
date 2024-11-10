import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pacientes/pacientes.module').then( m => m.PacientesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'doctores',
    loadChildren: () => import('./doctores/doctores.module').then( m => m.DoctoresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'citas',
    loadChildren: () => import('./citas/citas.module').then( m => m.CitasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'consultas',
    loadChildren: () => import('./consultas/consultas.module').then( m => m.ConsultasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
