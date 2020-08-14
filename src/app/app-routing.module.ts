import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'editarperfil/:idUsuario/:usuario/:sexo/:correoElectronico/:nombre/:telefono/:contrasenia/:estatus',
    loadChildren: () => import('./paginas/editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'editarclase/:idClase/:fechaf/:horaInicio/:horaFin/:horario/:nombreC/:profesor/:personas/:estatus',
    loadChildren: () => import('./paginas/editarclase/editarclase.module').then( m => m.EditarclasePageModule)
  },
  {
    path: 'asistentes/:idClase/:nombre/:profesor/:fechaf',
    loadChildren: () => import('./paginas/asistentes/asistentes.module').then( m => m.AsistentesPageModule)
  },
  {
    path: 'clasesalumnos',
    loadChildren: () => import('./paginas/clasesalumnos/clasesalumnos.module').then( m => m.ClasesalumnosPageModule)
  },
  {
    path: 'asisalumno/:idClase/:nombre/:profesor',
    loadChildren: () => import('./paginas/asisalumno/asisalumno.module').then( m => m.AsisalumnoPageModule)
  },
  {
    path: 'calalumno',
    loadChildren: () => import('./paginas/calalumno/calalumno.module').then( m => m.CalalumnoPageModule)
  },
  {
    path: 'horarios/:fechaf',
    loadChildren: () => import('./paginas/horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'crearclase/:fechaf',
    loadChildren: () => import('./paginas/crearclase/crearclase.module').then( m => m.CrearclasePageModule)
  },
  {
    path: 'caladmin',
    loadChildren: () => import('./paginas/caladmin/caladmin.module').then( m => m.CaladminPageModule)
  },
  {
    path: 'horariosadmin/:fechaf',
    loadChildren: () => import('./paginas/horariosadmin/horariosadmin.module').then( m => m.HorariosadminPageModule)
  },
  {
    path: 'cambiarpass',
    loadChildren: () => import('./paginas/cambiarpass/cambiarpass.module').then( m => m.CambiarpassPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./paginas/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./paginas/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./paginas/user/user.module').then( m => m.UserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
