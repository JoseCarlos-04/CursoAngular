import {Routes} from '@angular/router';
import {StatsComponent} from './components/dashboard/stats/stats.component';
import {ProfileComponent} from './components/dashboard/profile/profile.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {SigninComponent} from './pages/auth/signin/signin.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'singin', component: SigninComponent},
  {path:'home', component:HomeComponent,...canActivate(() => redirectUnauthorizedTo(['/login']))},
  {path:'tasks', component:TasksComponent,...canActivate(() => redirectUnauthorizedTo(['/login']))},
  {
    path:'dashboard',component:DashboardComponent,...canActivate(() => redirectUnauthorizedTo(['/login'])), children: [
      {path: 'stats', component: StatsComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
      {path: 'profile', component: ProfileComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}
    ]
  },
  {path: 'notfound', component: NotfoundComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/notfound', pathMatch: 'full'},
];
