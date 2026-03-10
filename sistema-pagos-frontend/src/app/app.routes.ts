import { Routes } from '@angular/router';

// comunes
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

// admin
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EstudiantesComponent } from './admin/estudiantes/estudiantes.component';
import { AdminPagosComponent } from './admin/admin-pagos/admin-pagos.component';
import { AdminNewPagoComponent } from './admin/admin-new-pago/admin-new-pago.component';
import { NewEstudianteComponent } from './admin/new-estudiante/new-estudiante.component';

// user
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserPagosComponent } from './user/user-pagos/user-pagos.component';
import { NewPagoComponent } from './user/new-pago/new-pago.component';

// guards
import { authGuard } from './guards/auth.guard';
import { authorizationGuard } from './guards/authorization.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

  {
    path: 'admin',
    canActivate: [authGuard, authorizationGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'estudiantes', component: EstudiantesComponent },
      { path: 'pagos', component: AdminPagosComponent },
      { path: 'new-pago', component: AdminNewPagoComponent },
      { path: 'new-estudiante', component: NewEstudianteComponent },
    ],
  },

  {
    path: 'user',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboardComponent, canActivate: [authorizationGuard], data: { roles: ['USER'] } },
      { path: 'pagos', component: UserPagosComponent, canActivate: [authorizationGuard], data: { roles: ['USER'] } },
      { path: 'new-pago', component: NewPagoComponent, canActivate: [authorizationGuard], data: { roles: ['USER'] } },
    ],
  },

  { path: '**', redirectTo: 'login' },
];