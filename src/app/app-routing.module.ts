import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { AuthGuardService } from './services/auth.guard.service';

const routes: Routes = [{
  path: '',
  component: LandingPageComponent
},
{
  path: 'login',
  component: LoginPageComponent
},
{
  path: 'signup',
  component: SignupPageComponent
},
{
  path: 'profile',
  component: ProfilePageComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
