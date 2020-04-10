import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/client/login/login.component';
import { RegisterComponent } from './components/client/register/register.component';
import { HomeComponent } from './components/client/home/home.component';
import { InTheatersComponent } from './components/client/in-theaters/in-theaters.component';
import { HistoryComponent } from './components/client/history/history.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
import { ChairsComponent } from './components/client/chairs/chairs.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserDashboardComponent } from './components/admin/user-dashboard/user-dashboard.component';
import { MovieDashboardComponent } from './components/admin/movie-dashboard/movie-dashboard.component';
import { RoomDashboardComponent } from './components/admin/room-dashboard/room-dashboard.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'chair', component: ChairsComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'in-theaters', pathMatch: 'full' },
      { path: 'in-theaters', component: InTheatersComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'checkout', component: CheckoutComponent },
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'dashboard', component: AdminNavComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', component: UserDashboardComponent },
      { path: 'movie', component: MovieDashboardComponent },
      { path: 'room', component: RoomDashboardComponent },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
