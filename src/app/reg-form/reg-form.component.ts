import { Component } from '@angular/core';

import { Client } from '../client';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent {

  idTypes = ['C.C.', 'Pasaporte'];

  model = new Client(1234, this.idTypes[0], 'Juan', 'Ramirez', 'Zuluaga', '1991-03-21', 'Pablo');

  submitted = false;

  onSubmit() { this.submitted = true; }

}
