import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Services
import { ClientService } from './services/client.service';

// Components
import { AppComponent } from './app.component';
import { RegFormComponent } from './reg-form/reg-form.component';

// Directives
import { LegalAgeDirective } from './legal-age.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegFormComponent,
    LegalAgeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
