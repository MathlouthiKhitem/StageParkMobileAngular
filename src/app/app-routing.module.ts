import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ListeZoneComponent } from './liste-zone/liste-zone.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'home',component:HomeComponent},
  {path:'agent',component:AgentComponent},
  {path:'listeZone',component:ListeZoneComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
