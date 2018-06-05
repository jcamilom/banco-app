import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegFormComponent } from './components/reg-form/reg-form.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';

const routes: Routes = [
  {path: 'registration', component: RegFormComponent},
  {path: 'loan', component: LoanFormComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
