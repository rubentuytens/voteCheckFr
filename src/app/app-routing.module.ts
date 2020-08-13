import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { DashboardComponent } from './modules/user/dashboard/dashboard.component';
import { NewlistComponent } from './modules/user/newlist/newlist.component';
import { LoggedInGuardService } from './services/logged-in-guard.service';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'newlist', component: NewlistComponent,
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
