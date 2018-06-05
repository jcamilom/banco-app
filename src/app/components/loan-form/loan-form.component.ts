import { Component, OnInit }                  from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { maxTodayValidator } from '../../directives/max-today.directive';

const justNumbRegExp = new RegExp('^[0-9]+$');

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
    // Generate the maxValue for the date (today)
    let todate: string = (new Date).toISOString().split("T")[0];

    this.loanForm = new FormGroup({
      'companyName': new FormControl(this.client.companyName, Validators.required),
      'nit': new FormControl(this.client.nit, [
        Validators.required,
        Validators.pattern(justNumbRegExp)
      ]),
      'salary': new FormControl(this.client.salary, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999999),
        Validators.pattern(justNumbRegExp)
      ]),
      'entryDate': new FormControl(this.client.entryDate, [
        Validators.required,
        maxTodayValidator()
      ])
    });
  }

  get companyName() { return this.loanForm.get('companyName'); }

  get nit() { return this.loanForm.get('nit'); }

  get salary() { return this.loanForm.get('salary'); }

  get entryDate() { return this.loanForm.get('entryDate'); }

}
