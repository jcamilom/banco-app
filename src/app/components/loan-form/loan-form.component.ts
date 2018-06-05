import { Component, OnInit }                  from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Client} from '../../client';
@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {

  client = new Client(0, '', '', '', '', '', 'Servientrega', 12345678, 2000000, '2015-01-15');

  loanForm: FormGroup;

  ngOnInit(): void {
    this.loanForm = new FormGroup({
      'companyName': new FormControl(this.client.companyName, [
        Validators.required,
        /* Validators.minLength(4) */
      ]),
      'nit': new FormControl(this.client.nit, Validators.required),
      'salary': new FormControl(this.client.salary, [
        Validators.required
      ]),
      'entryDate': new FormControl(this.client.entryDate, [
        Validators.required
      ])
    });
  }

  get companyName() { return this.loanForm.get('companyName'); }

  get nit() { return this.loanForm.get('nit'); }

  get salary() { return this.loanForm.get('salary'); }

  get entryDate() { return this.loanForm.get('entryDate'); }

}
