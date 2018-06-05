import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Services
import { ClientService } from './services/client.service';

// Components
import { AppComponent } from './app.component';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';

// Directives
import { LegalAgeDirective } from './directives/legal-age.directive';
import { MaxTodayDirective } from './directives/max-today.directive';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RegFormComponent,
    LegalAgeDirective,
    LoanFormComponent,
    MaxTodayDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
