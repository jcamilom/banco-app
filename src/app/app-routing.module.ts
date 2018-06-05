import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegFormComponent } from './components/reg-form/reg-form.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'registration', component: RegFormComponent},
  {path: 'loan', component: LoanFormComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
